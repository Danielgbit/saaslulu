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

export function buildMessage(client: any) {
    let message = `Hola ${client.client_name} 😊\n\n`;

    if (client.appointments.length === 1) {
        const a = client.appointments[0];
        message += `Te recordamos tu próxima cita:\n\n`;
        message += `📅 ${formatDate(a.start_at)}\n`;
        message += `💅 ${a.service_name}\n\n`;
        message += `Por favor confirma respondiendo “Sí”.`;
    } else {
        message += `Te recordamos tus próximas citas:\n\n`;

        for (const a of client.appointments) {
            message += `📅 ${formatDate(a.start_at)}\n`;
            message += `💅 ${a.service_name}\n\n`;
        }

        message += `Confirma respondiendo “Sí” si todo está bien.`;
    }

    return message;
}

export async function sendWhatsApp(phone: string, message: string) {
    await fetch(process.env.WHATSAPP_API_URL!, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${process.env.WHATSAPP_API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            phone,
            message
        })
    });
}
