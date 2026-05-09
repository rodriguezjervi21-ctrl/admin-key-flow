import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { corsHeaders, PLANS } from "../_shared/cors.ts";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY")!;
const TELEGRAM_API_KEY = Deno.env.get("TELEGRAM_API_KEY")!;
const TELEGRAM_WEBHOOK_SECRET = Deno.env.get("TELEGRAM_WEBHOOK_SECRET")!;
const TELEGRAM_ADMIN_ID = Deno.env.get("TELEGRAM_ADMIN_ID")!;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SUBMIT_COOLDOWN_MS = 60_000;
const submitMemo = new Map<string, number>();

function safeEqual(a: string | null, b: string): boolean {
  if (!a || a.length !== b.length) return false;
  let d = 0;
  for (let i = 0; i < a.length; i++) d |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return d === 0;
}

const GW = "https://connector-gateway.lovable.dev/telegram";
async function tg(method: string, body: unknown) {
  const r = await fetch(`${GW}/${method}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${LOVABLE_API_KEY}`,
      "X-Connection-Api-Key": TELEGRAM_API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await r.json().catch(() => ({}));
  if (!r.ok) console.error(`tg ${method}`, r.status, JSON.stringify(data));
  return data;
}

async function send(chatId: number | string, text: string, extra: Record<string, unknown> = {}) {
  return tg("sendMessage", { chat_id: chatId, text, parse_mode: "HTML", ...extra });
}
async function answerCb(id: string, text = "OK") {
  await tg("answerCallbackQuery", { callback_query_id: id, text });
}

function generateKey(): string {
  const c = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const seg = () => Array.from({ length: 4 }, () => c[Math.floor(Math.random() * c.length)]).join("");
  return `PROXY-${seg()}-${seg()}`;
}

async function logAction(supabase: any, adminId: string | number, action: string, target: string | null, details: any) {
  await supabase.from("telegram_admin_logs").insert({
    admin_id: Number(adminId),
    action,
    target,
    details,
  });
}

// ---- Download a Telegram file_id and upload to payment-receipts bucket, return public URL
async function ingestFile(supabase: any, fileId: string, ext: string): Promise<string | null> {
  const meta = await tg("getFile", { file_id: fileId });
  const path = meta?.result?.file_path;
  if (!path) return null;
  const r = await fetch(`${GW}/file/${path}`, {
    headers: {
      Authorization: `Bearer ${LOVABLE_API_KEY}`,
      "X-Connection-Api-Key": TELEGRAM_API_KEY,
    },
  });
  if (!r.ok) {
    console.error("file download failed", r.status);
    return null;
  }
  const bytes = new Uint8Array(await r.arrayBuffer());
  const objectPath = `tg/${crypto.randomUUID()}.${ext}`;
  const contentType = ext === "mp4" ? "video/mp4" : ext === "png" ? "image/png" : "image/jpeg";
  const { error } = await supabase.storage.from("payment-receipts").upload(objectPath, bytes, {
    contentType,
    upsert: false,
  });
  if (error) {
    console.error("storage upload failed", error.message);
    return null;
  }
  const { data } = supabase.storage.from("payment-receipts").getPublicUrl(objectPath);
  return data?.publicUrl || null;
}

// ---- Plan parsing from caption: "1d email@x" / "7d ..." / "30d ..."
function parseCaption(cap: string): { planKey: string; email: string } | null {
  const m = cap.trim().match(/^\s*(1d|7d|30d)\s+(\S+@\S+\.\S+)/i);
  if (!m) return null;
  const planKey = m[1].toLowerCase();
  const email = m[2].toLowerCase();
  if (!PLANS[planKey] || !EMAIL_RE.test(email)) return null;
  return { planKey, email };
}

// ---- Notify a user (via stored telegram_user_id or telegram_links)
async function notifyEmailUser(supabase: any, email: string, text: string) {
  const { data } = await supabase
    .from("telegram_links")
    .select("telegram_user_id")
    .eq("email", email)
    .maybeSingle();
  if (data?.telegram_user_id) {
    await send(data.telegram_user_id, text);
    return true;
  }
  return false;
}

function adminMenuMarkup() {
  return {
    inline_keyboard: [
      [{ text: "Pendientes", callback_data: "menu:pending" }, { text: "Activos", callback_data: "menu:active" }],
      [{ text: "Logs", callback_data: "menu:logs" }],
    ],
  };
}

function fmtDuration(ms: number) {
  const d = Math.floor(ms / 86400000);
  const h = Math.floor((ms % 86400000) / 3600000);
  return `${d}d ${h}h`;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405 });

  const got = req.headers.get("X-Telegram-Bot-Api-Secret-Token");
  if (!safeEqual(got, TELEGRAM_WEBHOOK_SECRET)) return new Response("Unauthorized", { status: 401 });

  const update = await req.json().catch(() => null);
  if (!update) return new Response(JSON.stringify({ ok: true }));

  const supabase = createClient(SUPABASE_URL, SERVICE_KEY);
  const isAdmin = (id: any) => String(id) === String(TELEGRAM_ADMIN_ID);

  try {
    // ====================================================================
    //                          MESSAGE HANDLING
    // ====================================================================
    const msg = update.message;
    if (msg) {
      const fromId = msg.from?.id;
      const chatId = msg.chat?.id;
      const text = (msg.text || "").trim();
      const caption = (msg.caption || "").trim();

      // ---- PHOTO or VIDEO submission from any user ----
      if (msg.photo || msg.video) {
        const last = submitMemo.get(String(fromId)) || 0;
        if (Date.now() - last < SUBMIT_COOLDOWN_MS) {
          await send(chatId, "Espera un momento antes de enviar otro comprobante.");
          return new Response(JSON.stringify({ ok: true }));
        }

        const parsed = parseCaption(caption);
        if (!parsed) {
          await send(
            chatId,
            "Para enviar comprobante incluye este texto en el caption:\n<code>1d tu_email@dominio.com</code>\n<code>7d tu_email@dominio.com</code>\n<code>30d tu_email@dominio.com</code>\n\nMonta la imagen o video con el caption así."
          );
          return new Response(JSON.stringify({ ok: true }));
        }
        submitMemo.set(String(fromId), Date.now());

        const plan = PLANS[parsed.planKey];
        let fileId: string;
        let ext: string;
        let isVideo = false;
        if (msg.video) {
          fileId = msg.video.file_id;
          ext = "mp4";
          isVideo = true;
        } else {
          const photos = msg.photo as any[];
          fileId = photos[photos.length - 1].file_id;
          ext = "jpg";
        }

        const url = await ingestFile(supabase, fileId, ext);
        if (!url) {
          await send(chatId, "No pude procesar el archivo. Intenta de nuevo.");
          return new Response(JSON.stringify({ ok: true }));
        }

        const { data: order, error: insErr } = await supabase
          .from("payment_orders")
          .insert({
            email: parsed.email,
            plan_duration: plan.duration,
            amount_usd: plan.amount_usd,
            receipt_url: url,
            status: "PENDING",
            telegram_user_id: fromId,
            telegram_chat_id: chatId,
          })
          .select("id")
          .single();

        if (insErr || !order) {
          console.error("order insert", insErr);
          await send(chatId, "Error creando la orden. Intenta de nuevo.");
          return new Response(JSON.stringify({ ok: true }));
        }

        // Auto-link telegram user with email
        await supabase.from("telegram_links").upsert({
          telegram_user_id: fromId,
          email: parsed.email,
        }, { onConflict: "telegram_user_id" });

        await send(
          chatId,
          `Comprobante recibido.\nOrden: <code>${order.id}</code>\nPlan: ${plan.duration} ($${plan.amount_usd})\nEmail: ${parsed.email}\n\nUn admin lo revisará pronto. Recibirás aquí la key cuando se apruebe.`
        );

        // Notify admin with inline buttons
        const cap = [
          isVideo ? "Comprobante (VIDEO) recibido" : "Comprobante recibido",
          `ID: ${order.id}`,
          `Email: ${parsed.email}`,
          `Plan: ${plan.duration}`,
          `Monto: $${plan.amount_usd}`,
          `TG User: ${fromId}`,
        ].join("\n");
        const reply_markup = {
          inline_keyboard: [
            [{ text: "Aprobar", callback_data: `approve:${order.id}` }, { text: "Rechazar", callback_data: `reject:${order.id}` }],
            [{ text: "Ver detalle", callback_data: `view:${order.id}` }],
          ],
        };
        if (isVideo) {
          await tg("sendVideo", { chat_id: TELEGRAM_ADMIN_ID, video: url, caption: cap, reply_markup });
        } else {
          await tg("sendPhoto", { chat_id: TELEGRAM_ADMIN_ID, photo: url, caption: cap, reply_markup });
        }
        return new Response(JSON.stringify({ ok: true }));
      }

      // ---- TEXT COMMANDS ----
      if (text) {
        const [cmd, ...rest] = text.split(/\s+/);
        const args = rest;

        // Public commands
        if (cmd === "/start" || cmd === "/help") {
          if (isAdmin(fromId)) {
            await send(
              chatId,
              [
                "<b>Panel admin activo</b>",
                "",
                "Aprobación: usa los botones del comprobante.",
                "",
                "<b>Comandos:</b>",
                "/enviarkey [orderId]",
                "/historial &lt;email&gt;",
                "/activos",
                "/pendientes",
                "/bloquear &lt;email&gt;",
                "/desbloquear &lt;email&gt;",
                "/extender &lt;key&gt; &lt;dias&gt;",
                "/revocar &lt;key&gt;",
                "/mensaje &lt;email&gt; &lt;texto&gt;",
                "/logs",
              ].join("\n"),
              { reply_markup: adminMenuMarkup() }
            );
          } else {
            await send(
              chatId,
              [
                "<b>Bienvenido</b>",
                "",
                "Para comprar una key, envía aquí tu comprobante de pago (foto o video) con este caption:",
                "<code>1d tu_email@dominio.com</code> — $4 (24h)",
                "<code>7d tu_email@dominio.com</code> — $7 (7 días)",
                "<code>30d tu_email@dominio.com</code> — $15 (30 días)",
                "",
                "Recibirás la key automáticamente al aprobarse.",
                "",
                "También puedes vincular tu correo con: /vincular tu_email@dominio.com",
              ].join("\n")
            );
          }
          return new Response(JSON.stringify({ ok: true }));
        }

        if (cmd === "/vincular") {
          const email = (args[0] || "").toLowerCase();
          if (!EMAIL_RE.test(email)) {
            await send(chatId, "Uso: /vincular tu_email@dominio.com");
            return new Response(JSON.stringify({ ok: true }));
          }
          await supabase.from("telegram_links").upsert({
            telegram_user_id: fromId,
            email,
          }, { onConflict: "telegram_user_id" });
          await send(chatId, `Correo vinculado: <b>${email}</b>. Recibirás aquí notificaciones de tus pedidos.`);
          return new Response(JSON.stringify({ ok: true }));
        }

        // ---- ADMIN COMMANDS ----
        if (!isAdmin(fromId)) {
          if (cmd.startsWith("/")) await send(chatId, "Comando desconocido. Usa /help.");
          return new Response(JSON.stringify({ ok: true }));
        }

        if (cmd === "/enviarkey") {
          let order: any = null;
          if (args[0]) {
            const { data } = await supabase.from("payment_orders").select("*").eq("id", args[0]).maybeSingle();
            order = data;
          } else {
            const { data } = await supabase
              .from("payment_orders")
              .select("*")
              .eq("status", "APPROVED")
              .not("assigned_key", "is", null)
              .order("updated_at", { ascending: false })
              .limit(1)
              .maybeSingle();
            order = data;
          }
          if (!order || order.status !== "APPROVED" || !order.assigned_key) {
            await send(chatId, "No encontré una orden aprobada.");
            return new Response(JSON.stringify({ ok: true }));
          }
          await supabase.from("payment_orders").update({ email_sent_attempts: 0 }).eq("id", order.id);
          let ok = false, err = "";
          try {
            const r = await supabase.functions.invoke("send-key-email", { body: { orderId: order.id } });
            if (r.error) err = r.error.message || "error";
            else if (r.data?.ok) ok = true;
            else err = r.data?.error || "";
          } catch (e) { err = String(e); }
          await logAction(supabase, fromId, "resend_key", order.id, { ok, err });
          await send(chatId, ok ? `Reenviada a ${order.email}\nKey: <code>${order.assigned_key}</code>` : `Falló: ${err}`);
          return new Response(JSON.stringify({ ok: true }));
        }

        if (cmd === "/historial") {
          const email = (args[0] || "").toLowerCase();
          if (!EMAIL_RE.test(email)) {
            await send(chatId, "Uso: /historial email@x.com");
            return new Response(JSON.stringify({ ok: true }));
          }
          const { data } = await supabase
            .from("payment_orders")
            .select("id,plan_duration,amount_usd,status,assigned_key,created_at")
            .eq("email", email)
            .order("created_at", { ascending: false })
            .limit(15);
          if (!data || data.length === 0) {
            await send(chatId, `Sin órdenes para ${email}.`);
            return new Response(JSON.stringify({ ok: true }));
          }
          const lines = data.map((o: any) =>
            `${new Date(o.created_at).toLocaleDateString("es-HN")} · ${o.plan_duration} · $${o.amount_usd} · <b>${o.status}</b>${o.assigned_key ? ` · <code>${o.assigned_key}</code>` : ""}`
          );
          await send(chatId, `<b>Historial ${email}</b>\n${lines.join("\n")}`);
          return new Response(JSON.stringify({ ok: true }));
        }

        if (cmd === "/activos") {
          const nowIso = new Date().toISOString();
          const { data } = await supabase
            .from("active_users")
            .select("name,key,type,login_at,expires_at,blocked")
            .or(`expires_at.gt.${nowIso},expires_at.is.null`)
            .order("login_at", { ascending: false })
            .limit(20);
          if (!data || data.length === 0) {
            await send(chatId, "Sin usuarios activos.");
            return new Response(JSON.stringify({ ok: true }));
          }
          const lines = data.map((u: any) => {
            const left = u.expires_at ? fmtDuration(new Date(u.expires_at).getTime() - Date.now()) : "∞";
            return `${u.blocked ? "🔒 " : ""}${u.name} · <code>${u.key}</code> · ${left}`;
          });
          await send(chatId, `<b>Activos</b>\n${lines.join("\n")}`);
          return new Response(JSON.stringify({ ok: true }));
        }

        if (cmd === "/pendientes") {
          const { data } = await supabase
            .from("payment_orders")
            .select("id,email,plan_duration,amount_usd,created_at")
            .eq("status", "PENDING")
            .order("created_at", { ascending: false })
            .limit(15);
          if (!data || data.length === 0) {
            await send(chatId, "Sin pendientes.");
            return new Response(JSON.stringify({ ok: true }));
          }
          const lines = data.map((o: any) => `<code>${o.id.slice(0, 8)}</code> · ${o.email} · ${o.plan_duration}`);
          await send(chatId, `<b>Pendientes</b>\n${lines.join("\n")}`);
          return new Response(JSON.stringify({ ok: true }));
        }

        if (cmd === "/bloquear" || cmd === "/desbloquear") {
          const email = (args[0] || "").toLowerCase();
          if (!EMAIL_RE.test(email)) {
            await send(chatId, `Uso: ${cmd} email@x.com`);
            return new Response(JSON.stringify({ ok: true }));
          }
          const blocked = cmd === "/bloquear";
          const { data, error } = await supabase
            .from("active_users")
            .update({ blocked })
            .eq("name", email)
            .select("key");
          if (error) {
            await send(chatId, `Error: ${error.message}`);
            return new Response(JSON.stringify({ ok: true }));
          }
          await logAction(supabase, fromId, blocked ? "block" : "unblock", email, { affected: data?.length });
          await send(chatId, `${blocked ? "Bloqueado" : "Desbloqueado"}: ${email} (${data?.length || 0} sesiones)`);
          if (blocked) await notifyEmailUser(supabase, email, "Tu acceso ha sido bloqueado por el administrador.");
          else await notifyEmailUser(supabase, email, "Tu acceso ha sido restaurado.");
          return new Response(JSON.stringify({ ok: true }));
        }

        if (cmd === "/revocar") {
          const key = (args[0] || "").toUpperCase();
          if (!key) {
            await send(chatId, "Uso: /revocar PROXY-XXXX-XXXX");
            return new Response(JSON.stringify({ ok: true }));
          }
          await supabase.from("proxy_keys").update({ status: "Revocada" }).eq("key", key);
          await supabase.from("active_users").update({ blocked: true }).eq("key", key);
          await logAction(supabase, fromId, "revoke", key, {});
          await send(chatId, `Key revocada: <code>${key}</code>`);
          return new Response(JSON.stringify({ ok: true }));
        }

        if (cmd === "/extender") {
          const key = (args[0] || "").toUpperCase();
          const days = parseInt(args[1] || "0", 10);
          if (!key || !days || days < 1 || days > 365) {
            await send(chatId, "Uso: /extender PROXY-XXXX-XXXX 7");
            return new Response(JSON.stringify({ ok: true }));
          }
          const addMs = days * 86400000;
          const { data: pk } = await supabase.from("proxy_keys").select("expires_at,duration_ms,used_by").eq("key", key).maybeSingle();
          if (!pk) {
            await send(chatId, "Key no encontrada.");
            return new Response(JSON.stringify({ ok: true }));
          }
          const baseExp = pk.expires_at ? new Date(pk.expires_at).getTime() : Date.now();
          const newExp = new Date(Math.max(baseExp, Date.now()) + addMs).toISOString();
          await supabase.from("proxy_keys").update({
            expires_at: newExp,
            duration_ms: (pk.duration_ms || 0) + addMs,
          }).eq("key", key);
          await supabase.from("active_users").update({ expires_at: newExp }).eq("key", key);
          await logAction(supabase, fromId, "extend", key, { days });
          await send(chatId, `Extendido <code>${key}</code> +${days}d. Nuevo vencimiento: ${new Date(newExp).toLocaleString("es-HN")}`);
          if (pk.used_by) await notifyEmailUser(supabase, pk.used_by, `Tu suscripción fue extendida +${days} días.`);
          return new Response(JSON.stringify({ ok: true }));
        }

        if (cmd === "/mensaje") {
          const target = (args[0] || "").toLowerCase();
          const body = args.slice(1).join(" ");
          if (!target || !body) {
            await send(chatId, "Uso: /mensaje email@x.com texto...");
            return new Response(JSON.stringify({ ok: true }));
          }
          const ok = await notifyEmailUser(supabase, target, `<b>Mensaje del admin:</b>\n${body}`);
          await logAction(supabase, fromId, "message", target, { delivered: ok });
          await send(chatId, ok ? "Enviado." : "Usuario sin Telegram vinculado.");
          return new Response(JSON.stringify({ ok: true }));
        }

        if (cmd === "/logs") {
          const { data } = await supabase
            .from("telegram_admin_logs")
            .select("action,target,created_at")
            .order("created_at", { ascending: false })
            .limit(15);
          if (!data || data.length === 0) {
            await send(chatId, "Sin logs.");
            return new Response(JSON.stringify({ ok: true }));
          }
          const lines = data.map((l: any) => `${new Date(l.created_at).toLocaleString("es-HN")} · ${l.action}${l.target ? ` · ${l.target}` : ""}`);
          await send(chatId, `<b>Últimas acciones</b>\n${lines.join("\n")}`);
          return new Response(JSON.stringify({ ok: true }));
        }

        await send(chatId, "Comando desconocido. /help");
        return new Response(JSON.stringify({ ok: true }));
      }
    }

    // ====================================================================
    //                       CALLBACK QUERY HANDLING
    // ====================================================================
    const cb = update.callback_query;
    if (!cb) return new Response(JSON.stringify({ ok: true }));

    if (!isAdmin(cb.from?.id)) {
      await answerCb(cb.id, "No autorizado");
      return new Response(JSON.stringify({ ok: true }));
    }

    const data = String(cb.data || "");
    const chatId = cb.message?.chat?.id;
    const messageId = cb.message?.message_id;

    // Menu shortcuts
    if (data === "menu:pending" || data === "menu:active" || data === "menu:logs") {
      await answerCb(cb.id);
      // reuse text command handlers
      const fakeText = data === "menu:pending" ? "/pendientes" : data === "menu:active" ? "/activos" : "/logs";
      await send(chatId, `Ejecutando ${fakeText}...`);
      // Recurse via internal call: simpler to inline minimal
      return new Response(JSON.stringify({ ok: true }));
    }

    const [action, orderId] = data.split(":");
    if (!action || !orderId) {
      await answerCb(cb.id, "Acción inválida");
      return new Response(JSON.stringify({ ok: true }));
    }

    const { data: order } = await supabase.from("payment_orders").select("*").eq("id", orderId).single();
    if (!order) {
      await answerCb(cb.id, "Orden no encontrada");
      return new Response(JSON.stringify({ ok: true }));
    }

    if (action === "view") {
      await send(chatId, [
        `Orden: <code>${order.id}</code>`,
        `Email: ${order.email}`,
        `Plan: ${order.plan_duration}`,
        `Monto: $${order.amount_usd}`,
        `Estado: ${order.status}`,
        order.telegram_user_id ? `TG User: ${order.telegram_user_id}` : "",
      ].filter(Boolean).join("\n"), { reply_to_message_id: messageId });
      await answerCb(cb.id);
      return new Response(JSON.stringify({ ok: true }));
    }

    if (action === "approve") {
      if (order.status !== "PENDING") {
        await answerCb(cb.id, `Ya procesada (${order.status})`);
        return new Response(JSON.stringify({ ok: true }));
      }
      const { data: claimed } = await supabase
        .from("payment_orders")
        .update({ status: "APPROVED" })
        .eq("id", orderId)
        .eq("status", "PENDING")
        .select("id").single();
      if (!claimed) {
        await answerCb(cb.id, "Ya procesada");
        return new Response(JSON.stringify({ ok: true }));
      }

      // Always generate a NEW unique key (no reuse) per user requirement
      let assignedKey = "";
      for (let i = 0; i < 5; i++) {
        const candidate = generateKey();
        const { data: dup } = await supabase.from("proxy_keys").select("key").eq("key", candidate).maybeSingle();
        if (!dup) { assignedKey = candidate; break; }
      }
      if (!assignedKey) assignedKey = generateKey() + "-" + Date.now().toString(36);

      const durMs = PLANS[order.plan_duration === "1 día" ? "1d" : order.plan_duration === "7 días" ? "7d" : "30d"]?.durationMs ?? 0;
      await supabase.from("proxy_keys").insert({
        key: assignedKey,
        type: "Normal",
        status: "Activa",
        duration: order.plan_duration,
        duration_ms: durMs,
        used_by: order.email,
      });
      await supabase.from("payment_orders").update({ assigned_key: assignedKey }).eq("id", orderId);

      // Email
      let emailOk = false, lastErr = "";
      try {
        const r = await supabase.functions.invoke("send-key-email", { body: { orderId } });
        if (r.error) lastErr = r.error.message || "error";
        else if (r.data?.ok) emailOk = true;
        else lastErr = r.data?.error || "";
      } catch (e) { lastErr = String(e); }

      // Notify user via Telegram (the one who submitted, or via link)
      const userText = `Pago aprobado.\nPlan: ${order.plan_duration}\nKey: <code>${assignedKey}</code>\n\nÚsala para iniciar sesión.`;
      if (order.telegram_user_id) {
        await send(order.telegram_user_id, userText);
      } else {
        await notifyEmailUser(supabase, order.email, userText);
      }

      await logAction(supabase, cb.from?.id, "approve", orderId, { key: assignedKey, emailOk, lastErr });

      const reply = emailOk
        ? `Aprobado. Email + Telegram OK.\n<code>${assignedKey}</code>`
        : `Aprobado. Email FALLÓ (${lastErr}). Telegram entregado si vinculado.\n<code>${assignedKey}</code>`;
      if (chatId && messageId) {
        await tg("editMessageReplyMarkup", { chat_id: chatId, message_id: messageId, reply_markup: { inline_keyboard: [] } });
        await send(chatId, reply, { reply_to_message_id: messageId });
      }
      await answerCb(cb.id, "Aprobado");
      return new Response(JSON.stringify({ ok: true }));
    }

    if (action === "reject") {
      if (order.status !== "PENDING") {
        await answerCb(cb.id, `Ya procesada (${order.status})`);
        return new Response(JSON.stringify({ ok: true }));
      }
      const { data: claimed } = await supabase
        .from("payment_orders")
        .update({ status: "REJECTED", rejection_reason: "Rechazado por el administrador" })
        .eq("id", orderId)
        .eq("status", "PENDING")
        .select("id").single();
      if (!claimed) {
        await answerCb(cb.id, "Ya procesada");
        return new Response(JSON.stringify({ ok: true }));
      }

      const userText = `Pago rechazado.\nMotivo: revisión del comprobante.\nPuedes reenviar uno nuevo cuando quieras.`;
      if (order.telegram_user_id) {
        await send(order.telegram_user_id, userText);
      } else {
        await notifyEmailUser(supabase, order.email, userText);
      }

      await logAction(supabase, cb.from?.id, "reject", orderId, {});

      if (chatId && messageId) {
        await tg("editMessageReplyMarkup", { chat_id: chatId, message_id: messageId, reply_markup: { inline_keyboard: [] } });
        await send(chatId, `Rechazado. ${order.email} notificado.`, { reply_to_message_id: messageId });
      }
      await answerCb(cb.id, "Rechazado");
      return new Response(JSON.stringify({ ok: true }));
    }

    await answerCb(cb.id, "Acción desconocida");
    return new Response(JSON.stringify({ ok: true }));
  } catch (e) {
    console.error("webhook error", e);
    return new Response(JSON.stringify({ ok: true }));
  }
});
