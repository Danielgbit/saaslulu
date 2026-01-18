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

    // 👉 Regla actual: una cita por cliente
    if (client.appointments.length === 1) {
        const a = client.appointments[0];
        const serviceName = a.service?.name || "Servicio programado";

        message += `Queremos recordarte con gusto tu próxima cita:\n\n`;
        message += `📅 ${formatDate(a.start_at)}\n`;
        message += `💅 ${serviceName}\n\n`;

        message += `¿Qué deseas hacer?\n\n`;
        message += `✅ Confirmar cita\n`;
        message += `🔁 Reprogramar\n`;
        message += `❌ Cancelar\n\n`;

        // ⚠️ Link SOLO en su línea (WhatsApp friendly)
        message += `Confirma aquí 👇\n`;
        message += `${confirmationUrl}\n\n`;

        message += `Si deseas reprogramar o cancelar, respóndenos este mensaje por WhatsApp 📲`;
    } else {
        message += `Queremos recordarte con gusto tus próximas citas:\n\n`;

        for (const a of client.appointments) {
            const serviceName = a.service?.name || "Servicio programado";
            message += `📅 ${formatDate(a.start_at)}\n`;
            message += `💅 ${serviceName}\n\n`;
        }

        message += `¿Qué deseas hacer?\n\n`;
        message += `✅ Confirmar citas\n`;
        message += `🔁 Reprogramar\n`;
        message += `❌ Cancelar\n\n`;

        // ⚠️ Link SOLO en su línea
        message += `Confirma aquí 👇\n`;
        message += `${confirmationUrl}\n\n`;

        message += `Si deseas reprogramar o cancelar, respóndenos este mensaje por WhatsApp 📲`;
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
