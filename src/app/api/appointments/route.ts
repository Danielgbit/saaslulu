import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { createSupabaseServerClient } from "@/lib/supabase-server"


/* API endpoint to fetch appointments for a specific employee */
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


/* =========================
   POST – crear cita
========================= */
export async function POST(req: Request) {
  const body = await req.json()

  const {
    employee_id,
    client_name,
    service_id,
    start_at,
    end_at,
  } = body

  if (!employee_id || !start_at || !end_at) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    )
  }

  const supabase = createSupabaseServerClient()

  const { data, error } = await supabase
    .from("appointments")
    .insert({
      employee_id,
      client_name,
      service_id,
      start_at,
      end_at,
      status: "scheduled",
    })
    .select()
    .single()

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }

  return NextResponse.json(data)
}

/* =========================
   PUT – actualizar cita
========================= */
export async function PUT(req: Request) {
  const body = await req.json()
  const { id, ...updates } = body

  if (!id) {
    return NextResponse.json(
      { error: "id required" },
      { status: 400 }
    )
  }

  const supabase = createSupabaseServerClient()

  const { data, error } = await supabase
    .from("appointments")
    .update(updates)
    .eq("id", id)
    .select()
    .single()

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }

  return NextResponse.json(data)
}

/* =========================
   DELETE – eliminar cita
========================= */
export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get("id")

  if (!id) {
    return NextResponse.json(
      { error: "id required" },
      { status: 400 }
    )
  }

  const supabase = createSupabaseServerClient()

  const { error } = await supabase
    .from("appointments")
    .delete()
    .eq("id", id)

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }

  return NextResponse.json({ success: true })
}