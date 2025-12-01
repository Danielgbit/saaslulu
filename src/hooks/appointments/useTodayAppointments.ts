"use client";

import { useEffect, useRef, useState } from "react";
import { getTodayAppointments } from "@/services/appointments/appointments.service";
import type { Appointment } from "@/types/appointments";

export const useTodayAppointments = () => {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const previous = useRef<Appointment[]>([]);
    const [justCompleted, setJustCompleted] = useState<Appointment | null>(null);

    useEffect(() => {
        let mounted = true;

        const fetchData = async () => {
            const result = await getTodayAppointments();
            if (!mounted) return;

            // Detect completed transition
            result.forEach((appt) => {
                const old = previous.current.find((p) => p.id === appt.id);

                if (old && old.status !== "completed" && appt.status === "completed") {
                    // Usar solo completed_services
                    setJustCompleted({
                        ...appt,
                        services: appt.completed_services.map((s) => ({
                            id: s.id,
                            name: s.service_name,
                            price: s.service_price,
                            duration_minutes: s.duration_minutes,
                            created_at: s.completed_at,
                            description: null
                        }))
                    });
                }
            });

            previous.current = result;
            setAppointments(result);
            setLoading(false);
        };

        fetchData();
        const interval = setInterval(fetchData, 15000);
        return () => {
            mounted = false;
            clearInterval(interval);
        };
    }, []);

    return { appointments, loading, error, justCompleted, setJustCompleted };
};
