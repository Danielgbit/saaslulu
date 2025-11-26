/**
 * Hook: useEmployees
 * ---------------------------------------
 * Fetches all employees so the admin can
 * select whose earnings to view.
 */

import { useEffect, useState } from "react";
import { supabaseClient } from "@/lib/supabaseClient";

export function useEmployees() {
    const [employees, setEmployees] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const loadEmployees = async () => {
        setLoading(true);

        const { data, error } = await supabaseClient
            .from("employees")
            .select("*")
            .order("full_name", { ascending: true });

        if (!error) setEmployees(data || []);

        setLoading(false);
    };

    useEffect(() => {
        loadEmployees();
    }, []);

    return { employees, loading };
}
