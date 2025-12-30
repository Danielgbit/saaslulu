import { useState } from "react";
import { confirmAppointment } from "@/services/confirmations/confirmAppointment.service";

export function useConfirmAppointment() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const confirm = async (token: string) => {
        try {
            setLoading(true);
            setError(null);

            await confirmAppointment(token);
            setSuccess(true);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return {
        confirm,
        loading,
        success,
        error
    };
}
