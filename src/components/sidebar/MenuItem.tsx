"use client";

import Link from "next/link";

export default function MenuItem({ item, open }: any) {
    const Icon = item.icon;

    return (
        <Link
            href={item.href}
            className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-white/10 transition-colors"
        >
            <Icon size={20} className="opacity-80" />
            {open && <span>{item.name}</span>}
        </Link>
    );
}
