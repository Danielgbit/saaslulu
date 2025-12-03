import { default as makeWASocket, useMultiFileAuthState } from "@whiskeysockets/baileys";
import fs from "fs";

const sessionPath = "./baileys-auth.json";

// Si no existe el archivo, crearlo vacío
if (!fs.existsSync(sessionPath)) {
    fs.writeFileSync(sessionPath, JSON.stringify({}));
}

const { state, saveCreds } = await useMultiFileAuthState(sessionPath);

export function createWhatsAppClient() {
    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: true
    });

    sock.ev.on("creds.update", saveCreds);

    return sock;
}
