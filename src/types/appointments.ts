export interface Appointment {
    id: string;
    service_id: string;
    appointment_date: string; // ISO string
    duration_minutes: number;
    user_id: string;
}