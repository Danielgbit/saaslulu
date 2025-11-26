// services/chatService.ts
export async function sendMessageService(message: string) {
    const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
    });

    return await res.json();
}

export async function fetchReplyService() {
    const res = await fetch("/api/reply");
    return await res.json();
}

export async function clearConversationService() {
    await fetch("/api/reply", { method: "DELETE" });
}
