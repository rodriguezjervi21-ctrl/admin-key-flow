import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { corsHeaders, PLANS } from "../_shared/cors.ts";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY")!;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function aiValidateReceipt(imageUrl: string, expectedAmount: number): Promise<{
  valid: boolean;
  amount_match: boolean;
  recipient_match: boolean;
  reason: string;
}> {
  const prompt = `Analyze this image carefully. It should be a screenshot of a PayPal payment confirmation.

Verify ALL these conditions:
1. Is this a REAL PayPal payment confirmation screenshot (not a fake, edited, or unrelated image)?
2. Does the amount paid equal exactly $${expectedAmount} USD?
3. Is the recipient "ModifaxffLopez" or "Modifaxff Lopez" (PayPal.me/ModifaxffLopez)?

Respond ONLY with a JSON object using this exact tool call.`;

  const resp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${LOVABLE_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "google/gemini-2.5-flash",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: prompt },
            { type: "image_url", image_url: { url: imageUrl } },
          ],
        },
      ],
      tools: [
        {
          type: "function",
          function: {
            name: "report_validation",
            description: "Report the validation result",
            parameters: {
              type: "object",
              properties: {
                is_paypal_screenshot: { type: "boolean" },
                amount_match: { type: "boolean" },
                recipient_match: { type: "boolean" },
                reason: { type: "string", description: "Short Spanish explanation" },
              },
              required: ["is_paypal_screenshot", "amount_match", "recipient_match", "reason"],
            },
          },
        },
      ],
      tool_choice: { type: "function", function: { name: "report_validation" } },
    }),
  });

  if (!resp.ok) {
    const txt = await resp.text();
    console.error("AI gateway error", resp.status, txt);
    return { valid: false, amount_match: false, recipient_match: false, reason: "Error de IA al validar" };
  }
  const json = await resp.json();
  const tc = json.choices?.[0]?.message?.tool_calls?.[0];
  if (!tc) return { valid: false, amount_match: false, recipient_match: false, reason: "Sin respuesta de IA" };
  const args = JSON.parse(tc.function.arguments);
  const valid = args.is_paypal_screenshot && args.amount_match && args.recipient_match;
  return {
    valid,
    amount_match: args.amount_match,
    recipient_match: args.recipient_match,
    reason: args.reason || "",
  };
}

async function notifyTelegram(orderId: string, email: string, plan: string, amount: number, imageUrl: string): Promise<number | null> {
  const TELEGRAM_API_KEY = Deno.env.get("TELEGRAM_API_KEY");
  const TELEGRAM_ADMIN_ID = Deno.env.get("TELEGRAM_ADMIN_ID");
  if (!TELEGRAM_API_KEY || !TELEGRAM_ADMIN_ID) {
    console.error("Telegram secrets missing");
    return null;
  }
  const caption = [
    "Nuevo pago recibido",
    `ID: ${orderId}`,
    `Email: ${email}`,
    `Plan: ${plan}`,
    `Monto: $${amount} USD`,
    `Fecha: ${new Date().toLocaleString("es-HN")}`,
  ].join("\n");

  const resp = await fetch("https://connector-gateway.lovable.dev/telegram/sendPhoto", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${LOVABLE_API_KEY}`,
      "X-Connection-Api-Key": TELEGRAM_API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: TELEGRAM_ADMIN_ID,
      photo: imageUrl,
      caption,
      reply_markup: {
        inline_keyboard: [[
          { text: "Aprobar Pago", callback_data: `approve:${orderId}` },
          { text: "Rechazar Pago", callback_data: `reject:${orderId}` },
        ], [
          { text: "Ver Usuario", callback_data: `view:${orderId}` },
        ]],
      },
    }),
  });
  const data = await resp.json();
  if (!resp.ok) {
    console.error("Telegram sendPhoto failed", resp.status, JSON.stringify(data));
    return null;
  }
  return data.result?.message_id ?? null;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const body = await req.json();
    const email = String(body.email || "").trim().toLowerCase();
    const planId = String(body.planId || "");
    const receiptUrl = String(body.receiptUrl || "");

    if (!EMAIL_RE.test(email) || email.length > 255) {
      return new Response(JSON.stringify({ error: "Correo inválido" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    const plan = PLANS[planId];
    if (!plan) {
      return new Response(JSON.stringify({ error: "Plan inválido" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    if (!receiptUrl || !receiptUrl.startsWith("http")) {
      return new Response(JSON.stringify({ error: "Comprobante inválido" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

    // Create pending order
    const { data: order, error: insErr } = await supabase
      .from("payment_orders")
      .insert({
        email,
        plan_duration: plan.duration,
        amount_usd: plan.amount_usd,
        receipt_url: receiptUrl,
        status: "PENDING",
      })
      .select("id")
      .single();

    if (insErr || !order) {
      console.error(insErr);
      return new Response(JSON.stringify({ error: "Error creando pedido" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // Validate with AI
    const aiResult = await aiValidateReceipt(receiptUrl, plan.amount_usd);

    if (!aiResult.valid) {
      await supabase.from("payment_orders").update({
        status: "AI_REJECTED",
        ai_validation: aiResult,
        rejection_reason: aiResult.reason || "Comprobante no válido",
      }).eq("id", order.id);
      return new Response(JSON.stringify({
        orderId: order.id,
        status: "AI_REJECTED",
        reason: aiResult.reason || "El comprobante no pasó la validación automática.",
      }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // Notify Telegram
    const msgId = await notifyTelegram(order.id, email, plan.duration, plan.amount_usd, receiptUrl);

    await supabase.from("payment_orders").update({
      ai_validation: aiResult,
      telegram_message_id: msgId,
    }).eq("id", order.id);

    return new Response(JSON.stringify({ orderId: order.id, status: "PENDING" }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("submit-payment-proof error", e);
    return new Response(JSON.stringify({ error: "Error interno" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
