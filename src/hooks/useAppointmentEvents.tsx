import { useEffect, useState } from "react";
import AppointmentRealtime from "../services/appointmentRealtime.service";


export const useAppointmentEvents = () => {
    const [started, setStarted] = useState<Appointment | null>(null);
    const [ended, setEnded] = useState<Appointment | null>(null);


    useEffect(() => {
        AppointmentRealtime.init();


        AppointmentRealtime.onStart((a) => setStarted(a));


        AppointmentRealtime.onEnd((a) => setEnded(a));
    }, []);


    return { started, ended };
};


/* -----------------------------------------------------------
app/api/appointments/notify/route.ts (optional server endpoint)
- Called when start or end happens (webhooks, logs, automation)
----------------------------------------------------------- */
import { NextResponse } from "next/server";
import { Appointment } from "@/types/appointments";


export async function POST(req: Request) {
    const body = await req.json();


    // Save logs, notify staff, send email, etc.


    return NextResponse.json({ status: "ok" });
}