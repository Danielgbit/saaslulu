// src/app/api/delete-service/route.ts
import { NextResponse } from "next/server";
import { supabaseClient } from "@/lib/supabase-client";

/**
 * DELETE a completed service by ID.
 * This ensures the employee can correct mistakes safely.
 */
export async function POST(request: Request) {
    try {
        const { completedServiceId } = await request.json();

        console.log(completedServiceId);


        // Validate input
        if (!completedServiceId) {
            return NextResponse.json(
                { success: false, error: "Missing completedServiceId" },
                { status: 400 }
            );
        }

        // Delete the service entry
        const { error } = await supabaseClient
            .from("services_completed")
            .delete()
            .eq("id", completedServiceId);

        if (error) {
            console.error("❌ Error deleting completed service:", error);
            return NextResponse.json(
                { success: false, error },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error("❌ Unexpected error in delete-service API:", err);
        return NextResponse.json(
            { success: false, error: err },
            { status: 500 }
        );
    }
}
