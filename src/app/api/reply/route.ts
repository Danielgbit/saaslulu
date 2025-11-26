import { NextResponse } from "next/server";

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

        lastReply = { sender, reply };

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

export async function GET() {
    return NextResponse.json(lastReply || {});
}

export async function DELETE() {
    lastReply = null;
    return NextResponse.json({ success: true });
}
