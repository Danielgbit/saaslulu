'use client'


import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'


export default function LoginPage() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')


    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setMessage('')


        const { error } = await supabase.auth.signInWithPassword({ email, password })


        if (error) {
            setMessage('Credenciales incorrectas')
            setLoading(false)
            return
        }


        router.push('/dashboard')
    }


    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <h1 className="text-3xl font-bold mb-6">Iniciar sesión</h1>


            <form onSubmit={handleLogin} className="w-full max-w-sm flex flex-col gap-4">
                <input
                    className="border p-2 rounded"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />


                <input
                    className="border p-2 rounded"
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />


                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                >
                    {loading ? 'Ingresando...' : 'Entrar'}
                </button>
            </form>


            {message && <p className="mt-4 text-center text-red-500">{message}</p>}
        </div>
    )
}