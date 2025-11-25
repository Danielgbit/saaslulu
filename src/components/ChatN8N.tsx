"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";

/**
 * @component ChatN8N
 * @description Floating chat widget that communicates with the internal Next.js API,
 * then receives asynchronous replies from n8n via a polling listener (GET /api/reply).
 */
export default function ChatN8N() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState<{ sender: "user" | "bot"; text: string }[]>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    /**
     * @function sendMessage
     * @description Sends the user's message to the Next.js API, which relays it to n8n.
     */
    async function sendMessage() {
        if (!input.trim()) return;

        // Add user message to chat UI
        setMessages(prev => [...prev, { sender: "user", text: input }]);

        const userMessage = input;
        setInput("");
        setLoading(true);

        try {
            const res = await fetch("/api/send", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: userMessage,
                }),
            });

            const data = await res.json();

            // Add immediate bot response (if API returns any)
            if (data.reply) {
                setMessages(prev => [...prev, { sender: "bot", text: data.reply }]);
            }
        } catch (error) {
            setMessages(prev => [
                ...prev,
                { sender: "bot", text: "Error: Unable to connect to AI server." },
            ]);
        }

        setLoading(false);
    }

    /**
     * @effect Polling listener for incoming replies from n8n.
     * Fetches GET /api/reply every 1 second.
     * Adds new bot messages only when they are not already present in UI.
     */
    useEffect(() => {
        const interval = setInterval(async () => {
            try {
                const res = await fetch("/api/reply");
                if (!res.ok) return;

                const data = await res.json();

                // Ignore empty or undefined replies
                if (!data.reply) return;

                // Prevent duplicate messages
                setMessages(prev => {
                    const exists = prev.some(
                        msg => msg.text === data.reply && msg.sender === "bot"
                    );
                    if (exists) return prev;

                    return [...prev, { sender: "bot", text: data.reply }];
                });
            } catch (_) {
                // silent fail – prevents UI noise
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);

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

                        {/* Messages */}
                        <div className="flex-1 p-4 overflow-y-auto space-y-3">
                            {messages.map((msg, i) => (
                                <div
                                    key={i}
                                    className={`p-3 rounded-xl max-w-[80%] ${msg.sender === "user"
                                        ? "bg-indigo-600 text-white self-end ml-auto"
                                        : "bg-gray-200 dark:bg-gray-700 dark:text-white"
                                        }`}
                                >
                                    {msg.text}
                                </div>
                            ))}

                            {loading && (
                                <div className="text-sm text-gray-500">Escribiendo...</div>
                            )}
                        </div>

                        {/* Input Box */}
                        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                            <div className="flex gap-2">
                                <input
                                    value={input}
                                    onChange={e => setInput(e.target.value)}
                                    onKeyDown={e => e.key === "Enter" && sendMessage()}
                                    className="flex-1 p-3 rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-white outline-none"
                                    placeholder="Escribe un mensaje..."
                                />
                                <button
                                    onClick={sendMessage}
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 rounded-lg"
                                >
                                    Enviar
                                </button>
                            </div>
                        </div>
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
