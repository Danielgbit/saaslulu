// src/lib/ai/stylizeMessage.ts
// Service: stylizes a message for WhatsApp (Groq)

import Groq from "groq-sdk";

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY!,
});

export async function stylizeMessage(text: string) {
    const completion = await groq.chat.completions.create({
        model: process.env.GROQ_MODEL || "llama3-8b-8192",
        messages: [
            {
                role: "system",
                content:
                    "Sigue las instrucciones EXACTAMENTE. No agregues texto adicional."
            },
            {
                role: "user",
                content: `
CAMBIA OBLIGATORIAMENTE la frase
"Te recordamos tu próxima cita"
por
"Queremos recordarte con gusto tu próxima cita".

NO hagas ningún otro cambio.
Devuelve SOLO el texto final.

MENSAJE:
${text}
`.trim()
            }
        ],
        temperature: 0.9,
        max_tokens: 512,
    });

    const output = completion.choices?.[0]?.message?.content;

    return output || text;
}
