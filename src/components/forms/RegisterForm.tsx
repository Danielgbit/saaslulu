"use client";

import { motion } from "framer-motion";
import { Mail, Lock, ShieldCheck } from "lucide-react";
import { useRegister } from "@/hooks/auth/useRegister";

export function RegisterForm() {
    const {
        email,
        setEmail,
        password,
        setPassword,
        confirmPassword,
        setConfirmPassword,
        message,
        loading,
        handleRegister,
    } = useRegister();

    return (
        <motion.form
            onSubmit={handleRegister}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="
                w-full max-w-md
                bg-violet-500 dark:bg-gray-900/40
                backdrop-blur-xl shadow-xl
                border border-gray-200 dark:border-gray-700
                rounded-2xl p-8 flex flex-col gap-6
            "
        >
            {/* Título */}
            <div className="text-center mb-2">
                <p className="text-violet-100 dark:text-gray-400 text-sm">
                    Ingresa tus datos para continuar
                </p>
            </div>

            {/* Campo email */}
            <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Correo electrónico
                </label>
                <div
                    className="
                    relative flex items-center
                    bg-gray-100 dark:bg-gray-800
                    border border-gray-300 dark:border-gray-700
                    rounded-xl px-3
                    focus-within:ring-2 focus-within:ring-blue-500
                "
                >
                    <Mail className="w-5 h-5 text-violet-400" />
                    <input
                        className="
                        w-full bg-transparent p-3 text-gray-900 dark:text-white
                        focus:outline-none
                    "
                        type="email"
                        placeholder="ejemplo@correo.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
            </div>

            {/* Campo contraseña */}
            <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Contraseña
                </label>
                <div
                    className="
                    relative flex items-center
                    bg-gray-100 dark:bg-gray-800
                    border border-gray-300 dark:border-gray-700
                    rounded-xl px-3
                    focus-within:ring-2 focus-within:ring-blue-500
                "
                >
                    <Lock className="w-5 h-5 text-gray-400" />
                    <input
                        className="w-full bg-transparent p-3 text-gray-900 dark:text-white focus:outline-none"
                        type="password"
                        placeholder="•••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
            </div>

            {/* Campo repetir contraseña */}
            <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Confirmar contraseña
                </label>
                <div
                    className="
                    relative flex items-center
                    bg-gray-100 dark:bg-gray-800
                    border border-gray-300 dark:border-gray-700
                    rounded-xl px-3
                    focus-within:ring-2 focus-within:ring-blue-500
                "
                >
                    <ShieldCheck className="w-5 h-5 text-gray-400" />
                    <input
                        className="w-full bg-transparent p-3 text-gray-900 dark:text-white focus:outline-none"
                        type="password"
                        placeholder="•••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
            </div>

            {/* Botón */}
            <motion.button
                type="submit"
                disabled={loading}
                whileTap={{ scale: 0.97 }}
                className="
                bg-blue-600 hover:bg-blue-700
                disabled:opacity-50
                text-white font-medium
                rounded-xl p-3 mt-2
                shadow-lg shadow-blue-600/20
                transition
                cursor-pointer
            "
            >
                {loading ? "Creando cuenta..." : "Registrarse"}
            </motion.button>

            {/* Mensaje */}
            {message && (
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-2 text-center text-red-500 dark:text-red-400"
                >
                    {message}
                </motion.p>
            )}
        </motion.form>
    );
}
