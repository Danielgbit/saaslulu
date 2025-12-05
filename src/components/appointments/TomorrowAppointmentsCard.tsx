"use client";

/**
 * Card component that displays tomorrow's appointments.
 * Keeps rendering isolated from the main ConfirmationPage.
 */
const TomorrowAppointmentsCard = ({ appointments, count }: any) => {
    return (
        <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Citas de Mañana
            </h2>

            <p className="text-gray-700 mb-4">
                Total: <span className="font-bold">{count}</span>
            </p>

            <ul className="space-y-4">
                {appointments.map((appointment: any) => (
                    <li
                        key={appointment.id}
                        className="p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm"
                    >
                        <p>
                            <strong>Hora:</strong>{" "}
                            {new Date(appointment.start_at).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                            })}
                        </p>

                        <p>
                            <strong>Cliente:</strong>{" "}
                            {appointment.client_name || "Sin nombre"}
                        </p>

                        <p>
                            <strong>Empleado:</strong>{" "}
                            {appointment.employee?.full_name || "Desconocido"}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TomorrowAppointmentsCard;
