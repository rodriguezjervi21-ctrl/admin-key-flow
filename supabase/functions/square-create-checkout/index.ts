const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

// Plans whitelisted server-side. Client cannot pick arbitrary prices.
const PLANS: Record<string, { label: string; amount: number; duration: string; durationMs: number }> = {
  "7d": {
    label: "7 días",
    amount: 20000, // L 200.00 (HNL en centavos)
    duration: "7 días",
    durationMs: 7 * 24 * 60 * 60 * 1000,
  },
  "30d": {
    label: "30 días",
    amount: 40000, // L 400.00 (HNL en centavos)
    duration: "30 días",
    durationMs: 30 * 24 * 60 * 60 * 1000,
  },
};

function squareBaseUrl(): string {
  const env = (Deno.env.get("SQUARE_ENVIRONMENT") ?? "production").toLowerCase();
  return env === "sandbox"
    ? "https://connect.squareupsandbox.com"
    : "https://connect.squareup.com";
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const body = await req.json().catch(() => ({}));
    const planId = String(body?.planId ?? "");
    const customerName = String(body?.customerName ?? "").slice(0, 80);
    const origin = String(body?.origin ?? "");

    const plan = PLANS[planId];
    if (!plan) {
      return new Response(JSON.stringify({ error: "Plan inválido" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (!origin) {
      return new Response(JSON.stringify({ error: "Origin requerido" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const accessToken = Deno.env.get("SQUARE_ACCESS_TOKEN");
    const locationId = Deno.env.get("SQUARE_LOCATION_ID");
    if (!accessToken || !locationId) {
      return new Response(JSON.stringify({ error: "Square no está configurado" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const idempotencyKey = crypto.randomUUID();
    const redirectUrl = `${origin}/success?plan=${encodeURIComponent(planId)}`;

    const payload = {
      idempotency_key: idempotencyKey,
      quick_pay: {
        name: `Boykaffx7 APP — Key ${plan.label}`,
        price_money: { amount: plan.amount, currency: "HNL" },
        location_id: locationId,
      },
      checkout_options: {
        redirect_url: redirectUrl,
        ask_for_shipping_address: false,
        merchant_support_email: undefined,
      },
      pre_populated_data: customerName ? { buyer_email: undefined } : undefined,
      note: `plan:${planId}|user:${customerName}`,
    };

    const resp = await fetch(`${squareBaseUrl()}/v2/online-checkout/payment-links`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        "Square-Version": "2024-09-19",
      },
      body: JSON.stringify(payload),
    });

    const data = await resp.json();
    if (!resp.ok) {
      console.error("Square error:", data);
      return new Response(
        JSON.stringify({ error: data?.errors?.[0]?.detail ?? "No se pudo crear el checkout" }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const url = data?.payment_link?.url;
    const orderId = data?.payment_link?.order_id;
    if (!url) {
      return new Response(JSON.stringify({ error: "Respuesta inválida de Square" }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ url, orderId, planId }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: "Error interno" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});