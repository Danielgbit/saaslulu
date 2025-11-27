"use client";

import { useState } from "react";
import Link from "next/link";
import {
    Home,
    FileText,
    Bell,
    Settings,
    Menu,
    Crosshair
} from "lucide-react";

const menuItems = [
    { name: "Dashboard", icon: Home, href: "/dashboard" },
    { name: "Empleados", icon: FileText, href: "/dashboard/earnings" },
    { name: "Notificaciones", icon: Bell, href: "/dashboard/notifications" },
    { name: "Servicios", icon: Crosshair, href: "/dashboard/services-completed" },
    { name: "Citas", icon: Crosshair, href: "/appointments" },
    { name: "Configuración", icon: Settings, href: "/dashboard/settings" },
];

export default function Sidebar() {
    const [open, setOpen] = useState(true);

    return (
        <div className={`h-screen bg-black/90 text-white transition-all duration-300 
            ${open ? "w-64" : "w-20"} flex flex-col`}>

            {/* Header */}
            <div className="flex items-center justify-between px-4 py-5 border-b border-white/10">
                <div className="flex items-center gap-2">
                    {open && <div className="w-8 h-8 bg-blue-500 rounded-lg"></div>}
                    {open && <h1 className="font-bold text-lg">LULU</h1>}
                </div>

                <button onClick={() => setOpen(!open)}>
                    <Menu size={22} />
                </button>
            </div>


            {/* MAIN MENU */}
            <p className={`px-4 mt-6 mb-2 text-xs opacity-70 ${!open && "hidden"}`}>
                MENU
            </p>

            <div className="flex flex-col gap-1 px-2">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="flex items-center gap-3 px-3 py-3 rounded-xl
                                hover:bg-white/10 transition-colors"
                        >
                            <Icon size={20} className="opacity-80" />
                            {open && <span>{item.name}</span>}
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
