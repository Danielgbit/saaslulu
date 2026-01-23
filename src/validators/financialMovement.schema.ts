import { z } from 'zod'

export const financialMovementSchema = z.object({
    type: z.enum(['income', 'expense']),
    category: z.string().min(1),
    amount: z.number().positive(),
    description: z.string().optional(),
    payment_method: z.enum([
        'cash',
        'card',
        'transfer',
        'nequi',
        'daviplata'
    ]).optional(),
    occurred_at: z.string()
})
