'use client';

import React from 'react';

import {FlexxTable} from '@components/FlexxTable/FlexxTable';
import useFetchAccounts from '@/hooks/useFetchAccounts';
import useAccountsDashboardTable from '@views/accounts/hooks/useAccountsDashboardTable';
import {useGlobalSearch} from '@core/hooks/useGlobalSearch';
import useFetchTransactions from '@/hooks/useFetchTransactions';
import useTransactionsTable from '../hooks/useTransactionsTable';

const TransactionsTable = () => {
  const {searchQuery} = useGlobalSearch();
  
  const {data, isLoading, isError} = useFetchTransactions({searchQuery});
  const {columns, rows} = useTransactionsTable(data);

  console.log("S", searchQuery)
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
