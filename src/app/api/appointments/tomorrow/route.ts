/* src/app/api/appointments/tomorrow/route.ts */

import { supabaseClient } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const now = new Date();
        const tomorrowStart = new Date(now);
        tomorrowStart.setDate(now.getDate() + 1);
        tomorrowStart.setHours(0, 0, 0, 0);

        const tomorrowEnd = new Date(now);
        tomorrowEnd.setDate(now.getDate() + 1);
        tomorrowEnd.setHours(23, 59, 59, 999);

        const { data: appointments, error } = await supabaseClient
            .from("appointments")
            .select(`
                *,
                employee:employees (
                    id,
                    full_name
                ),
                service:services (
                    id,
                    name,
                    price,
                    duration_minutes
                )
            `)
            .gte("start_at", tomorrowStart.toISOString())
            .lte("start_at", tomorrowEnd.toISOString());

        if (error) {
            console.error("Supabase error:", error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({
            count: appointments?.length || 0,
            appointments: appointments || []
        });

    } catch (error) {
        console.error("Internal error:", error);
        return NextResponse.json(
            { error: "Error interno del servidor" },
            { status: 500 }
        );
    }
}
