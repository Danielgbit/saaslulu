'use client'

import { useEffect, useState } from 'react'
import { FinancialMovement } from '@/types/financial'

/**
 * Hook para gestionar los movimientos financieros de una fecha específica.
 * @param date Fecha en formato YYYY-MM-DD
 */
export function useFinancialMovements(date: string) {
    const [data, setData] = useState<FinancialMovement[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!date) return

        async function load() {
            try {
                setLoading(true)
                setError(null)
                const res = await fetch(
                    `/api/financial-movements?date=${date}`
                )

                if (!res.ok) throw new Error('Failed to fetch movements')

                const json = await res.json()
                setData(json)
            } catch (err: any) {
                setError(err.message || 'An unknown error occurred')
            } finally {
                setLoading(false)
            }
        }

        load()
    }, [date])

    return {
        movements: data,
        loading,
        error
    }
}
