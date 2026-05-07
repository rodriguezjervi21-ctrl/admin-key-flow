export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
};

export const PLANS: Record<string, { duration: string; amount_usd: number; durationMs: number }> = {
  "1d": { duration: "1 día", amount_usd: 4, durationMs: 24 * 60 * 60 * 1000 },
  "7d": { duration: "7 días", amount_usd: 7, durationMs: 7 * 24 * 60 * 60 * 1000 },
  "30d": { duration: "30 días", amount_usd: 15, durationMs: 30 * 24 * 60 * 60 * 1000 },
};
