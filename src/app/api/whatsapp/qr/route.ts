import { NextResponse } from 'next/server'

export async function GET() {
    try {
        const response = await fetch(
            `${process.env.BAILEYS_API_URL}/qr`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.BAILEYS_API_KEY}`
                },
                cache: 'no-store'
            }
        )

        if (!response.ok) {
            return NextResponse.json(
                { error: 'Baileys API error' },
                { status: response.status }
            )
        }

        const data = await response.json()
        return NextResponse.json(data)
    } catch (err) {
        return NextResponse.json(
            { error: 'Failed to fetch QR' },
            { status: 500 }
        )
    }
}
