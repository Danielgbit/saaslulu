import { EmployeeAvailability } from "@/types/employeeAvailability";
import { DateTime } from "luxon";

interface Props {
    emp: EmployeeAvailability;
}

const ZONE = "America/Bogota";

export default function EmployeeAvailabilityCard({ emp }: Props) {
    const borderColor =
        emp.status === "available"
            ? "border-green-500"
            : emp.status === "busy"
                ? "border-red-500"
                : "border-gray-400";

    const formatTime = (iso: string) =>
        DateTime.fromISO(iso, { zone: ZONE })
            .setLocale("es-CO")
            .toFormat("h:mm a");

    return (
        <div className={`p-4 rounded-lg border-l-4 ${borderColor} bg-white shadow-sm`}>
            <h3 className="font-semibold text-lg">{emp.full_name}</h3>

            {emp.status === "available" && emp.available_until && (
                <p className="mt-1 text-green-600">
                    Disponible hasta{" "}
                    <span className="font-medium">
                        {formatTime(emp.available_until)}
                    </span>
                </p>
            )}

            {emp.status === "busy" && emp.busy_until && (
                <p className="mt-1 text-red-600">
                    Ocupada hasta{" "}
                    <span className="font-medium">
                        {formatTime(emp.busy_until)}
                    </span>
                </p>
            )}

            {emp.status === "off" && (
                <p className="mt-1 text-gray-500">Fuera de horario</p>
            )}

            {/* 🟢 HUECOS DISPONIBLES */}
            {emp.gaps.length > 0 && (
                <div className="mt-3">
                    <p className="text-sm font-medium text-gray-600">
                        Huecos disponibles:
                    </p>

                    <ul className="mt-1 space-y-1 text-sm text-gray-700">
                        {emp.gaps.map((gap, i) => (
                            <li key={i} className="flex justify-between">
                                <span>{formatTime(gap.start)}</span>
                                <span>–</span>
                                <span>{formatTime(gap.end)}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
