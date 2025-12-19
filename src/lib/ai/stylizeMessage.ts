export async function stylizeMessage(text: string) {
    try {
        const res = await fetch(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
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
                            parts: [{ text }]
                        }
                    ],
                    systemInstruction: {
                        parts: [{
                            text: `
Reescribe el siguiente mensaje de WhatsApp para que suene
más cálido y humano.

Reglas:
- No cambies datos, fechas ni servicios
- No agregues información
- Mantén el formato y emojis
- Devuelve solo el texto
              `.trim()
                        }]
                    }
                })
            }
        );

        const data = await res.json();

        return (
            data?.candidates?.[0]?.content?.parts?.[0]?.text || text
        );
    } catch {
        // fallback total
        return text;
    }
}
