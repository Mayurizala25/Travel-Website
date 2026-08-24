create table if not exists public.trip_enquiries (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  phone text not null,
  destination text not null,
  travelers integer not null check (travelers between 1 and 50),
  travel_date date not null,
  budget text not null,
  message text not null default '',
  created_at timestamptz not null default now()
);

alter table public.trip_enquiries enable row level security;

revoke all on table public.trip_enquiries from anon, authenticated;
grant insert on table public.trip_enquiries to anon, authenticated;

drop policy if exists "Allow anonymous enquiry inserts" on public.trip_enquiries;
create policy "Allow anonymous enquiry inserts"
on public.trip_enquiries
for insert
to anon
with check (true);

drop policy if exists "Allow authenticated enquiry inserts" on public.trip_enquiries;
create policy "Allow authenticated enquiry inserts"
on public.trip_enquiries
for insert
to authenticated
with check (true);
