export interface Transaction {
  transaction_id: string
  account_name: string
  status: 'approved' | 'pending'
  amount: number
  created_at: string
  merchant: string
  direction: 'debit' | 'credit'
}
