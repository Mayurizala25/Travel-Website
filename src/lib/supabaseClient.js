import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

// These are inlined at build time. If the deploy platform (e.g. Vercel) is
// missing them, blogs/enquiries silently return nothing — make that loud.
if (!supabaseUrl || !supabasePublishableKey) {
  console.error(
    'Supabase env vars missing: set VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY ' +
      'in the hosting project, then redeploy.',
  )
}

export const supabase = createClient(supabaseUrl, supabasePublishableKey)
