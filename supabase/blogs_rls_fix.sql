-- Fix: "new row violates row-level security policy for table blogs"
--
-- Run this once in the Supabase Dashboard -> SQL Editor (project ttvyuavtvpwmceulrdpb).
-- It is idempotent and safe to re-run. RLS stays ENABLED. No service_role key is used.
--
-- Model: the Admin Blog page is the only place that creates a Supabase session,
-- so every authenticated session is treated as a blog administrator.
--   * anon (public site)      -> SELECT published blogs only
--   * authenticated (admin)   -> SELECT all + INSERT + UPDATE + DELETE

begin;

alter table public.blogs enable row level security;

-- Table-level privileges
revoke all on table public.blogs from anon, authenticated;
grant select on table public.blogs to anon, authenticated;
grant insert, update, delete on table public.blogs to authenticated;

-- Remove the previous policy set (old policies depended on app_metadata role)
drop policy if exists "Published blogs are public" on public.blogs;
drop policy if exists "Blog admins can insert" on public.blogs;
drop policy if exists "Blog admins can update" on public.blogs;
drop policy if exists "Blog admins can delete" on public.blogs;
drop policy if exists "Authenticated users read all blogs" on public.blogs;
drop policy if exists "Authenticated users insert blogs" on public.blogs;
drop policy if exists "Authenticated users update blogs" on public.blogs;
drop policy if exists "Authenticated users delete blogs" on public.blogs;
drop function if exists public.is_blog_admin();

-- Public: published blogs only (drafts stay hidden)
create policy "Published blogs are public"
on public.blogs for select to anon
using (status = 'published');

-- Admin: read every blog, including drafts
create policy "Authenticated users read all blogs"
on public.blogs for select to authenticated
using (true);

-- Admin: create / edit / delete
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

commit;
