"use client";

import { useChat } from "@/hooks/useChat";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, SendHorizonal } from "lucide-react";
import { useState } from "react";
import { TypingLoader } from "./loadings/TypingLoader";
import { Trash2 } from "lucide-react";


export default function ChatN8N() {
    const [open, setOpen] = useState(false);
    const { messages, loading, sendMessage, clearChat, messagesEndRef } = useChat();
    const [input, setInput] = useState("");



    return (
        <>
            {/* Floating button */}
            {!open && (
                <motion.button
                    onClick={() => setOpen(true)}
                    className="fixed bottom-6 right-6 bg-indigo-600 text-white p-4 rounded-full"
                >
                    <MessageCircle size={26} />
                </motion.button>
            )}

            <AnimatePresence>
                {open && (
                    <motion.div className="fixed bottom-0 right-0 w-[400px] h-[70%] bg-white dark:bg-gray-900 flex flex-col rounded-t-2xl shadow-xl">

                        {/* Header */}
                        <div className="p-4 border-b flex justify-between items-center">
                            <h2 className="text-lg font-semibold">Sofia IA</h2>

                            <button
                                onClick={clearChat}
                                className="flex items-center gap-1 text-sm text-gray-500 hover:text-red-600 transition font-medium"
                            >
                                <Trash2 size={16} />
                                Limpiar
                            </button>

                            <button onClick={() => setOpen(false)}>
                                <X size={20} />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 px-4 py-3 overflow-y-auto space-y-3">
                            {messages.map((msg, i) => (
                                <div
                                    key={i}
                                    className={`p-3 text-sm rounded-xl max-w-[80%] ${msg.sender === "user"
                                        ? "bg-indigo-600 text-white ml-auto"
                                        : "bg-gray-300 dark:bg-gray-700 text-white"
                                        }`}
                                >
                                    {msg.text}
                                </div>
                            ))}

                            {loading && <TypingLoader />}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="p-3 border-t">
                            <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 p-2 rounded-xl">
                                <input
                                    value={input}
                                    onChange={e => setInput(e.target.value)}
                                    onKeyDown={e => e.key === "Enter" && sendMessage(input)}
                                    className="flex-1 bg-transparent outline-none"
                                    placeholder="Escribe un mensaje..."
                                />
                                <button
                                    onClick={() => {
                                        sendMessage(input);
                                        setInput("");
                                    }}
                                >
                                    <SendHorizonal size={20} />
                                </button>
                            </div>
                        </div>

                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
