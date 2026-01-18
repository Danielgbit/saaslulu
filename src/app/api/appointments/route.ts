import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function GET(req: Request) {
  console.log("📥 [API /appointments] Request received")

  const { searchParams } = new URL(req.url)

  const start = searchParams.get("start")
  const end = searchParams.get("end")
  const employeeId = searchParams.get("employeeId")

  console.log("🔎 Query params:", { start, end, employeeId })

  if (!start || !end || !employeeId) {
    console.warn("⚠️ Missing params")
    return NextResponse.json(
      { error: "Missing params" },
      { status: 400 }
    )
  }

  // 🔓 Cliente público (SIN auth)
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  console.log("📡 Fetching appointments from DB...")

  const { data, error } = await supabase
    .from("appointments")
    .select(`
      id,
      start_at,
      end_at,
      status,
      client_name,
      employee_id,
      services ( name )
    `)
    .eq("employee_id", employeeId)
    .gte("start_at", start)
    .lte("end_at", end)

  if (error) {
    console.error("❌ Supabase query error:", error)
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }

  console.log(`✅ Appointments fetched: ${data.length}`)
  console.log("📦 Data:", data)

  return NextResponse.json(data)
}
