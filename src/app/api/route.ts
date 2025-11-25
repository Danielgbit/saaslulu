/**
 * @fileoverview API Route: Proxies chat messages from the client to n8n.
 * This endpoint hides the n8n webhook URL from the frontend and adds a security layer.
 */

import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        // Parse incoming request body
        const { message } = await request.json();

        // Validate required fields
        if (!message) {
            return NextResponse.json(
                { error: "Message is required." },
                { status: 400 }
            );
        }

        /**
         * IMPORTANT:
         * Replace this with your actual n8n webhook endpoint.
         */
        const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL;

        if (!N8N_WEBHOOK_URL) {
            return NextResponse.json(
                { error: "Missing N8N webhook URL in environment variables." },
                { status: 500 }
            );
        }

        console.log(message);


        // Forward the request to n8n
        const response = await fetch(N8N_WEBHOOK_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                message,
                messageType: { type: "text" },
                webhookType: { type: "web" }
            }),
        });

        // Parse n8n response
        const data = await response.json();

        return NextResponse.json({ reply: data.reply });
    } catch (error) {
        console.error("N8N API Error:", error);

        return NextResponse.json(
            { error: "Internal server error." },
            { status: 500 }
        );
    }
}
