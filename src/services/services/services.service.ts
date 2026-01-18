import { supabaseClient } from "@/lib/supabase-client";

export const getAllServices = async () => {
    const { data, error } = await supabaseClient
        .from("services")
        .select("*")
        .order("name", { ascending: true });

    if (error) {
        console.error("❌ Error loading services", error);
        return [];
    }

    return data;
};
