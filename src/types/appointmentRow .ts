export interface AppointmentRow {
    id: string;
    client_name: string | null;
    client_phone: string;
    status: "scheduled" | "confirmed" | "in-progress" | "completed";
    appointment_date: string;
    start_time: string;
    end_time: string;
    services: {
        name: string;
        duration_minutes: number;
    }[];
}