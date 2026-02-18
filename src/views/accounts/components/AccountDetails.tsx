import AdvanceActionButtons from "@/components/AdvanceActionButtons/AdvanceActionButtons";
import { ActionButtonConfig } from "@/components/AdvanceActionButtons/types";
import { Account } from "@/domain/Account"
import TransactionsTable from "@/views/transactions/components/TransactionsTable"
import { Chip, ChipOwnProps } from "@mui/material";
import { useMemo } from "react";
import { useMoveMoneyDrawer } from "../hooks/useMoveMoneyDrawer";
import InfoField from "@/components/InfoField";
import AdvanceAccountNumberDisplay from "@/components/AdvanceAccountNumberDisplay/AdvanceAccountNumberDisplay";
import DisplayInfo from "@/components/DisplayInfo";
import KeyValue from "@/components/KeyValue";
import AdvanceCurrencyText from "@/components/AdvanceCurrencyText/AdvanceCurrencyText";

interface AccountDetailsProps {
  account: Account | undefined
}

const CHIP_COLORS: Record<string, ChipOwnProps['color']> = {
  'open': 'success'
}

const AccountDetails = ({ account }: AccountDetailsProps) => {
  if (!account) return null;
  const { openDrawer: openMoveMoneyDrawer, Drawer: MoveMoneyDrawer } = useMoveMoneyDrawer()

  const actions: ActionButtonConfig[] = useMemo(() => [
    {
      name: 'Move Money',
      variant: 'outlined',
      onClick: openMoveMoneyDrawer,
      startIcon: 'fluent--arrow-swap-20-regular',
    },
  ], [openMoveMoneyDrawer])

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <h2 className="text-2xl font-semibold">{account.name}</h2>
          <Chip variant="outlined" color={CHIP_COLORS[account.status]} label={account.status} />
        </div>
        <p className="text-gray-400">{account.bank_name}</p>
        <div className="flex gap-4">
          <KeyValue label="Account Number" value={<AdvanceAccountNumberDisplay id="accountNumber" accountNumber={account.account_number} />} />
          <KeyValue label="Routing Number" value={account.routing_number} />
        </div>
        <div className="flex justify-between">
          <KeyValue 
            label="Balance" 
            value={<AdvanceCurrencyText amount={account.balance} />} />
          <AdvanceActionButtons actions={actions} />
        </div>
      </div>
      <div>
        <h2 className="text-xl font-semibold">Transactions</h2>
        <TransactionsTable accountId={account.account_id} />
      </div>
      {MoveMoneyDrawer}
    </div>
  )
}

export default AccountDetails
