import { EmployeeAvailability } from "@/types/employeeAvailability";
import { DateTime } from "luxon";

interface Props {
    emp: EmployeeAvailability;
}

const ZONE = "America/Bogota";

export default function EmployeeAvailabilityCard({ emp }: Props) {
    const formatTime = (iso: string) =>
        DateTime.fromISO(iso, { zone: ZONE })
            .setLocale("es-CO")
            .toFormat("h:mm a");

    const statusStyles = {
        available: {
            border: "border-green-500",
            badge: "bg-green-100 text-green-700",
            label: "Disponible"
        },
        busy: {
            border: "border-red-500",
            badge: "bg-red-100 text-red-700",
            label: "Ocupada"
        },
        off: {
            border: "border-gray-400",
            badge: "bg-gray-100 text-gray-600",
            label: "Fuera de horario"
        }
    }[emp.status];

    return (
        <div
            className={`rounded-xl border-l-4 ${statusStyles.border} bg-white p-5 shadow-sm transition hover:shadow-md`}
        >
            {/* Header */}
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">
                    {emp.full_name}
                </h3>

                <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${statusStyles.badge}`}
                >
                    {statusStyles.label}
                </span>
            </div>

            {/* Estado */}
            <div className="mt-3 space-y-1">
                {emp.status === "busy" && emp.busy_until && (
                    <p className="text-sm text-gray-700">
                        Ocupada hasta{" "}
                        <span className="font-semibold text-gray-900">
                            {formatTime(emp.busy_until)}
                        </span>
                    </p>
                )}

                {emp.status === "off" && (
                    <p className="text-sm text-gray-500">
                        No disponible en este momento
                    </p>
                )}
            </div>

            {/* 🟢 TODOS LOS HUECOS */}
            {emp.gaps.length > 0 && emp.status !== "off" && (
                <div className="mt-4">
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                        Horarios disponibles hoy
                    </p>

                    <ul className="mt-2 space-y-1">
                        {emp.gaps.map((gap, index) => (
                            <li
                                key={index}
                                className="flex items-center justify-between rounded-md bg-gray-50 px-3 py-2 text-sm text-gray-700"
                            >
                                <span className="font-medium text-gray-900">
                                    {formatTime(gap.start)}
                                </span>
                                <span className="text-gray-400">—</span>
                                <span className="font-medium text-gray-900">
                                    {formatTime(gap.end)}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
