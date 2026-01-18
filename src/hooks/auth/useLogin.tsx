"use client";

import { useState } from "react";
import { supabaseClient } from "@/lib/supabase-client";
import { useRouter } from "next/navigation";

export function useLogin() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage("");
        setLoading(true);

        // Login
        const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });

        if (error) {
            setMessage(error.message);
            setLoading(false);
            return;
        }

        const user = data.user;

        // Check if employee is assigned
        const { data: employee } = await supabaseClient
            .from("employees")
            .select("id")
            .eq("auth_user_id", user.id)
            .maybeSingle();

        setLoading(false);

        if (!employee) {
            router.push("/select-employee"); // ⚠️ send to employee selector
            return;
        }

        router.push("/dashboard"); // ⚡ already configured employee
    };

    return {
        email,
        setEmail,
        password,
        setPassword,
        loading,
        message,
        handleLogin,
    };
}
