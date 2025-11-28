"use client";

import { useState, useEffect } from "react";
import { supabaseClient } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export function useEmployeeSelector() {
    const router = useRouter();

    const [employees, setEmployees] = useState<any[]>([]);
    const [query, setQuery] = useState("");
    const [selected, setSelected] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);

    // Fetch employees
    useEffect(() => {
        const loadEmployees = async () => {
            const { data } = await supabaseClient.from("employees").select("*");
            setEmployees(data || []);
        };
        loadEmployees();
    }, []);

    const handleSave = async () => {
        if (!selected) return;

        setLoading(true);

        // Usuario actual
        const {
            data: { user },
        } = await supabaseClient.auth.getUser();

        if (!user) {
            setLoading(false);
            return;
        }

        // Actualizar employee
        await supabaseClient
            .from("employees")
            .update({ auth_user_id: user.id })
            .eq("id", selected);

        setLoading(false);
        router.push("/dashboard"); // <-- Redirige a donde quieras
    };

    // Filtrar por búsqueda
    const filtered = employees.filter((emp) =>
        emp.full_name.toLowerCase().includes(query.toLowerCase())
    );

    return {
        employees: filtered,
        query,
        setQuery,
        selected,
        setSelected,
        loading,
        handleSave,
    };
}
