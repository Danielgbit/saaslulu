// app/api/appointments/tomorrow/route.ts

import { NextResponse } from "next/server";
import { getTomorrowAppointments } from "@/services/appointments/appointments.service";

export async function GET() {
    try {
        return NextResponse.json(await getTomorrowAppointments());
    } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}
