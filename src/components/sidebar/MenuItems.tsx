// src/components/sidebar/menuItems.ts
import { Home, FileText, Bell, Settings, Crosshair, Check } from "lucide-react";

export const menuItems = [
    { name: "Dashboard", icon: Home, href: "/dashboard" },
    { name: "Empleados", icon: FileText, href: "/dashboard/earnings" },
    { name: "Notificaciones", icon: Bell, href: "/dashboard/notifications" },
    { name: "Servicios", icon: Crosshair, href: "/dashboard/services-completed" },
    { name: "Citas", icon: Crosshair, href: "/dashboard/appointments" },
    { name: "Confirmación", icon: Check, href: "/dashboard/confirmation" },
    { name: "Configuración", icon: Settings, href: "/dashboard/settings" },
];
