/**
 * Custom React Hook with auto-refresh and completion detection.
 */

"use client";

import { useEffect, useState, useRef } from "react";
import { getTodayAppointments } from "@/services/appointments.service";
import type { AppointmentRow } from "@/types/appointmentRow ";

export const useTodayAppointments = () => {
    const [appointments, setAppointments] = useState<AppointmentRow[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    // Track previous state to detect transitions
    const previousRef = useRef<AppointmentRow[]>([]);

    const [justCompleted, setJustCompleted] = useState<AppointmentRow | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const result = await getTodayAppointments();

            // Detect appointments that changed to "completed"
            result.forEach((appt) => {
                const old = previousRef.current.find((p) => p.id === appt.id);

                if (old && old.status !== "completed" && appt.status === "completed") {
                    setJustCompleted(appt); // Trigger the modal
                }
            });

            previousRef.current = result;
            setAppointments(result);
            setLoading(false);
        };

        fetchData();
        const interval = setInterval(fetchData, 15000); // Refresh every 15s
        return () => clearInterval(interval);
    }, []);

    return { appointments, loading, justCompleted, setJustCompleted };
};
