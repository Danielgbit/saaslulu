export interface EmployeeWithAppointments {
    employee_id: string;
    full_name: string;
    appointments: {
        start_at: string;
        end_at: string;
        status?: string;
    }[];
}