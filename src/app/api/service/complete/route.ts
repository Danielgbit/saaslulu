import { NextResponse } from 'next/server'
import { completeService } from '@/services/services/servicesCompleted.service'

export async function POST(request: Request) {
    try {
        const body = await request.json()

        await completeService(body)

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('❌ complete service error:', error)
        return NextResponse.json(
            { success: false },
            { status: 500 }
        )
    }
}
