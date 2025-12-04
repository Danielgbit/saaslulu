"use client";

import { useEffect, useState } from "react";
import { getConfirmationResponses } from "@/services/appointments/appointments.service";

export const useConfirmationResponses = () => {
    const [messages, setMessages] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchMessages = async () => {
        try {
            setLoading(true);
            const data = await getConfirmationResponses();
            setMessages(data.messages || []);
        } catch (err: any) {
            setError(err.message || "Error inesperado");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    return {
        messages,
        loading,
        error,
        refetch: fetchMessages
    };
};
