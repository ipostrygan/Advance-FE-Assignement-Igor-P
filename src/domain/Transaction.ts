export interface Transaction {
  transaction_id: string
  account_name: string
  status: 'approved' | 'pending'
  amount: number
  created_at: string
  merchant: string
  direction: 'debit' | 'credit'
}

export interface MoveMoneyPayload {
  source_account_id: string;
  destination_account_id: string;
  amount: string | number;
}
