"use client";

import { useState } from "react";
import { useTodayAppointments } from "@/hooks/appointments/useTodayAppointments";
import AppointmentCard from "@/components/appointments/AppointmentCard";
import ConfirmationModal from "@/components/appointments/ConfirmationModal";
import AddExtraServiceModal from "@/components/appointments/AddExtraServiceModal";
import { completeAppointmentWithServices } from "@/app/api/appointments";
import type { Appointment, Service } from "@/types/appointments";

export default function AppointmentsPage() {
    const { appointments, loading, error, justCompleted, setJustCompleted } = useTodayAppointments();

    const [selected, setSelected] = useState<Appointment | null>(null);
    const [selectedServices, setSelectedServices] = useState<Service[]>([]);
    const [extraOpen, setExtraOpen] = useState(false);
    const [saving, setSaving] = useState(false);

    const openFor = (appt: Appointment) => {
        setSelected(appt);
        setSelectedServices([...appt.services]);
    };

    const handleAddExtra = (extra: Service) => {
        setSelectedServices((prev) => [...prev, extra]);
    };

    const handleConfirm = async (servicesToConfirm: Service[]) => {
        if (!selected) return;
        setSaving(true);

        const payload = servicesToConfirm.map((s) => ({
            name: s.name,
            service_id: s.id.startsWith("extra-") ? null : s.id,
            price: s.price,
            duration_minutes: s.duration_minutes,
        }));

        const res = await completeAppointmentWithServices(
            selected.id,
            selected.employee_id ?? null,
            payload
        );

        setSaving(false);

        if (res.success) {
            setSelected(null);
            setSelectedServices([]);
        } else {
            console.error("No se pudo completar la cita", res.error);
        }
    };

    if (loading) return <div className="p-8"><p className="text-gray-500">Cargando...</p></div>;

    return (
        <div className="p-8 space-y-6">
            <h1 className="text-3xl font-bold">Citas de Hoy</h1>

            {appointments.length === 0 && <p className="text-gray-500">No hay citas hoy.</p>}

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {appointments.map((appt) => (
                    <AppointmentCard key={appt.id} appointment={appt} onClick={openFor} />
                ))}
            </div>

            {/* Modal de cita seleccionada */}
            <ConfirmationModal
                appointment={selected}
                onClose={() => setSelected(null)}
                onConfirm={() => handleConfirm(selectedServices)}
                onAddExtraService={() => setExtraOpen(true)}
            />

            {/* Modal de cita terminada automáticamente */}
            {justCompleted && (
                <ConfirmationModal
                    appointment={justCompleted}
                    onClose={() => setJustCompleted(null)}
                    onConfirm={() => {
                        handleConfirm(justCompleted.services);
                        setJustCompleted(null);
                    }}
                    onAddExtraService={() => setExtraOpen(true)}
                />
            )}

            {/* Modal de extra */}
            <AddExtraServiceModal
                isOpen={extraOpen}
                onClose={() => setExtraOpen(false)}
                onAdd={(extra) => {
                    handleAddExtra(extra);
                    setExtraOpen(false);
                }}
            />
        </div>
    );
}
