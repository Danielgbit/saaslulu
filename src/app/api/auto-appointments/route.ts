/**
 * Auto update appointments CRON
 * Runs from Vercel cron job
 */

import { createClient } from '@supabase/supabase-js';

export async function GET() {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY! // segura en backend
    );

    await supabase.rpc("mark_appointments_in_progress");
    await supabase.rpc("mark_appointments_completed");

    return Response.json({ status: "ok" });
}
