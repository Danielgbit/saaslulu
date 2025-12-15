// src/services/employees/availability.service.ts

import { EmployeeAvailability } from "@/types/employeeAvailability";
import { EmployeeWithAppointments } from "@/types/employeeWithAppointments";
import { DateTime } from "luxon";

export function calculateAvailability(
    employee: EmployeeWithAppointments,
    businessHours: { open_time: string | null; close_time: string | null },
    now: DateTime
): EmployeeAvailability {
    // 🚫 Spa cerrado (día sin horario)
    if (!businessHours.open_time || !businessHours.close_time) {
        return {
            employee_id: employee.employee_id,
            full_name: employee.full_name,
            status: "off",
            busy_until: null,
            available_until: null,
            gaps: []
        };
    }

    const open = DateTime.fromISO(
        `${now.toISODate()}T${businessHours.open_time}`,
        { zone: now.zone }
    );

    const close = DateTime.fromISO(
        `${now.toISODate()}T${businessHours.close_time}`,
        { zone: now.zone }
    );


    // ⛔ Fuera del horario del spa
    if (now < open || now >= close) {
        return {
            employee_id: employee.employee_id,
            full_name: employee.full_name,
            status: "off",
            busy_until: null,
            available_until: null,
            gaps: []
        };
    }

    // 🧹 Normalizar citas válidas
    const appointments = employee.appointments
        .filter(a => a.status !== "cancelled")
        .map(a => ({
            start: DateTime.fromISO(a.start_at, { zone: now.zone }),
            end: DateTime.fromISO(a.end_at, { zone: now.zone })
        }))
        .sort((a, b) => a.start.toMillis() - b.start.toMillis());

    // 🔴 ¿Está ocupado ahora?
    const current = appointments.find(
        a => now >= a.start && now < a.end
    );

    // 🟢 Calcular huecos reales
    const gaps: { start: string; end: string }[] = [];
    let cursor = open;

    for (const a of appointments) {
        if (cursor < a.start) {
            gaps.push({
                start: cursor.toISO()!,
                end: a.start.toISO()!
            });
        }
        cursor = DateTime.max(cursor, a.end);
    }

    if (cursor < close) {
        gaps.push({
            start: cursor.toISO()!,
            end: close.toISO()!
        });
    }

    return {
        employee_id: employee.employee_id,
        full_name: employee.full_name,
        status: current ? "busy" : "available",
        busy_until: current ? current.end.toISO() : null,
        available_until: current
            ? null
            : appointments.find(a => a.start > now)?.start.toISO() ??
            close.toISO(),
        gaps
    };
}
