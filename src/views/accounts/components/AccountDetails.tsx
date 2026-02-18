import AdvanceActionButtons from "@/components/AdvanceActionButtons/AdvanceActionButtons";
import { ActionButtonConfig } from "@/components/AdvanceActionButtons/types";
import { Account } from "@/domain/Account"
import TransactionsTable from "@/views/transactions/components/TransactionsTable"
import { Chip, ChipOwnProps, IconButton } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useMoveMoneyDrawer } from "../hooks/useMoveMoneyDrawer";
import InfoField from "@/components/InfoField";
import AdvanceAccountNumberDisplay from "@/components/AdvanceAccountNumberDisplay/AdvanceAccountNumberDisplay";
import DisplayInfo from "@/components/DisplayInfo";
import KeyValue from "@/components/KeyValue";
import AdvanceCurrencyText from "@/components/AdvanceCurrencyText/AdvanceCurrencyText";
import MoveMoneyForm from "./MoveMoneyForm";
import classNames from "classnames";
import FlexxIcon from "@/components/FlexxIcon/FlexxIcon";

interface AccountDetailsProps {
  account: Account | undefined
  onFormVisible: (isOpen: boolean) => void
}

const CHIP_COLORS: Record<string, ChipOwnProps['color']> = {
  'open': 'success'
}

const AccountDetails = ({ account, onFormVisible }: AccountDetailsProps) => {
  if (!account) return null;

  const { openDrawer: openMoveMoneyDrawer, Drawer: MoveMoneyDrawer } = useMoveMoneyDrawer()
  const [isMoveMoneyFormShown, setIsMoveMoneyFormShown] = useState(false)

  const actions: ActionButtonConfig[] = useMemo(() => [
    {
      name: 'Move Money',
      variant: 'outlined',
      onClick: () => setIsMoveMoneyFormShown(true),
      startIcon: 'fluent--arrow-swap-20-regular',
    },
  ], [openMoveMoneyDrawer])

  useEffect(() => {
    onFormVisible(isMoveMoneyFormShown)
  }, [isMoveMoneyFormShown])

  return (
    <div className={classNames("flex", {
      "gap-12": isMoveMoneyFormShown,
    })}>
      <div className={classNames("flex flex-col gap-4 grow basis-full flex-shrink-0", {
        "basis-3/4 shrink": isMoveMoneyFormShown,
      })}>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between">
            <div className="flex gap-4">
              <h2 className="text-2xl font-semibold">{account.name}</h2>
              <Chip variant="outlined" color={CHIP_COLORS[account.status]} label={account.status} />
            </div>
            {isMoveMoneyFormShown && (
              <IconButton
                onClick={() => setIsMoveMoneyFormShown(false)}
              >
                <FlexxIcon
                  width={20}
                  height={20}
                  icon='fluent--chevron-right-20-regular'
                />
              </IconButton>
            )}
          </div>
          <p className="text-gray-400">{account.bank_name}</p>
          <div className="flex gap-4">
            <KeyValue 
              label="Account Number" 
              value={<AdvanceAccountNumberDisplay id="accountNumber" accountNumber={account.account_number} />} 
            />
            <KeyValue label="Routing Number" value={account.routing_number} />
          </div>
          <div className="flex justify-between">
            <KeyValue 
              label="Balance" 
              value={<AdvanceCurrencyText amount={account.balance} />} 
            />
            <AdvanceActionButtons actions={actions} />
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold">Transactions</h2>
          <TransactionsTable accountId={account.account_id} />
        </div>
      </div>
      <div className={classNames("flex flex-col gap-4 grow translate-x-full transition-transform duration-500", {
        "basis-1/4 !translate-x-0 min-w-[350px]": isMoveMoneyFormShown,
      })}>
        {isMoveMoneyFormShown && (
          <MoveMoneyForm 
            actionOnSubmit={() => setIsMoveMoneyFormShown(false)} 
            selectedAccountId={account.account_id} 
          />
        )}
      </div>
    </div>
  )
}

export default AccountDetails
