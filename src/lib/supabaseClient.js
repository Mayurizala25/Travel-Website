import { createClient } from '@supabase/supabase-js'

// Frontend uses ONLY the publishable/anon key. Never put a service-role key here.
// Both values are read from Vite env vars (inlined at build time) and must be set
// with these exact names locally (.env.local) and on the host (Vercel).
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim()
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY?.trim()

if (!supabaseUrl || !supabasePublishableKey) {
  // Loud, actionable error instead of a silent "temporarily unavailable".
  console.error(
    '[supabase] Missing env vars. Set VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY ' +
      '(same names as .env.local) in the Vercel project, then redeploy.',
  )
}

export const supabase = createClient(supabaseUrl, supabasePublishableKey)
