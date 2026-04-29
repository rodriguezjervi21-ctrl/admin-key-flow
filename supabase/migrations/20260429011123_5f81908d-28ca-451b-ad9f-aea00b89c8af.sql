create table public.transactions (
  id uuid primary key default gen_random_uuid(),
  payment_id text not null unique,
  order_id text,
  provider text not null default 'square',
  amount_cents integer not null,
  currency text not null default 'USD',
  status text not null,
  duration text not null,
  duration_ms bigint not null,
  generated_key text,
  customer_name text,
  raw jsonb,
  created_at timestamptz not null default now()
);

alter table public.transactions enable row level security;

create policy "Public can insert transactions"
on public.transactions for insert to anon, authenticated
with check (true);

create policy "Public can read transactions"
on public.transactions for select to anon, authenticated
using (true);

create index transactions_payment_id_idx on public.transactions(payment_id);