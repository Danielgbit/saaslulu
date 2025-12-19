import { AppointmentConfirmationDTO } from "@/types/appointments/appointment-confirmation.dto";
import { useCallback, useState } from "react";

type TomorrowAppointmentsResponse = {
    appointments: AppointmentConfirmationDTO[];
    count: number;
};

export function useTomorrowAppointments() {
    const [appointments, setAppointments] = useState<AppointmentConfirmationDTO[]>([]);
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchTomorrowAppointments = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const res = await fetch("/api/appointments/tomorrow");

            console.log(res);


            if (!res.ok) {
                const body = await res.json();
                throw new Error(body?.error || "Error fetching appointments");
            }

            const data: TomorrowAppointmentsResponse = await res.json();

            setAppointments(data.appointments);
            setCount(data.count);
        } catch (err: any) {
            setError(err.message || "Unexpected error");
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        appointments,
        count,
        loading,
        error,
        refetch: fetchTomorrowAppointments,
    };
}
