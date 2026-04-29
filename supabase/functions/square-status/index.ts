const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
};

function squareBaseUrl(): string {
  const env = (Deno.env.get("SQUARE_ENVIRONMENT") ?? "production").toLowerCase();
  return env === "sandbox"
    ? "https://connect.squareupsandbox.com"
    : "https://connect.squareup.com";
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  const accessToken = Deno.env.get("SQUARE_ACCESS_TOKEN");
  const locationId = Deno.env.get("SQUARE_LOCATION_ID");

  const result = {
    available: false,
    reason: "" as string,
    currency: "" as string,
    locationStatus: "" as string,
  };

  if (!accessToken || !locationId) {
    result.reason = "Square no está configurado";
    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const resp = await fetch(`${squareBaseUrl()}/v2/locations/${locationId}`, {
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Square-Version": "2024-09-19",
      },
    });
    const data = await resp.json();

    if (!resp.ok) {
      result.reason = data?.errors?.[0]?.detail ?? "No se pudo consultar Square";
      return new Response(JSON.stringify(result), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const loc = data?.location ?? {};
    const capabilities: string[] = loc?.capabilities ?? [];
    const status: string = loc?.status ?? "";
    const currency: string = loc?.currency ?? "";

    result.currency = currency;
    result.locationStatus = status;

    const canProcess = capabilities.includes("CREDIT_CARD_PROCESSING");
    const isActive = status === "ACTIVE";
    const currencyOk = currency === "HNL";

    if (!isActive) {
      result.reason = "La cuenta de Square no está activa";
    } else if (!canProcess) {
      result.reason = "Este negocio no acepta pagos con tarjeta todavía";
    } else if (!currencyOk) {
      result.reason = `La cuenta procesa en ${currency}, no en HNL`;
    } else {
      result.available = true;
    }

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("square-status error:", e);
    result.reason = "Error consultando estado de pagos";
    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});