/**
 * Dashboard service — fetch completed services for employee
 */

import { supabaseClient } from "@/lib/supabase-client";

export async function getEmployeeCompletedServices(employeeId: string) {
    const { data, error } = await supabaseClient
        .from("services_completed")
        .select("*")
        .eq("employee_id", employeeId)
        .order("completed_at", { ascending: false });

    if (error) throw new Error(error.message);
    return data || [];
}
