"use client";

import { useState, useEffect, useRef } from "react";
import {
    sendMessageService,
    fetchReplyService,
} from "@/services/chat.service";

export function useChat() {
    const [messages, setMessages] = useState<
        { sender: "user" | "bot"; text: string }[]
    >([]);
    const [loading, setLoading] = useState(false);

    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    // Scroll automático
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, loading]);

    // ---------------------------
    // 🔵 Enviar mensaje del usuario
    // ---------------------------
    async function sendMessage(text: string) {
        if (!text.trim()) return;

        // Añadir mensaje del usuario al chat
        setMessages(prev => [...prev, { sender: "user", text }]);

        // Activar loader
        setLoading(true);

        // Mandar mensaje a tu backend
        await sendMessageService(text);
    }

    // --------------------------------------
    // 🔄 Polling para respuesta de n8n
    // --------------------------------------
    useEffect(() => {
        const interval = setInterval(async () => {
            const data = await fetchReplyService();

            // Si NO hay respuesta → seguimos esperando
            if (!data.reply) return;

            // Agregar el mensaje solo si no existe
            setMessages(prev => {
                const alreadyExists = prev.some(
                    m => m.text === data.reply && m.sender === "bot"
                );
                if (alreadyExists) return prev;

                return [...prev, { sender: "bot", text: data.reply }];
            });

            // 👇 APAGAR loading aquí (este era el problema)
            setLoading(false);

            // 👇 Borrar respuesta del backend
            await fetch("/api/reply", { method: "DELETE" });

        }, 700);

        return () => clearInterval(interval);
    }, []);

    // ---------------------------
    // 🧹 Limpiar conversación
    // ---------------------------
    async function clearChat() {
        setMessages([]);
        setLoading(false);

        await fetch("/api/reply", { method: "DELETE" });
    }

    return {
        messages,
        loading,
        messagesEndRef,
        sendMessage,
        clearChat
    };
}
