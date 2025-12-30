// src/services/confirmations/confirmations.service.ts
// Service: sends confirmation messages to clients


export function groupByClient(appointments: any[]) {
    const grouped: Record<string, any> = {};

    for (const a of appointments) {
        if (!grouped[a.client_phone]) {
            grouped[a.client_phone] = {
                client_name: a.client_name,
                client_phone: a.client_phone,
                appointments: []
            };
        }

        grouped[a.client_phone].appointments.push(a);
    }

    return Object.values(grouped);
}


function formatDate(dateStr: string) {
    const date = new Date(dateStr);
    return date.toLocaleDateString("es-CO", {
        weekday: "long",
        day: "numeric",
        month: "long",
        hour: "numeric",
        minute: "2-digit"
    });
}

export function buildMessage(client: any, confirmationUrl: string) {
    let message = `Hola ${client.client_name} 😊\n\n`;

    if (client.appointments.length === 1) {
        const a = client.appointments[0];
        const serviceName = a.service?.name || "Servicio programado";

        message += `Te recordamos tu próxima cita:\n\n`;
        message += `📅 ${formatDate(a.start_at)}\n`;
        message += `💅 ${serviceName}\n\n`;
        message += `👉 Confirma tu cita aquí:\n${confirmationUrl}\n\n`;
        message += `¡Te esperamos!`;
    } else {
        message += `Te recordamos tus próximas citas:\n\n`;

        for (const a of client.appointments) {
            const serviceName = a.service?.name || "Servicio programado";
            message += `📅 ${formatDate(a.start_at)}\n`;
            message += `💅 ${serviceName}\n\n`;
        }

        message += `👉 Confirma tus citas aquí:\n${confirmationUrl}`;
    }

    return message;
}



// src/services/whatsapp/whatsapp.service.ts (SERVER)
export async function sendWhatsApp(phone: string, message: string) {
    const res = await fetch(`${process.env.BAILEYS_API_URL}/send`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.BAILEYS_API_KEY}`
        },
        body: JSON.stringify({
            phone,
            message
        }),
        cache: "no-store"
    });

    if (!res.ok) {
        const err = await res.text();
        throw new Error(err || "Baileys send failed");
    }

}
