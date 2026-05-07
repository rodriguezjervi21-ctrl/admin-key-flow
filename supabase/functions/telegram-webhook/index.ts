import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { corsHeaders } from "../_shared/cors.ts";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY")!;
const TELEGRAM_API_KEY = Deno.env.get("TELEGRAM_API_KEY")!;
const TELEGRAM_WEBHOOK_SECRET = Deno.env.get("TELEGRAM_WEBHOOK_SECRET")!;
const TELEGRAM_ADMIN_ID = Deno.env.get("TELEGRAM_ADMIN_ID")!;

function safeEqual(a: string | null, b: string): boolean {
  if (!a || a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

async function tg(method: string, body: unknown) {
  const resp = await fetch(`https://connector-gateway.lovable.dev/telegram/${method}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${LOVABLE_API_KEY}`,
      "X-Connection-Api-Key": TELEGRAM_API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await resp.json().catch(() => ({}));
  if (!resp.ok) console.error(`Telegram ${method} failed`, resp.status, JSON.stringify(data));
  return data;
}

async function answerCb(id: string, text: string) {
  await tg("answerCallbackQuery", { callback_query_id: id, text });
}

function durationMsFor(plan: string): number {
  if (plan === "1 día") return 24 * 60 * 60 * 1000;
  if (plan === "7 días") return 7 * 24 * 60 * 60 * 1000;
  if (plan === "30 días") return 30 * 24 * 60 * 60 * 1000;
  return 0;
}

function generateKey(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const seg = () => Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
  return `PROXY-${seg()}-${seg()}`;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405 });

  const got = req.headers.get("X-Telegram-Bot-Api-Secret-Token");
  if (!safeEqual(got, TELEGRAM_WEBHOOK_SECRET)) {
    return new Response("Unauthorized", { status: 401 });
  }

  const update = await req.json().catch(() => null);
  if (!update) return new Response(JSON.stringify({ ok: true }));

  const cb = update.callback_query;
  if (!cb) return new Response(JSON.stringify({ ok: true }));

  // Only admin can act
  if (String(cb.from?.id) !== String(TELEGRAM_ADMIN_ID)) {
    await answerCb(cb.id, "No autorizado");
    return new Response(JSON.stringify({ ok: true }));
  }

  const [action, orderId] = String(cb.data || "").split(":");
  if (!action || !orderId) {
    await answerCb(cb.id, "Acción inválida");
    return new Response(JSON.stringify({ ok: true }));
  }

  const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

  const { data: order } = await supabase
    .from("payment_orders")
    .select("*")
    .eq("id", orderId)
    .single();

  if (!order) {
    await answerCb(cb.id, "Orden no encontrada");
    return new Response(JSON.stringify({ ok: true }));
  }

  const chatId = cb.message?.chat?.id;
  const messageId = cb.message?.message_id;

  if (action === "view") {
    const lines = [
      `Orden: ${order.id}`,
      `Email: ${order.email}`,
      `Plan: ${order.plan_duration}`,
      `Monto: $${order.amount_usd}`,
      `Estado: ${order.status}`,
      `IA: ${JSON.stringify(order.ai_validation || {})}`,
    ];
    await tg("sendMessage", { chat_id: chatId, text: lines.join("\n"), reply_to_message_id: messageId });
    await answerCb(cb.id, "OK");
    return new Response(JSON.stringify({ ok: true }));
  }

  if (action === "approve") {
    if (order.status !== "PENDING") {
      await answerCb(cb.id, `Ya fue procesada (${order.status})`);
      return new Response(JSON.stringify({ ok: true }));
    }

    // Idempotent claim: only one approval wins
    const { data: claimed, error: claimErr } = await supabase
      .from("payment_orders")
      .update({ status: "APPROVED" })
      .eq("id", orderId)
      .eq("status", "PENDING")
      .select("id")
      .single();

    if (claimErr || !claimed) {
      await answerCb(cb.id, "Ya fue procesada");
      return new Response(JSON.stringify({ ok: true }));
    }

    // Try to take an existing Active key matching duration
    const { data: existing } = await supabase
      .from("proxy_keys")
      .select("*")
      .eq("status", "Activa")
      .eq("duration", order.plan_duration)
      .limit(1)
      .maybeSingle();

    let assignedKey: string;
    const durMs = durationMsFor(order.plan_duration);

    if (existing) {
      assignedKey = existing.key;
      await supabase.from("proxy_keys").update({
        status: "Activa", // remains activable; user activates on first login
        used_by: order.email,
      }).eq("key", assignedKey);
    } else {
      // Auto-generate one
      assignedKey = generateKey();
      await supabase.from("proxy_keys").insert({
        key: assignedKey,
        type: "Normal",
        status: "Activa",
        duration: order.plan_duration,
        duration_ms: durMs,
        created_at: new Date().toISOString(),
        used_by: order.email,
      });
    }

    await supabase.from("payment_orders").update({ assigned_key: assignedKey }).eq("id", orderId);

    // Send email (with retry)
    let emailOk = false;
    let lastErr = "";
    try {
      const r = await supabase.functions.invoke("send-key-email", { body: { orderId } });
      if (r.error) {
        lastErr = r.error.message || "error";
      } else if (r.data?.ok) {
        emailOk = true;
      } else {
        lastErr = r.data?.error || "";
      }
    } catch (e) {
      lastErr = String(e);
    }

    const reply = emailOk
      ? `Aprobado. Key enviada a ${order.email}\n${assignedKey}`
      : `Aprobado pero el envío de email falló. Key: ${assignedKey}\nError: ${lastErr}`;

    if (chatId && messageId) {
      await tg("editMessageReplyMarkup", { chat_id: chatId, message_id: messageId, reply_markup: { inline_keyboard: [] } });
      await tg("sendMessage", { chat_id: chatId, text: reply, reply_to_message_id: messageId });
    }
    await answerCb(cb.id, emailOk ? "Aprobado" : "Aprobado (email falló)");
    return new Response(JSON.stringify({ ok: true }));
  }

  if (action === "reject") {
    if (order.status !== "PENDING") {
      await answerCb(cb.id, `Ya fue procesada (${order.status})`);
      return new Response(JSON.stringify({ ok: true }));
    }
    const { data: claimed } = await supabase
      .from("payment_orders")
      .update({ status: "REJECTED", rejection_reason: "Rechazado por el administrador" })
      .eq("id", orderId)
      .eq("status", "PENDING")
      .select("id")
      .single();
    if (!claimed) {
      await answerCb(cb.id, "Ya fue procesada");
      return new Response(JSON.stringify({ ok: true }));
    }
    if (chatId && messageId) {
      await tg("editMessageReplyMarkup", { chat_id: chatId, message_id: messageId, reply_markup: { inline_keyboard: [] } });
      await tg("sendMessage", { chat_id: chatId, text: `Rechazado. ${order.email} podrá reenviar comprobante.`, reply_to_message_id: messageId });
    }
    await answerCb(cb.id, "Rechazado");
    return new Response(JSON.stringify({ ok: true }));
  }

  await answerCb(cb.id, "Acción desconocida");
  return new Response(JSON.stringify({ ok: true }));
});
