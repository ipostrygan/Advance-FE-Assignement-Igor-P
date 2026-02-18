import React, {useMemo} from 'react';

import {
  FlexxColumn,
  FlexxTableRow,
} from '@components/FlexxTable/domain/FlexxTable';
import { Transaction } from '@/domain/Transaction';

const columns: FlexxColumn[] = [
  { field: 'date', headerName: 'Date', dateFormat: 'lg' },
  { field: 'account', headerName: 'Account' },
  { field: 'merchant', headerName: 'Merchant' },
  { field: 'amount', headerName: 'Amount', currency: true, align: 'center' },
  { field: 'direction', headerName: 'Direction' },
  { field: 'status', headerName: 'Status' },
];

const useTransactionsTable = (transactions: Transaction[] | undefined) => {
  const rows: FlexxTableRow[] = useMemo(() => {
    if (!transactions) return [];

    return transactions.map(transaction => ({
      data: {
        date: transaction.created_at,
        account: transaction.account_name,
        merchant: transaction.merchant,
        amount: transaction.amount,
        direction: transaction.direction,
        status: transaction.status,
      },
    }));
  }, [transactions]);

  return { columns, rows };
};

export default useTransactionsTable
