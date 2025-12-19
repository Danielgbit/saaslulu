"use client";

import { useEffect, useRef, useState } from "react";
import { getTodayAppointments } from "@/services/appointments/appointments.service";
import type { Appointment } from "@/types/appointments/appointments";

/**
 * Hook to fetch today's appointments and expose a refetch function.
 * - Keeps a "previous" ref to detect transitions to completed.
 * - Exposes refetch so parent components can refresh on-demand.
 */
export const useTodayAppointments = () => {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Keep previous snapshot to detect status transitions
    const previous = useRef<Appointment[]>([]);
    const [justCompleted, setJustCompleted] = useState<Appointment | null>(null);

    // ---------------------------------------------------
    // Fetch function (exposed as refetch)
    // ---------------------------------------------------
    const fetchAppointments = async () => {
        try {
            setLoading(true);

            const result = await getTodayAppointments();

            // Detect transition to "completed" using the correct property names
            result.forEach((appt) => {
                const old = previous.current.find((p) => p.id === appt.id);

                // NOTE: use the property name that exists on your Appointment type:
                // "services_completed"
                if (old && old.status !== "completed" && appt.status === "completed") {
                    // Use only services_completed to build the justCompleted payload
                    setJustCompleted({
                        ...appt,
                        // Map services_completed -> services (normalized shape)
                        services: (appt.services_completed ?? []).map((s) => ({
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
            setError(null);
        } catch (err: any) {
            setError(err?.message ?? "Error al obtener citas");
        } finally {
            setLoading(false);
        }
    };

    // ---------------------------------------------------
    // Initial load + polling
    // ---------------------------------------------------
    useEffect(() => {
        let mounted = true;

        const load = async () => {
            if (!mounted) return;
            await fetchAppointments();
        };

        load();
        const interval = setInterval(fetchAppointments, 15000);

        return () => {
            mounted = false;
            clearInterval(interval);
        };
    }, []);

    // ---------------------------------------------------
    // Expose state + refetch
    // ---------------------------------------------------
    return {
        appointments,
        loading,
        error,
        justCompleted,
        setJustCompleted,

        // Expose refetch so parent components can trigger an immediate reload
        refetch: fetchAppointments
    };
};
