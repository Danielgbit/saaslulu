import { createSupabaseAdminClient } from '@/lib/supabase-admin'

type CompleteServiceInput = {
    appointmentId: string
    employeeId: string
    serviceName: string
    servicePrice: number
    durationMinutes: number
    notes?: string
}

export async function completeService(input: CompleteServiceInput) {
    const supabase = createSupabaseAdminClient()

    // 1️⃣ validar que la cita exista y esté lista
    const { data: appointment, error: apptError } = await supabase
        .from('appointments')
        .select('status')
        .eq('id', input.appointmentId)
        .single()

    if (apptError) throw apptError

    if (appointment.status !== 'ready_to_complete') {
        throw new Error('Appointment not ready to complete')
    }

    // 2️⃣ marcar cita como completed (humano)
    const { error: updateError } = await supabase
        .from('appointments')
        .update({ status: 'completed' })
        .eq('id', input.appointmentId)

    if (updateError) throw updateError

    // 3️⃣ crear services_completed (SIN pago)
    const { error: insertError } = await supabase
        .from('services_completed')
        .insert({
            appointment_id: input.appointmentId,
            employee_id: input.employeeId,
            service_name: input.serviceName,
            service_price: input.servicePrice,
            duration_minutes: input.durationMinutes,
            notes: input.notes ?? null,
        })

    if (insertError) throw insertError
}
