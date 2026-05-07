
CREATE TABLE public.payment_orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  plan_duration TEXT NOT NULL CHECK (plan_duration IN ('1 día', '7 días', '30 días')),
  amount_usd INTEGER NOT NULL,
  receipt_url TEXT,
  status TEXT NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING','AI_REJECTED','APPROVED','REJECTED')),
  ai_validation JSONB,
  telegram_message_id BIGINT,
  assigned_key TEXT,
  email_sent_attempts INTEGER NOT NULL DEFAULT 0,
  email_sent_at TIMESTAMPTZ,
  rejection_reason TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_payment_orders_status ON public.payment_orders(status);
CREATE INDEX idx_payment_orders_email ON public.payment_orders(email);

ALTER TABLE public.payment_orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create orders"
  ON public.payment_orders FOR INSERT TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can read orders"
  ON public.payment_orders FOR SELECT TO anon, authenticated
  USING (true);

-- No update/delete policies for client - only service role can mutate

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_payment_orders_updated_at
  BEFORE UPDATE ON public.payment_orders
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Storage bucket for receipts
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('payment-receipts', 'payment-receipts', true, 5242880, ARRAY['image/jpeg','image/png','image/webp','image/jpg'])
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public can read receipts"
  ON storage.objects FOR SELECT TO anon, authenticated
  USING (bucket_id = 'payment-receipts');

CREATE POLICY "Anyone can upload receipts"
  ON storage.objects FOR INSERT TO anon, authenticated
  WITH CHECK (bucket_id = 'payment-receipts');
