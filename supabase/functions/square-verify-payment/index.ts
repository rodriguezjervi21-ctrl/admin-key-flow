import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const PLANS: Record<string, { label: string; amount: number; duration: string; durationMs: number; type: "Normal" | "Premium" }> = {
  "7d": { label: "7 días", amount: 700, duration: "7 días", durationMs: 7 * 24 * 60 * 60 * 1000, type: "Normal" },
  "30d": { label: "30 días", amount: 1500, duration: "30 días", durationMs: 30 * 24 * 60 * 60 * 1000, type: "Premium" },
};

function squareBaseUrl(): string {
  const env = (Deno.env.get("SQUARE_ENVIRONMENT") ?? "production").toLowerCase();
  return env === "sandbox"
    ? "https://connect.squareupsandbox.com"
    : "https://connect.squareup.com";
}

function generateKey(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const seg = () =>
    Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
  return `PROXY-${seg()}-${seg()}`;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const body = await req.json().catch(() => ({}));
    const orderId = String(body?.orderId ?? "").trim();
    const planId = String(body?.planId ?? "").trim();

    if (!orderId || !planId) {
      return new Response(JSON.stringify({ error: "Faltan parámetros" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const plan = PLANS[planId];
    if (!plan) {
      return new Response(JSON.stringify({ error: "Plan inválido" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const accessToken = Deno.env.get("SQUARE_ACCESS_TOKEN");
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceRole = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!accessToken || !supabaseUrl || !serviceRole) {
      return new Response(JSON.stringify({ error: "Servicio no configurado" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(supabaseUrl, serviceRole);

    // 1. If we already issued a key for this order, return it (idempotent).
    const { data: existing } = await supabase
      .from("transactions")
      .select("generated_key, status, duration")
      .eq("order_id", orderId)
      .maybeSingle();

    if (existing?.generated_key) {
      return new Response(
        JSON.stringify({
          key: existing.generated_key,
          duration: existing.duration,
          type: plan.type,
          alreadyIssued: true,
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // 2. Verify with Square that the order is fully paid.
    const orderResp = await fetch(`${squareBaseUrl()}/v2/orders/${orderId}`, {
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Square-Version": "2024-09-19",
      },
    });
    const orderData = await orderResp.json();
    if (!orderResp.ok) {
      console.error("Square order fetch error:", orderData);
      return new Response(JSON.stringify({ error: "No se pudo verificar el pago" }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const order = orderData?.order;
    const state = order?.state; // OPEN | COMPLETED | CANCELED
    const totalPaid = Number(order?.net_amount_due_money?.amount ?? -1);
    const totalMoney = Number(order?.total_money?.amount ?? 0);

    // Order must be fully paid: net_amount_due === 0 AND total matches plan
    const fullyPaid = state === "COMPLETED" || (totalPaid === 0 && totalMoney === plan.amount);
    if (!fullyPaid) {
      return new Response(
        JSON.stringify({
          error: "El pago aún no está confirmado. Si ya pagaste, espera unos segundos e inténtalo otra vez.",
          state,
        }),
        { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    if (totalMoney !== plan.amount) {
      return new Response(JSON.stringify({ error: "Monto inválido" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // 3. Generate key (active immediately, ready to claim by user)
    const key = generateKey();
    const nowIso = new Date().toISOString();

    const { error: keyErr } = await supabase.from("proxy_keys").insert({
      key,
      type: plan.type,
      status: "Activa",
      duration: plan.duration,
      duration_ms: plan.durationMs,
      created_at: nowIso,
    });
    if (keyErr) {
      console.error("Key insert error:", keyErr);
      return new Response(JSON.stringify({ error: "Error generando key" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // 4. Record transaction (idempotent on payment_id = orderId)
    await supabase.from("transactions").insert({
      payment_id: orderId,
      order_id: orderId,
      provider: "square",
      amount_cents: plan.amount,
      currency: "USD",
      status: "COMPLETED",
      duration: plan.duration,
      duration_ms: plan.durationMs,
      generated_key: key,
      raw: order,
    });

    return new Response(
      JSON.stringify({ key, duration: plan.duration, type: plan.type }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: "Error interno" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});