import { createClient } from '@supabase/supabase-js'

// Frontend uses ONLY the publishable/anon key. Never put a service-role key here.
// Both values are read from Vite env vars (inlined at build time) and must be set
// with these exact names locally (.env.local) and on the host (Vercel).
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim()
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY?.trim()

const missingEnv = !supabaseUrl || !supabasePublishableKey

if (missingEnv) {
  // Loud, actionable error instead of a silent failure.
  console.error(
    '[supabase] Missing env vars. Set VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY ' +
      '(same names as .env.local) in the Vercel project, then redeploy.',
  )
}

// Fall back to a syntactically valid placeholder so createClient never throws at
// import time — a bad/missing key must not blank the whole site. Supabase calls
// then fail gracefully and are handled where they are made.
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabasePublishableKey || 'placeholder-key',
)
