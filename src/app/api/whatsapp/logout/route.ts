// src/app/api/whatsapp/logout/route.ts
import { NextResponse } from 'next/server'

export async function POST() {
    try {
        const response = await fetch(
            `${process.env.BAILEYS_API_URL}/logout`,
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${process.env.BAILEYS_API_KEY}`
                },
                cache: 'no-store'
            }
        )

        if (!response.ok) {
            return NextResponse.json(
                { error: 'Baileys API error during logout' },
                { status: response.status }
            )
        }

        return NextResponse.json({ success: true })
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to logout' },
            { status: 500 }
        )
    }
}
