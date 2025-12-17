// src/app/api/whatsapp/send/route.ts
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { phone, message } = body

        if (!phone || !message) {
            return NextResponse.json(
                { error: 'phone and message are required' },
                { status: 400 }
            )
        }

        const response = await fetch(
            `${process.env.BAILEYS_API_URL}/send`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${process.env.BAILEYS_API_KEY}`
                },
                body: JSON.stringify({ phone, message }),
                cache: 'no-store'
            }
        )

        if (!response.ok) {
            const text = await response.text()
            return NextResponse.json(
                { error: text || 'Baileys API error' },
                { status: response.status }
            )
        }

        return NextResponse.json({ success: true })
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to send message' },
            { status: 500 }
        )
    }
}
