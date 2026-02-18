'use client';

import React, { useState } from 'react';

import {FlexxTable} from '@components/FlexxTable/FlexxTable';
import useFetchAccounts from '@/hooks/accounts/useFetchAccounts';
import useAccountsDashboardTable from '@views/accounts/hooks/useAccountsDashboardTable';
import {useGlobalSearch} from '@core/hooks/useGlobalSearch';
import useAccountDetails from '../hooks/useAccountDetails';
import { Account } from '@/domain/Account';

const AccountsDashboardTable: React.FC = () => {
  const {searchQuery} = useGlobalSearch();
  const {data, isLoading, isError} = useFetchAccounts({searchQuery});
  const [selectedAccount, setSelectedAccount] = useState<Account | undefined>(undefined)
  const { openDrawer, Drawer } = useAccountDetails(selectedAccount)

  const selectRow = (account: Account | undefined) => {
    setSelectedAccount(account)
    openDrawer()
  }
  
  const {columns, rows} = useAccountsDashboardTable(data, selectRow);

  return (
    <>
      <FlexxTable
        columns={columns}
        rows={rows}
        isLoading={isLoading}
        isError={isError}
        emptyState='No accounts found'
      />
      {Drawer}
    </>
  );
};

export default AccountsDashboardTable;
