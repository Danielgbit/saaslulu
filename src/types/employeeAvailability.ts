export type EmployeeAvailability = {
    employee_id: string;
    full_name: string;
    status: "available" | "busy" | "off";
    busy_until: string | null;
    available_until: string | null;
    gaps: { start: string; end: string }[];
};