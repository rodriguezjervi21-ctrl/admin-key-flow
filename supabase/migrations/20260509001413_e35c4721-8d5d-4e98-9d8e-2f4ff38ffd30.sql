ALTER TABLE public.payment_orders
  ADD COLUMN IF NOT EXISTS telegram_user_id BIGINT,
  ADD COLUMN IF NOT EXISTS telegram_chat_id BIGINT;

CREATE TABLE IF NOT EXISTS public.telegram_links (
  telegram_user_id BIGINT PRIMARY KEY,
  email TEXT NOT NULL,
  linked_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.telegram_links ENABLE ROW LEVEL SECURITY;
CREATE POLICY "no client access" ON public.telegram_links FOR ALL TO anon, authenticated USING (false) WITH CHECK (false);

CREATE TABLE IF NOT EXISTS public.telegram_admin_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id BIGINT NOT NULL,
  action TEXT NOT NULL,
  target TEXT,
  details JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.telegram_admin_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "no client access" ON public.telegram_admin_logs FOR ALL TO anon, authenticated USING (false) WITH CHECK (false);

CREATE INDEX IF NOT EXISTS idx_telegram_links_email ON public.telegram_links(email);
CREATE INDEX IF NOT EXISTS idx_admin_logs_created ON public.telegram_admin_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_payment_orders_email ON public.payment_orders(email);
CREATE INDEX IF NOT EXISTS idx_payment_orders_tg_user ON public.payment_orders(telegram_user_id);