import Stat from "./Stat";

const ConfirmationResult = ({ result }: { result: any }) => (
    <section className="bg-white rounded-2xl border shadow-sm p-6 space-y-4">
        <h2 className="text-xl font-semibold">Resultado del envío</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <Stat label="Total" value={result.total} />
            <Stat label="Exitosas" value={result.successful} success />
            <Stat label="Fallidas" value={result.failed} error />
        </div>

        {result.details && (
            <ul className="space-y-3 pt-4">
                {result.details.map((detail: any, i: number) => (
                    <li
                        key={i}
                        className={`rounded-xl border p-4 ${detail.success
                                ? "bg-green-50 border-green-200"
                                : "bg-red-50 border-red-200"
                            }`}
                    >
                        <p><strong>Cita:</strong> #{detail.appointment_id}</p>
                        <p>Estado: {detail.success ? "✅ Enviada" : "❌ Error"}</p>
                        {detail.error && (
                            <p className="text-red-600">{detail.error}</p>
                        )}
                    </li>
                ))}
            </ul>
        )}
    </section>
);

export default ConfirmationResult;
