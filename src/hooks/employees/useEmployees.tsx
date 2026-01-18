import { useEffect, useState } from "react"

export function useEmployees() {
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/employees")
      .then((res) => res.json())
      .then(setEmployees)
      .finally(() => setLoading(false))
  }, [])

  return { employees, loading }
}
