// useEmployeeCompletedServices.ts
// Fetches all completed services for a given employee

import { useEffect, useState } from "react";
import { supabaseClient } from "@/lib/supabaseClient";

export function useEmployeeCompletedServices(employeeId?: string) {
    const [services, setServices] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // Fetch completed services from Supabase
    const fetchServices = async () => {
        setLoading(true);

        let query = supabaseClient
            .from("services_completed")
            .select("*")
            .order("completed_at", { ascending: false });

        // Filter by employee if provided
        if (employeeId) {
            query = query.eq("employee_id", employeeId);
        }

        const { data, error } = await query;

        if (!error) {
            setServices(data || []);
        }

        setLoading(false);
    };

    // Automatically fetch services when employeeId changes
    useEffect(() => {
        fetchServices();
    }, [employeeId]);

    return {
        services,
        loading,
        refetch: fetchServices,
    };
}
