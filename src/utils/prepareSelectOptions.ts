import { Account } from "@/domain/Account";

export const prepareSelectOptions = (accounts: Account[] | undefined) => 
    accounts?.map((item) => ({ id: item.account_id, value: item.account_id, label: item.name }))
