import { FinancialMovement } from '@/types/financial'

interface Props {
    movement: FinancialMovement
}

/**
 * Componente para mostrar una fila individual de movimiento financiero.
 */
export function FinancialMovementItem({ movement }: Props) {
    const isIncome = movement.type === 'income'

    return (
        <div className="flex justify-between items-center p-3 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
            <div>
                <p className="font-medium text-zinc-900 dark:text-zinc-100">
                    {movement.description || movement.category}
                </p>
                <p className="text-xs text-gray-500 dark:text-zinc-400">
                    {new Date(movement.occurred_at).toLocaleTimeString('es-CO', {
                        hour: '2-digit',
                        minute: '2-digit'
                    })} · {movement.payment_method ?? '—'}
                </p>
            </div>

            <p
                className={`font-bold ${isIncome ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                    }`}
            >
                {isIncome ? '+' : '-'}$
                {movement.amount.toLocaleString('es-CO')}
            </p>
        </div>
    )
}
