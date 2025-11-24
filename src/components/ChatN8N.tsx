"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";

export default function ChatN8N() {
    const [open, setOpen] = useState(false);

    return (
        <>
            {/* Floating Button */}
            <button
                onClick={() => setOpen(true)}
                className="fixed bottom-6 right-6 z-50 bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-full shadow-xl transition"
            >
                <MessageCircle size={28} />
            </button>

            {/* Sliding Panel */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", stiffness: 260, damping: 25 }}
                        className="fixed top-0 right-0 w-[400px] max-w-[90%] h-full bg-white dark:bg-gray-900 shadow-2xl z-50 flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                            <h2 className="text-lg font-semibold">Asistente Lulu AI</h2>
                            <button
                                onClick={() => setOpen(false)}
                                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Chat iframe */}
                        <iframe
                            src="https://centrodeesteticalulu.site/workflow/IwpG472VDMhiJWRe"
                            className="w-full h-full border-none"
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Backdrop */}
            {open && (
                <div
                    onClick={() => setOpen(false)}
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
                />
            )}
        </>
    );
}
