import makeWASocket, { useMultiFileAuthState } from "@whiskeysockets/baileys";

const sessionPath = "./baileys-session"; // carpeta donde se guardan las credenciales

export async function createWhatsAppClient() {
    // Cargar credenciales (o generarlas si no existen)
    const { state, saveCreds } = await useMultiFileAuthState(sessionPath);

    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: true,
    });

    // Actualizar credenciales cuando cambian
    sock.ev.on("creds.update", saveCreds);

    return sock;
}
