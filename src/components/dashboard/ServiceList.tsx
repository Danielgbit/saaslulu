export function ServicesList({ appointments }: { appointments: any[] }) {
    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl">
            <h2 className="text-xl font-semibold mb-4">Servicios realizados</h2>

            <div className="space-y-4">
                {appointments.map((a) => (
                    <div
                        key={a.id}
                        className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl flex justify-between"
                    >
                        <div>
                            <p className="font-semibold">{a.services?.name}</p>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">
                                {a.appointment_date} • {a.start_time} – {a.end_time}
                            </p>
                        </div>
                        <p className="font-bold">${a.services?.price}</p>
                    </div>
                ))}

                {appointments.length === 0 && (
                    <p className="text-center text-gray-500 dark:text-gray-400">
                        Aún no tienes citas registradas.
                    </p>
                )}
            </div>
        </div>
    );
}
