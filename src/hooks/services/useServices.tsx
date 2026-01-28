type CompleteServicePayload = {
    appointmentId: string
    employeeId: string
    serviceName: string
    servicePrice: number
    durationMinutes: number
    notes?: string
}

export function useServices() {
    const completeService = async (payload: CompleteServicePayload) => {
        const res = await fetch('/api/services/complete', {
            method: 'POST',
            body: JSON.stringify(payload),
        })

        if (!res.ok) {
            throw new Error('Failed to complete service')
        }
    }

    return {
        completeService,
    }
}
