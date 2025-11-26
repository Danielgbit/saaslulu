"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-white to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">

      {/* Main wrapper with two columns */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden"
      >

        {/* Left content section */}
        <div className="p-10 flex flex-col justify-center">
          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight text-center md:text-left"
          >
            Bienvenida a <span className="text-pink-600">Lulú</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-4 text-gray-600 dark:text-gray-300 text-lg text-center md:text-left"
          >
            Tu espacio de belleza y cuidado personal 🌸
            Inicia sesión para continuar.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-8 flex flex-col gap-4"
          >
            <Link href="/login">
              <button className="w-full cursor-pointer py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-semibold shadow-md transition">
                Iniciar sesión
              </button>
            </Link>

            <Link href="/register">
              <button className="w-full cursor-pointer py-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 text-lg font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition shadow">
                Registrarme
              </button>
            </Link>
          </motion.div>
        </div>

        {/* Right image section */}
        <div className="relative bg-gradient-to-br from-indigo-100 to-blue-200 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center p-6">
          <Image
            src="https://images.pexels.com/photos/3993145/pexels-photo-3993145.jpeg"
            alt="Beauty Image"
            width={600}
            height={600}
            className="rounded-2xl shadow-xl object-cover"
          />
        </div>

      </motion.div>
    </main>
  );
}
