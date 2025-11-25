/**
 * @fileoverview API Route: Receives reply messages sent from n8n.
 * Stores the reply in memory so the UI can retrieve it.
 */

import { NextResponse } from "next/server";

// In-memory store (resets only when server restarts)
let lastReply: { sender: string; reply: string } | null = null;

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { sender, reply } = body;

        if (!sender || !reply) {
            return NextResponse.json(
                { error: "Missing required fields: 'sender' and 'reply'" },
                { status: 400 }
            );
        }

        // Save reply so UI can poll it
        lastReply = { sender, reply };

        console.log("📩 Incoming reply from n8n:");
        console.log("Sender:", sender);
        console.log("Reply:", reply);

        return NextResponse.json({
            status: "success",
            received: lastReply,
        });
    } catch (error) {
        return NextResponse.json(
            { error: "Internal server error processing reply." },
            { status: 500 }
        );
    }
}

// Endpoint for UI polling
export async function GET() {
    return NextResponse.json(lastReply || {});
}