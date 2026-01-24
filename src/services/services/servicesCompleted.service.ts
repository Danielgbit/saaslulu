// src/services/services/servicesCompleted.service.ts

import { createSupabaseAdminClient } from '@/lib/supabase-admin'
import { deleteFinancialMovementByServiceCompleted } from '../financial/financialMovements.service'

/**
 * Elimina un servicio completado y su ingreso financiero asociado.
 */
export async function deleteCompletedService(serviceCompletedId: string) {
    const supabase = createSupabaseAdminClient()

    // 1️⃣ eliminar ingreso financiero
    await deleteFinancialMovementByServiceCompleted(serviceCompletedId)

    // 2️⃣ eliminar servicio completado
    const { error } = await supabase
        .from('services_completed')
        .delete()
        .eq('id', serviceCompletedId)

    if (error) throw error
}
