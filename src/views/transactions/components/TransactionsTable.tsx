'use client';

import { FlexxTable } from '@components/FlexxTable/FlexxTable';
import { useGlobalSearch } from '@core/hooks/useGlobalSearch';
import useFetchTransactions from '@/hooks/useFetchTransactions';
import useTransactionsTable from '../hooks/useTransactionsTable';

interface TransactionsTableProps {
  accountId?: string
}

const TransactionsTable = ({ accountId }: TransactionsTableProps) => {
  const { searchQuery } = useGlobalSearch();
  const { data, isLoading, isError } = useFetchTransactions({ accountId, searchQuery });
  const { columns, rows } = useTransactionsTable(data);

  return (
    <FlexxTable
      columns={columns}
      rows={rows}
      isLoading={isLoading}
      isError={isError}
      emptyState='No transactions found'
    />
  );
};

export default TransactionsTable;
