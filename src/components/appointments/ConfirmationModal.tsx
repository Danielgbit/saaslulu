/**
 * ConfirmationModal Component
 * Shows when an appointment is completed.
 */

import { AppointmentRow } from "@/types/appointmentRow ";

interface Props {
    appointment: AppointmentRow | null;
    onClose: () => void;
    onConfirm: () => void;
    onAddExtraService: () => void;
}

export default function ConfirmationModal({
    appointment,
    onClose,
    onConfirm,
    onAddExtraService,
}: Props) {
    if (!appointment) return null;

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 shadow-xl w-[90%] max-w-md">
                <h2 className="text-xl font-bold mb-4">
                    Servicio terminado
                </h2>

                <p className="mb-3">
                    ¿El servicio de <strong>{appointment.client_name}</strong> fue finalizado correctamente?
                </p>

                <div className="flex flex-col space-y-3 mt-4">
                    <button
                        className="bg-green-600 text-white py-2 rounded-md font-semibold"
                        onClick={onConfirm}
                    >
                        Confirmar finalización
                    </button>

                    <button
                        className="bg-blue-500 text-white py-2 rounded-md font-semibold"
                        onClick={onAddExtraService}
                    >
                        Agregar servicio adicional
                    </button>

                    <button
                        className="text-gray-600 py-2 rounded-md font-semibold"
                        onClick={onClose}
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
}
