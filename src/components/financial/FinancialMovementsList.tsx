import { FinancialMovement } from '@/types/financial'
import { FinancialMovementItem } from './FinancialMovementItem'

interface Props {
    movements: FinancialMovement[]
}

/**
 * Componente que muestra el listado de movimientos financieros.
 * Utiliza FinancialMovementItem para renderizar cada fila.
 */
export function FinancialMovementsList({ movements }: Props) {
    if (movements.length === 0) {
        return (
            <div className="p-4 text-center border rounded border-dashed border-zinc-300 dark:border-zinc-700">
                <p className="text-zinc-500">No hay movimientos hoy</p>
            </div>
        )
    }

    return (
        <div className="border rounded divide-y bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 divide-zinc-200 dark:divide-zinc-800 shadow-sm">
            {movements.map(movement => (
                <FinancialMovementItem
                    key={movement.id}
                    movement={movement}
                />
            ))}
        </div>
    )
}
