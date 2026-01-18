// src/hooks/useAvailability.ts

import { useEffect, useState, useCallback } from "react";
import { supabaseClient } from "@/lib/supabase-client";
import { EmployeeAvailability } from "@/types/employeeAvailability";

export function useAvailability() {
    const [availability, setAvailability] = useState<EmployeeAvailability[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // 🔄 Fetch centralizado
    const fetchAvailability = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const res = await fetch("/api/employees/availability", {
                cache: "no-store"
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err?.error || "Error fetching availability");
            }

            const data: EmployeeAvailability[] = await res.json();
            setAvailability(data);
        } catch (err) {
            console.error("Availability error:", err);
            setError(
                err instanceof Error ? err.message : "Unknown error"
            );
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchAvailability();

        // 🔔 Realtime updates
        const channel = supabaseClient
            .channel("availability-realtime")
            .on(
                "postgres_changes",
                { event: "*", schema: "public", table: "appointments" },
                () => fetchAvailability()
            )
            .on(
                "postgres_changes",
                { event: "*", schema: "public", table: "business_hours" },
                () => fetchAvailability()
            )
            .subscribe();

        // ⏱️ Polling de respaldo (1 min)
        const interval = setInterval(fetchAvailability, 60_000);

        return () => {
            supabaseClient.removeChannel(channel);
            clearInterval(interval);
        };
    }, [fetchAvailability]);

    return {
        availability,
        loading,
        error,
        refresh: fetchAvailability
    };
}
