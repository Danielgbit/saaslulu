import { NextResponse } from "next/server";
import { getTomorrowAppointments } from "@/services/appointments/appointments.service";

export async function GET() {
    try {
        const data = await getTomorrowAppointments();
        return NextResponse.json(data);
    } catch (err: any) {
        return NextResponse.json(
            { error: err.message },
            { status: 500 }
        );
    }
}
