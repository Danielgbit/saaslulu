"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import MenuItem from "./MenuItem";
import { menuItems } from "./MenuItems";

export default function Sidebar() {
    const [open, setOpen] = useState(true);

    return (
        <div
            className={`h-screen bg-black/90 text-white transition-all duration-300 
        ${open ? "w-64" : "w-20"} flex flex-col`}
        >
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

            {/* MENU TITLE */}
            {open && (
                <p className="px-4 mt-6 mb-2 text-xs opacity-70">
                    MENU
                </p>
            )}

            {/* ITEMS */}
            <div className="flex flex-col gap-1 px-2">
                {menuItems.map((item) => (
                    <MenuItem key={item.name} item={item} open={open} />
                ))}
            </div>
        </div>
    );
}
