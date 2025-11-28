"use client";

import { useState } from "react";
import { supabaseClient } from "@/lib/supabaseClient";

export function useRegister() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage("");

        if (!email || !password || !confirmPassword) {
            setMessage("Por favor completa todos los campos");
            return;
        }

        if (password !== confirmPassword) {
            setMessage("Las contraseñas no coinciden");
            return;
        }

        setLoading(true);

        const { error } = await supabaseClient.auth.signUp({ email, password });

        if (error) {
            setMessage(error.message);
            setLoading(false);
            return;
        }

        setMessage("Verifica tu correo electrónico para continuar");
        setLoading(false);
    };

    return {
        email,
        setEmail,
        password,
        setPassword,
        confirmPassword,
        setConfirmPassword,
        message,
        loading,
        handleRegister,
    };
}
