// src/lib/supabase-server.ts

import { createClient } from '@supabase/supabase-js'

export function createSupabaseServerClient() {
  const url = process.env.SUPABASE_URL
  const anon = process.env.SUPABASE_ANON_KEY

  if (!url || !anon) {
    throw new Error('Missing Supabase server env variables')
  }

  return createClient(url, anon)
}
