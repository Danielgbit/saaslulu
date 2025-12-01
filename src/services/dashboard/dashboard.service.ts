import { supabaseClient } from "@/lib/supabaseClient";

export async function getEmployeeByUserId(userId: string) {
    const { data } = await supabaseClient
        .from("employees")
        .select("*")
        .eq("auth_user_id", userId)
        .single();

    return data;
}

export async function getEmployeeAppointments(employeeId: string) {
    const { data } = await supabaseClient
        .from("appointments")
        .select("*, services(name, price)")
        .eq("employee_id", employeeId)
        .order("appointment_date", { ascending: false });

    return data || [];
}
