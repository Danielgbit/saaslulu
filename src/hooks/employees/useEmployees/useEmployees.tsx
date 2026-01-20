"use client"

import { useEffect, useState } from "react"
import type { Employee } from "./useEmplyees.types"

export function useEmployees() {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadEmployees() {
      try {
        const res = await fetch("/api/employees")

        if (!res.ok) {
          throw new Error("Error al obtener empleados")
        }

        const data: Employee[] = await res.json()
        setEmployees(data)
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Error desconocido"
        )
      } finally {
        setLoading(false)
      }
    }

    loadEmployees()
  }, [])

  return {
    employees,
    loading,
    error,
  }
}
