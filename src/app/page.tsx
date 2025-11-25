"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-white to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-lg p-8 bg-white/70 dark:bg-gray-800/60 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 dark:border-gray-700/30"
      >
        {/* Logo / Nombre */}
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight"
        >
          Bienvenida a <span className="text-pink-600 dark:text-pink-400">Lulú</span>
        </motion.h1>

        {/* Subtítulo */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-4 text-gray-600 dark:text-gray-300 text-lg"
        >
          Tu espacio de belleza y cuidado personal 🌸
          Inicia sesión para continuar.
        </motion.p>

        {/* Botones */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 flex flex-col gap-4"
        >
          <Link href="/login">
            <button className="w-full cursor-pointer py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-semibold shadow-lg transition">
              Iniciar sesión
            </button>
          </Link>

          <Link href="/register">
            <button className="w-full cursor-pointer py-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 text-lg font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition shadow">
              Registrarme
            </button>
          </Link>
        </motion.div>
      </motion.div>
    </main>
  );
}
