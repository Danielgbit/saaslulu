export interface Service {
    id: string;                 // uuid
    name: string;               // character varying NOT NULL
    price: number;              // numeric NOT NULL
    duration_minutes: number;   // integer NOT NULL
    description?: string | null; // text
    created_at: string;         // timestamp without time zone
}
