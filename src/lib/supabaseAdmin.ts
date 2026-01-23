import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

/**
 * Cliente de Supabase con privilegios administrativos (Service Role)
 * Usar únicamente en el lado del servidor.
 */
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)
