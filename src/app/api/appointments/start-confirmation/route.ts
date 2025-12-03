import { NextRequest, NextResponse } from "next/server";
import { supabaseClient } from "@/lib/supabaseClient";


export async function POST(req: NextRequest) {
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
            .select(`*`)
            .gte("start_at", tomorrowStart.toISOString())
            .lte("start_at", tomorrowEnd.toISOString());

        if (error) {
            console.error("Error fetching appointments:", error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        if (!appointments || appointments.length === 0) {
            return NextResponse.json({
                message: "No hay citas para mañana",
                appointments: []
            });
        }

        const results = [];

        for (const appointment of appointments) {
            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), 10000);

            try {
                const response = await fetch(
                    "https://centrodeesteticalulu.site/webhook-test/send-confirmation",
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ appointment_id: appointment.id, key: Date.now() }),
                        signal: controller.signal
                    }
                );

                clearTimeout(timeout);

                let result;
                const contentType = response.headers.get("content-type");
                if (contentType && contentType.includes("application/json")) {
                    result = await response.json();
                } else {
                    result = await response.text();
                }

                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: ${JSON.stringify(result)}`);
                }

                results.push({
                    appointment_id: appointment.id,
                    status: response.status,
                    success: response.ok,
                    result
                });
            } catch (error: any) {
                clearTimeout(timeout);
                if (error.name === 'AbortError') {
                    results.push({
                        appointment_id: appointment.id,
                        error: 'Request timeout',
                        success: false
                    });
                } else {
                    results.push({
                        appointment_id: appointment.id,
                        error: error.message,
                        success: false
                    });
                }
            }
        }

        return NextResponse.json({
            message: `Procesadas ${appointments.length} citas`,
            total: appointments.length,
            successful: results.filter(r => r.success).length,
            failed: results.filter(r => !r.success).length,
            details: results
        });

    } catch (error) {
        console.error("Error in start-confirmation:", error);
        return NextResponse.json(
            { error: "Error interno del servidor" },
            { status: 500 }
        );
    }
}



// También puedes agregar GET si quieres ver las citas primero
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
            .select(`*`)
            .gte("start_at", tomorrowStart.toISOString())
            .lte("start_at", tomorrowEnd.toISOString());

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({
            count: appointments?.length || 0,
            appointments: appointments || []
        });

    } catch (error) {
        return NextResponse.json(
            { error: "Error interno del servidor" },
            { status: 500 }
        );
    }
}