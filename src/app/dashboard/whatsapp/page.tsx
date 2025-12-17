import WhatsAppConnect from "@/components/whatsapp/WhatsAppConnect"

export default function Page() {
    return (
        <div className="space-y-6">
            <header>
                <h1 className="text-2xl font-bold">WhatsApp</h1>
                <p className="text-sm text-gray-600">
                    Administra la conexión de WhatsApp de tu cuenta
                </p>
            </header>

            <WhatsAppConnect />
        </div>
    )
}
