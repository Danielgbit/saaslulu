import { NextResponse } from 'next/server'
import {
    getFinancialMovementsByDate,
    createFinancialMovement
} from '@/services/financial-movements.service'
import { financialMovementSchema } from '@/validators/financialMovement.schema'

/**
 * Maneja la obtención de movimientos financieros por fecha.
 * URL: GET /api/financial-movements?date=YYYY-MM-DD
 */
export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const date = searchParams.get('date')

    if (!date) {
        return NextResponse.json(
            { error: 'date is required' },
            { status: 400 }
        )
    }

    try {
        const movements = await getFinancialMovementsByDate(date)
        return NextResponse.json(movements)
    } catch (error) {
        console.error('[FINANCIAL_MOVEMENTS_GET]', error)
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        )
    }
}

/**
 * Maneja la creación de un nuevo movimiento financiero.
 * URL: POST /api/financial-movements
 */
export async function POST(req: Request) {
    try {
        const body = await req.json()

        const parsed = financialMovementSchema.safeParse(body)
        if (!parsed.success) {
            return NextResponse.json(
                { error: parsed.error.flatten() },
                { status: 400 }
            )
        }

        await createFinancialMovement(parsed.data)

        return NextResponse.json({ ok: true })
    } catch (error) {
        console.error('[FINANCIAL_MOVEMENTS_POST]', error)
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        )
    }
}
