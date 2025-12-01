"use client";

import { useServices } from "@/hooks/services/useServices";
import { Service } from "@/types/services";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (service: Service) => void;   // 🔥 CAMBIO AQUÍ
};

export default function AddExtraServiceModal({ isOpen, onClose, onAdd }: Props) {
    const { services, loading } = useServices();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-gray-800 rounded-xl p-6 w-[90%] max-w-lg shadow-xl">
                <h3 className="text-xl font-semibold mb-4">Agregar servicio adicional</h3>

                {loading ? (
                    <p className="text-gray-500 text-center">Cargando servicios...</p>
                ) : (
                    <div className="max-h-[320px] overflow-y-auto space-y-3">
                        {services.map((s) => (
                            <button
                                key={s.id}
                                onClick={() => {
                                    onAdd(s);    // 🔥 AHORA ESTÁ PERFECTO
                                    onClose();
                                }}
                                className="w-full text-left border p-3 rounded-lg hover:bg-gray-700 transition flex flex-col"
                            >
                                <div className="flex justify-between">
                                    <span className="font-medium">{s.name}</span>
                                    <span className="font-semibold text-blue-600">${s.price}</span>
                                </div>

                                <span className="text-sm text-gray-500">
                                    Duración: {s.duration_minutes} min
                                </span>

                                {s.description && (
                                    <span className="text-xs text-gray-400 mt-1">
                                        {s.description}
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>
                )}

                <button
                    className="mt-4 w-full py-2 text-gray-600 hover:text-black"
                    onClick={onClose}
                >
                    Cancelar
                </button>
            </div>
        </div>
    );
}
