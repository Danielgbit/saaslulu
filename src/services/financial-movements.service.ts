import { supabaseAdmin } from '@/lib/supabaseAdmin'
import { FinancialMovement } from '@/types/financial'

/**
 * Obtiene los movimientos financieros para una fecha específica.
 * @param date Fecha en formato YYYY-MM-DD
 */
export async function getFinancialMovementsByDate(
    date: string
): Promise<FinancialMovement[]> {
    const start = `${date}T00:00:00`
    const end = `${date}T23:59:59`

    const { data, error } = await supabaseAdmin
        .from('financial_movements')
        .select('*')
        .gte('occurred_at', start)
        .lte('occurred_at', end)
        .order('occurred_at', { ascending: true })

    if (error) throw error

    return data as FinancialMovement[]
}

/**
 * Crea un nuevo movimiento financiero.
 * @param movement Datos del movimiento (sin id ni created_at)
 */
export async function createFinancialMovement(
    movement: Omit<FinancialMovement, 'id' | 'created_at'>
) {
    const { error } = await supabaseAdmin
        .from('financial_movements')
        .insert(movement)

    if (error) throw error
}
