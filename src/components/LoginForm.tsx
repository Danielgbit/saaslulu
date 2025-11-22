"use client";

import { useLogin } from "@/hooks/useLogin";
import { motion } from "framer-motion";

export function LoginForm() {
    const { email, setEmail, password, setPassword, loading, message, handleLogin } =
        useLogin();

    return (
        <motion.form
            onSubmit={handleLogin}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-sm flex flex-col gap-4 bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-xl"
        >
            <h2 className="text-2xl font-semibold text-center mb-2">Iniciar Sesión</h2>
            <p className="text-gray-500 text-center text-sm mb-4">
                Accede con tus credenciales
            </p>

            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Correo"
                className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña"
                className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <button
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition disabled:opacity-50"
            >
                {loading ? "Ingresando..." : "Entrar"}
            </button>

            {message && (
                <p className="text-center mt-3 text-red-500 dark:text-red-400">{message}</p>
            )}
        </motion.form>
    );
}
