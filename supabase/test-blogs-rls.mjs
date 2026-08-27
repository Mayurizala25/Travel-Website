// Verifies the blogs RLS policies end to end.
//
//   ADMIN_EMAIL=you@example.com ADMIN_PASSWORD=secret node supabase/test-blogs-rls.mjs
//
// Reads Supabase config from .env.local. Uses only the publishable (anon) key.
import { readFileSync } from 'node:fs'
import { createClient } from '@supabase/supabase-js'

const env = Object.fromEntries(
  readFileSync(new URL('../.env.local', import.meta.url), 'utf8')
    .split('\n').filter((l) => l.includes('=')).map((l) => {
      const i = l.indexOf('=')
      return [l.slice(0, i).trim(), l.slice(i + 1).trim()]
    }),
)
const URL_ = env.VITE_SUPABASE_URL
const KEY = env.VITE_SUPABASE_PUBLISHABLE_KEY
const { ADMIN_EMAIL, ADMIN_PASSWORD } = process.env

let pass = 0
let fail = 0
const check = (name, ok, detail = '') => {
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? ` -> ${detail}` : ''}`)
  ok ? pass++ : fail++
}

// --- Admin session ---
const admin = createClient(URL_, KEY)
const { error: signInErr } = await admin.auth.signInWithPassword({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD })
if (signInErr) {
  console.error('Cannot sign in as admin:', signInErr.message)
  process.exit(1)
}

const slug = `rls-test-${Date.now()}`
let id

// 1. Admin creates a draft blog
{
  const { data, error } = await admin.from('blogs').insert({
    title: 'RLS Test Blog', slug, cover_image_url: 'https://example.com/x.jpg',
    excerpt: 'test', content: 'test', category: 'Test', status: 'draft',
  }).select('id').single()
  id = data?.id
  check('admin can INSERT blog', !error && !!id, error?.message)
}

// 2. Admin edits it (publish), then we test public visibility both ways
{
  const { error } = await admin.from('blogs').update({ status: 'published' }).eq('id', id)
  check('admin can UPDATE blog', !error, error?.message)
}

// --- Anonymous session ---
const anon = createClient(URL_, KEY)

// 3. Published blog is visible publicly
{
  const { data, error } = await anon.from('blogs').select('id').eq('slug', slug)
  check('public CAN see published blog', !error && data?.length === 1, error?.message)
}

// 4. Draft is hidden publicly
{
  await admin.from('blogs').update({ status: 'draft' }).eq('id', id)
  const { data, error } = await anon.from('blogs').select('id').eq('slug', slug)
  check('public CANNOT see draft blog', !error && data?.length === 0, error?.message ?? `${data?.length} rows`)
}

// 5. Anonymous cannot insert
{
  const { error } = await anon.from('blogs').insert({
    title: 'hax', slug: `hax-${Date.now()}`, cover_image_url: 'https://example.com/x.jpg',
  })
  check('public CANNOT insert blog', !!error, error ? 'blocked' : 'UNEXPECTED SUCCESS')
}

// 6. Admin deletes it (cleanup + test)
{
  const { error } = await admin.from('blogs').delete().eq('id', id)
  check('admin can DELETE blog', !error, error?.message)
}

await admin.auth.signOut()
console.log(`\n${pass} passed, ${fail} failed`)
process.exit(fail ? 1 : 0)
