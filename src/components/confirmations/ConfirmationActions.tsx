import { Trash2, CalendarCheck, Send } from "lucide-react";

interface Props {
    isLoading: boolean;
    loadingTomorrow: boolean;
    loadingSend: boolean;
    hasAppointments: boolean;
    onRefetch: () => void;
    onSend: () => void;
    onClear: () => void;
}

const ConfirmationActions = ({
    isLoading,
    loadingTomorrow,
    loadingSend,
    hasAppointments,
    onRefetch,
    onSend,
    onClear
}: Props) => (
    <section className="flex flex-wrap gap-4">
        <button
            onClick={onRefetch}
            disabled={isLoading}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gray-800 text-white"
        >
            <CalendarCheck size={18} />
            {loadingTomorrow ? "Cargando citas..." : "Ver citas de mañana"}
        </button>

        <button
            onClick={onSend}
            disabled={isLoading || !hasAppointments}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white"
        >
            <Send size={18} />
            {loadingSend ? "Enviando..." : "Enviar confirmaciones"}
        </button>

        <button
            onClick={onClear}
            disabled={!hasAppointments}
            className="flex items-center gap-2 px-5 py-3 rounded-xl border border-red-300 text-red-600"
        >
            <Trash2 size={18} />
            Limpiar lista
        </button>
    </section>
);

export default ConfirmationActions;
