/**
 * Custom React Hook: Fetch and manage today's appointments.
 */

"use client";

import { useEffect, useState } from "react";
import { getTodayAppointments } from "@/services/appointments.service";
import type { AppointmentRow } from "@/types/appointmentRow ";

export const useTodayAppointments = () => {
    const [appointments, setAppointments] = useState<AppointmentRow[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const result = await getTodayAppointments();
            setAppointments(result);
            setLoading(false);
        };

        fetchData();
    }, []);

    return { appointments, loading };
};
