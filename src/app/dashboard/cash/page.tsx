'use client'

import { useFinancialMovements } from '@/hooks/useFinancialMovements'
import { CashSummary } from '@/components/financial/CashSummary'
import { FinancialMovementsList } from '@/components/financial/FinancialMovementsList'

/**
 * Obtiene la fecha actual en formato YYYY-MM-DD local.
 */
function getToday() {
    return new Date().toISOString().split('T')[0]
}

/**
 * Página principal de la sección de Caja.
 * Muestra el resumen del día y el listado de movimientos.
 */
export default function CashPage() {
    const today = getToday()
    const { movements, loading, error } = useFinancialMovements(today)

    if (loading) return (
        <div className="flex items-center justify-center p-8">
            <p className="text-gray-500 animate-pulse">Cargando caja...</p>
        </div>
    )

    if (error) return (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            <p>Error al cargar la caja: {error}</p>
        </div>
    )

    return (
        <section className="space-y-6 p-4 sm:p-6 lg:p-8">
            <header className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Caja del día</h1>
                <span className="text-sm font-medium text-gray-500">{today}</span>
            </header>

            <div className="grid gap-6">
                <CashSummary movements={movements} />
                <FinancialMovementsList movements={movements} />
            </div>
        </section>
    )
}
