export type FinancialMovementType = 'income' | 'expense'

export type PaymentMethod =
  | 'cash'
  | 'card'
  | 'transfer'
  | 'nequi'
  | 'daviplata'

export interface FinancialMovement {
  id: string
  type: FinancialMovementType
  category: string
  amount: number
  description?: string
  reference_table?: string
  reference_id?: string
  payment_method?: PaymentMethod
  occurred_at: string
  created_at: string
}
