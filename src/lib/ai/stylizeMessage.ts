// src/lib/ai/stylizeMessage.ts
// Service: stylizes a message for WhatsApp using Groq (SAFE VERSION)

import Groq from "groq-sdk";

// 🧠 Inicializamos el cliente SOLO una vez
const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY!,
});

// 🔧 Modelo por defecto (evita modelos deprecados)
const DEFAULT_MODEL = "llama-3.1-8b-instant";

export async function stylizeMessage(text: string): Promise<string> {
    try {
        const completion = await groq.chat.completions.create({
            model: process.env.GROQ_MODEL || DEFAULT_MODEL,

            messages: [
                {
                    role: "system",
                    content: `
Eres un sistema automático de mensajería para WhatsApp.
NO agregues explicaciones.
NO agregues introducciones.
NO cambies el formato.
NO resumas.
NO reformules excepto lo indicado.
Devuelve SOLO el mensaje final.
Si no puedes cumplir la instrucción, devuelve el MENSAJE ORIGINAL sin cambios.
`.trim()
                },
                {
                    role: "user",
                    content: `
Reemplaza OBLIGATORIAMENTE la frase:
"Te recordamos tu próxima cita"
por:
"Queremos recordarte con gusto tu próxima cita".

NO hagas ningún otro cambio.

MENSAJE ORIGINAL:
${text}
`.trim()
                }
            ],

            // 🔥 Para mensajes transaccionales SIEMPRE bajo
            temperature: 0.3,

            // 🧱 Suficiente para WhatsApp
            max_tokens: 512,
        });

        const output = completion.choices?.[0]?.message?.content;

        // 🔍 Debug controlado (puedes quitarlo en prod)
        console.log("🧠 GROQ RAW:", completion.choices?.[0]?.message);

        // 🛡️ Defensa final: nunca romper el flujo
        if (
            typeof output !== "string" ||
            output.trim().length === 0 ||
            output.includes("undefined")
        ) {
            console.warn("⚠️ AI returned invalid message, using original text");
            return text;
        }

        return output;

    } catch (error: any) {
        // 🧯 La IA NUNCA debe romper el envío
        console.error("❌ stylizeMessage error:", error.message);
        return text;
    }
}
