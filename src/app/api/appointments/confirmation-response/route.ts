/**
 * Webhook Receiver for Appointment Confirmation Messages
 * Parses incoming JSON strings for "message" and "client_phone"
 * and stores them in temporary server memory.
 * All comments are in English following user preferences.
 */

import { NextRequest, NextResponse } from "next/server";

// Temporary in-memory storage (resets on server restart)
let confirmationMessages: any[] = [];

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        // Extract raw fields
        const rawMessage = body.message;
        const rawClientPhones = body.client_phone;

        // Parse "message" JSON string to extract appointments
        let parsedAppointments = [];
        try {
            const msgObj = JSON.parse(rawMessage);
            parsedAppointments = msgObj.appointments || [];
        } catch (err) {
            console.error("Error parsing 'message' JSON string:", err);
        }

        // Parse "client_phone" JSON string
        let parsedClientPhones = [];
        try {
            parsedClientPhones = JSON.parse(rawClientPhones);
        } catch (err) {
            console.error("Error parsing 'client_phone' JSON string:", err);
        }

        // Store structured data in memory
        confirmationMessages.push({
            raw: body, // Original payload
            appointments: parsedAppointments,
            client_phones: parsedClientPhones,
            received_at: new Date().toISOString()
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error receiving confirmation webhook:", error);
        return NextResponse.json({ error: "Invalid webhook" }, { status: 400 });
    }
}

// Allow frontend to fetch stored webhook messages
export async function GET() {
    return NextResponse.json({ messages: confirmationMessages });
}
