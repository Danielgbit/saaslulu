// Handles completion of a single service

import { saveCompletedService } from "@/services/servicesEmployeeCompleted.service";
import { useState } from "react";

// (acción: save services)
export function useCompleteService() {
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const completeService = async (payload: any) => {
        setLoading(true);
        setErrorMsg("");

        try {
            const data = await saveCompletedService(payload);
            return data;
        } catch (err: any) {
            setErrorMsg(err.message);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { loading, errorMsg, completeService };
}
