
// src/lib/ai/stylizeMessage.ts
// Service: stylizes a message for WhatsApp
export async function stylizeMessage(text: string) {
    const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${process.env.GEMINI_MODEL}:generateContent`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Goog-Api-Key": process.env.GEMINI_API_KEY!,
            },
            body: JSON.stringify({
                contents: [
                    {
                        role: "user",
                        parts: [
                            {
                                text: `
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
                        ]
                    }
                ],
                generationConfig: {
                    temperature: 0.9,
                    maxOutputTokens: 512
                }
            })
        }
    );

    const data = await res.json();

    console.log("🔍 GEMINI RAW RESPONSE:", JSON.stringify(data, null, 2));

    const output =
        data?.candidates?.[0]?.content?.parts?.[0]?.text;

    return output || text;
}
