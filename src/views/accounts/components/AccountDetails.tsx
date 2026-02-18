import { Account } from "@/domain/Account"
import TransactionsTable from "@/views/transactions/components/TransactionsTable"
import { Badge, Chip, ChipOwnProps } from "@mui/material";

interface AccountDetailsProps {
  account: Account | undefined
}

const CHIP_COLORS: Record<string, ChipOwnProps['color']> = {
  'open': 'success'
}

const AccountDetails = ({ account }: AccountDetailsProps) => {
  if (!account) return null;

  return (
    <div>
      <div>
        <div className="flex gap-4">
          <h2 className="text-2xl font-semibold">{account.name}</h2>
          <Chip variant="outlined" color={CHIP_COLORS[account.status]} label={account.status} />
        </div>
        <p className="text-gray-400">{account.bank_name}</p>
      </div>
      <div>
        <h2 className="text-xl font-semibold">Transactions</h2>
        <TransactionsTable accountId={account.account_id} />
      </div>
    </div>
  )
}

export default AccountDetails
