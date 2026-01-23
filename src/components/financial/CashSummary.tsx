import { FinancialMovement } from '@/types/financial'

interface Props {
    movements: FinancialMovement[]
}

/**
 * Componente que muestra el resumen financiero (Ingresos, Gastos, Balance).
 */
export function CashSummary({ movements }: Props) {
    const income = movements
        .filter(m => m.type === 'income')
        .reduce((acc, m) => acc + m.amount, 0)

    const expense = movements
        .filter(m => m.type === 'expense')
        .reduce((acc, m) => acc + m.amount, 0)

    const balance = income - expense

    return (
        <div className="grid grid-cols-3 gap-4">
            <div className="p-4 border rounded bg-white dark:bg-zinc-900 dark:border-zinc-800 shadow-sm">
                <p className="text-sm text-gray-500 dark:text-zinc-400">Ingresos</p>
                <p className="text-xl font-bold text-green-600 dark:text-green-400">
                    ${income.toLocaleString('es-CO')}
                </p>
            </div>

            <div className="p-4 border rounded bg-white dark:bg-zinc-900 dark:border-zinc-800 shadow-sm">
                <p className="text-sm text-gray-500 dark:text-zinc-400">Gastos</p>
                <p className="text-xl font-bold text-red-600 dark:text-red-400">
                    ${expense.toLocaleString('es-CO')}
                </p>
            </div>

            <div className="p-4 border rounded bg-white dark:bg-zinc-900 dark:border-zinc-800 shadow-sm">
                <p className="text-sm text-gray-500 dark:text-zinc-400">Balance</p>
                <p className={`text-xl font-bold ${balance >= 0 ? 'text-zinc-900 dark:text-white' : 'text-red-600'}`}>
                    ${balance.toLocaleString('es-CO')}
                </p>
            </div>
        </div>
    )
}
