// src/services/appointments/deleteCompletedService.ts

/**
 * Calls the secure API endpoint to delete a completed service.
 * Returns { success: boolean }
 */
export const deleteCompletedService = async (completedServiceId: string) => {
    try {
        const response = await fetch("/api/service/delete-service", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ completedServiceId })
        });

        return await response.json();
    } catch (err) {
        console.error("❌ Error calling delete-service API:", err);
        return { success: false, error: err };
    }
};
