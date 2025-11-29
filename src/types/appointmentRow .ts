/**
 * Represents a single appointment with its related service information.
 */
export interface AppointmentRow {
    /** Unique ID of the appointment */
    id: string;

    /** Client's name (nullable) */
    client_name: string | null;

    /** Client's phone number */
    client_phone: string;

    /** Current status of the appointment */
    status: "scheduled" | "confirmed" | "in-progress" | "completed";

    /** Appointment start timestamp (UTC) */
    start_at: string;

    /** Appointment end timestamp (UTC) */
    end_at: string;

    /** Related service data (1:1 relation), may be null if missing */
    services: {
        name: string;
        duration_minutes: number;
    } | [];
}
