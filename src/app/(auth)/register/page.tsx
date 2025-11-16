'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage('')

    if (!email || !password || !confirmPassword) {
      setMessage('Por favor completa todos los campos')
      return
    }

    if (password !== confirmPassword) {
      setMessage('Las contraseñas no coinciden')
      return
    }

    setLoading(true)

    const { error } = await supabase.auth.signUp({ email, password })

    if (error) {
      setMessage(error.message)
      setLoading(false)
      return
    }

    setMessage('Verifica tu correo electrónico para continuar')
    setLoading(false)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50 dark:bg-gray-900">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Crear cuenta</h1>
      <form
        onSubmit={handleRegister}
        className="w-full max-w-sm flex flex-col gap-4 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
      >
        <input
          className="border p-2 rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />

        <input
          className="border p-2 rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />

        <input
          className="border p-2 rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="password"
          placeholder="Confirmar contraseña"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition disabled:opacity-60"
        >
          {loading ? 'Creando cuenta...' : 'Registrarse'}
        </button>
      </form>
      {message && (
        <p className="mt-4 text-center text-red-500 dark:text-red-400">{message}</p>
      )}
    </div>
  )
}



