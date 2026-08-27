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

create table if not exists public.blogs (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text not null default '',
  cover_image_url text not null,
  gallery_images jsonb not null default '[]'::jsonb,
  content text not null default '',
  category text not null default 'Travel',
  author text not null default '',
  publish_date date not null default current_date,
  seo_title text not null default '',
  seo_description text not null default '',
  seo_keywords text not null default '',
  image_alt_text text not null default '',
  status text not null default 'draft' check (status in ('draft', 'published')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  published_at timestamptz
);

alter table public.blogs enable row level security;

-- The Admin Blog UI is the only place that signs a user in, so any
-- authenticated Supabase session is treated as a blog administrator.
-- Anonymous visitors can only read published posts.
revoke all on table public.blogs from anon, authenticated;
grant select on table public.blogs to anon, authenticated;
grant insert, update, delete on table public.blogs to authenticated;

-- Drop the previous policy set (including the old app_metadata-based ones).
drop policy if exists "Published blogs are public" on public.blogs;
drop policy if exists "Blog admins can insert" on public.blogs;
drop policy if exists "Blog admins can update" on public.blogs;
drop policy if exists "Blog admins can delete" on public.blogs;
drop function if exists public.is_blog_admin();

-- Public: read published blogs only (drafts stay hidden).
create policy "Published blogs are public"
on public.blogs for select to anon
using (status = 'published');

-- Admin (any signed-in user): read every blog, including drafts.
create policy "Authenticated users read all blogs"
on public.blogs for select to authenticated
using (true);

-- Admin (any signed-in user): create, edit and delete blogs.
create policy "Authenticated users insert blogs"
on public.blogs for insert to authenticated
with check (true);

create policy "Authenticated users update blogs"
on public.blogs for update to authenticated
using (true)
with check (true);

create policy "Authenticated users delete blogs"
on public.blogs for delete to authenticated
using (true);
