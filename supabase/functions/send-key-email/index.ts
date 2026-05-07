import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { corsHeaders } from "../_shared/cors.ts";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY")!;
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")!;

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

async function sendOnce(to: string, key: string, plan: string, orderId: string): Promise<{ ok: boolean; error?: string }> {
  const html = `
  <div style="font-family:Arial,sans-serif;background:#0a0a0a;padding:24px;color:#fff">
    <div style="max-width:520px;margin:0 auto;background:#111;border:1px solid #333;border-radius:12px;padding:24px">
      <h1 style="margin:0 0 12px;font-size:20px">Boykaffx7 APP — Tu Key</h1>
      <p style="color:#bbb;font-size:14px;margin:0 0 18px">Tu pago fue aprobado. Aquí está tu key de acceso:</p>
      <div style="background:#000;border:1px solid #444;border-radius:8px;padding:14px;font-family:monospace;font-size:18px;letter-spacing:1px;text-align:center">${key}</div>
      <table style="width:100%;margin-top:18px;font-size:13px;color:#aaa">
        <tr><td>Duración:</td><td style="text-align:right;color:#fff">${plan}</td></tr>
        <tr><td>ID de compra:</td><td style="text-align:right;color:#fff">${orderId}</td></tr>
      </table>
      <p style="color:#777;font-size:12px;margin-top:20px">Conserva esta key. Es única e intransferible.</p>
    </div>
  </div>`;

  const resp = await fetch("https://connector-gateway.lovable.dev/resend/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${LOVABLE_API_KEY}`,
      "X-Connection-Api-Key": RESEND_API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Boykaffx7 APP <onboarding@resend.dev>",
      to: [to],
      subject: "Tu key de Boykaffx7 APP",
      html,
    }),
  });
  const data = await resp.json().catch(() => ({}));
  if (!resp.ok) {
    return { ok: false, error: `${resp.status}: ${JSON.stringify(data)}` };
  }
  return { ok: true };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  try {
    const { orderId } = await req.json();
    if (!UUID_RE.test(String(orderId || ""))) {
      return new Response(JSON.stringify({ error: "orderId inválido" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    const supabase = createClient(SUPABASE_URL, SERVICE_KEY);
    const { data: order } = await supabase
      .from("payment_orders")
      .select("id, email, plan_duration, assigned_key, status, email_sent_attempts")
      .eq("id", orderId)
      .single();
    if (!order || order.status !== "APPROVED" || !order.assigned_key) {
      return new Response(JSON.stringify({ error: "Orden no aprobada o sin key" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    if ((order.email_sent_attempts ?? 0) >= 4) {
      return new Response(JSON.stringify({ error: "Máximo de reintentos alcanzado" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    let lastErr = "";
    const startAttempt = order.email_sent_attempts ?? 0;
    for (let i = startAttempt; i < 4; i++) {
      const r = await sendOnce(order.email, order.assigned_key, order.plan_duration, order.id);
      const newAttempts = i + 1;
      if (r.ok) {
        await supabase.from("payment_orders").update({
          email_sent_attempts: newAttempts,
          email_sent_at: new Date().toISOString(),
        }).eq("id", order.id);
        return new Response(JSON.stringify({ ok: true, attempts: newAttempts }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }
      lastErr = r.error || "";
      await supabase.from("payment_orders").update({ email_sent_attempts: newAttempts }).eq("id", order.id);
      console.error(`send-key-email attempt ${newAttempts} failed:`, lastErr);
      await new Promise((r) => setTimeout(r, 800));
    }
    return new Response(JSON.stringify({ ok: false, error: lastErr }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: "Error interno" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
