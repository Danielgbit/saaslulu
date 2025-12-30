//src/services/confirmations/confirmAppointment.service.ts

export async function confirmAppointment(token: string) {
    const res = await fetch("/api/confirmations/confirm", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ token })
    });

    if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Error confirmando la cita");
    }

    return res.json();
}
