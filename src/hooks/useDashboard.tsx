"use client";

import { useEffect, useState } from "react";
import { supabaseClient } from "@/lib/supabaseClient";
import {
    getEmployeeAppointments,
    getEmployeeByUserId,
} from "@/services/dashboardService";

export function useDashboard() {
    const [loading, setLoading] = useState(true);
    const [employee, setEmployee] = useState(null);
    const [appointments, setAppointments] = useState<any[]>([]);

    useEffect(() => {
        loadData();
    }, []);

    async function loadData() {
        setLoading(true);

        const {
            data: { user },
        } = await supabaseClient.auth.getUser();

        if (!user) return;

        const emp = await getEmployeeByUserId(user.id);
        setEmployee(emp);

        const appts = await getEmployeeAppointments(emp.id);
        setAppointments(appts);

        setLoading(false);
    }

    const totalIncome = appointments.reduce(
        (sum, appt) => sum + Number(appt.services?.price || 0),
        0
    );

    return { loading, employee, appointments, totalIncome };
}
