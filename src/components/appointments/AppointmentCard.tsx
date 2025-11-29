// File: components/AppointmentCard.tsx
// Description: Reusable appointment card component.
// All comments are written in English.


import StatusBadge from "@/components/ui/StatusBadge";
import { AppointmentRow } from "@/types/appointmentRow ";


/**
* AppointmentCard Component
* Renders a single appointment card including client information,
* appointment time range, and status badge.
*/

export default function AppointmentCard({ appt }: { appt: AppointmentRow }) {
    // Convert timestamps into Date objects
    const start = new Date(appt.start_at);
    const end = new Date(appt.end_at);


    return (
        <div className="bg-violet-200 rounded-xl shadow-md p-5 hover:shadow-lg transition-shadow border border-gray-100">
            {/* Time range and status badge */}
            <div className="flex items-start justify-between mb-3">
                <p className="font-semibold text-black text-lg">
                    {start.toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit" })}
                    {" — "}
                    {end.toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit" })}
                </p>
                <StatusBadge status={appt.status} />
            </div>


            {/* Client info */}
            <div className="space-y-1">
                <p className="text-gray-800 font-medium">{appt.client_name ?? "Sin nombre"}</p>
                <p className="text-gray-500 text-sm">Tel: {appt.client_phone}</p>
            </div>
        </div>
    );
}