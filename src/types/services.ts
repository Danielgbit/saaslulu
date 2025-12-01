export interface Service {
    id: string;
    name: string;
    price: number;
    duration_minutes: number;
    description: string | null;
    created_at: string;
}

export interface CompletedService {
    id: string;
    service_name: string;
    service_price: number;
    duration_minutes: number;
    completed_at: string;
    notes: string | null;
}
