import { useState } from "react";
import { startConfirmationProcess } from "@/services/appointments/appointments.service";

export const useStartConfirmation = () => {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    const startConfirmation = async () => {
        try {
            setLoading(true);
            setError(null);

            const data = await startConfirmationProcess();
            setResult(data);

            return data;
        } catch (err: any) {
            setError(err.message || "Error executing confirmation");
            return null;
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        result,
        error,
        startConfirmation,
    };
};
