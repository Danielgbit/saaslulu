import type { Service, CompletedService } from "./services";

export interface Appointment {
    id: string;
    client_name: string | null;
    client_phone: string;
    status: "scheduled" | "confirmed" | "in-progress" | "completed";
    start_at: string;
    end_at: string;
    service_id: string | null;
    employee_id: string | null;

    // Servicios base (catálogo)
    services: Service[];

    // Servicios completados (histórico)
    services_completed: CompletedService[];
}
