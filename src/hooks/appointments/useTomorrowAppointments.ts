import { useState } from "react";
import { getTomorrowAppointments } from "@/services/appointments/appointments.service";

export const useTomorrowAppointments = () => {
    const [appointments, setAppointments] = useState<any[]>([]);
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(false); // ← antes estaba en true
    const [error, setError] = useState<string | null>(null);

    const fetchAppointments = async () => {
        try {
            setLoading(true);
            const data = await getTomorrowAppointments();
            setAppointments(data.appointments || []);
            setCount(data.count || 0);
            setError(null);
        } catch (err: any) {
            setError(err.message || "Error fetching appointments");
        } finally {
            setLoading(false);
        }
    };

    return {
        appointments,
        count,
        loading,
        error,
        refetch: fetchAppointments,
    };
};
