import { createClient } from '@supabase/supabase-js'

// Frontend uses ONLY the publishable/anon key. It is safe to expose in the
// bundle — every table is gated by Row Level Security (anon can read published
// blogs and insert trip enquiries, nothing else). Never put a service-role key
// here.
//
// A build-time env var (.env, .env.local, or the host dashboard) overrides the
// defaults below. The hardcoded fallback is the same public config committed in
// .env, so the app keeps working even if the host has missing or empty
// VITE_SUPABASE_* variables.
const FALLBACK_SUPABASE_URL = 'https://ttvyuavtvpwmceulrdpb.supabase.co'
const FALLBACK_SUPABASE_PUBLISHABLE_KEY = 'sb_publishable___4BvW_4dHT4BPEIGwzClA_0kUA7y34'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim() || FALLBACK_SUPABASE_URL
const supabasePublishableKey =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY?.trim() || FALLBACK_SUPABASE_PUBLISHABLE_KEY

export const supabase = createClient(supabaseUrl, supabasePublishableKey)
