// src/app/api/employees/route.ts

import { NextResponse } from "next/server";
import { DateTime } from "luxon";
import { supabaseClient } from "@/lib/supabase-client";
import { calculateAvailability } from "@/services/employees/availability.service";

const TIMEZONE = "America/Bogota";

export async function GET() {
    const now = DateTime.now().setZone(TIMEZONE);
    const dayOfWeek = now.weekday === 7 ? 0 : now.weekday;

    // ⏰ Horario del spa
    const { data: businessHours, error: bhError } = await supabaseClient
        .from("business_hours")
        .select("open_time, close_time")
        .eq("day_of_week", dayOfWeek)
        .single();

    if (bhError) {
        return NextResponse.json(
            { error: bhError.message },
            { status: 500 }
        );
    }

    // 👥 Empleados + citas del día
    const { data, error } = await supabaseClient
        .from("employees")
        .select(`
      id,
      full_name,
      appointments (
        start_at,
        end_at,
        status
      )
    `)
        .gte("appointments.end_at", now.startOf("day").toISO())
        .lte("appointments.start_at", now.endOf("day").toISO());

    if (error) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }

    const result = (data || []).map(emp =>
        calculateAvailability(
            {
                employee_id: emp.id,
                full_name: emp.full_name,
                appointments: emp.appointments || []
            },
            businessHours || { open_time: null, close_time: null },
            now
        )
    );

    return NextResponse.json(result);
}
