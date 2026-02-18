'use client';

import React from 'react';

import {Typography} from '@mui/material';
import FlexxDashboardWrapper from '@/components/FlexxDashboardWrapper';
import TransactionsTable from '@/views/transactions/components/TransactionsTable';

const TransactionsPage = () => {
  return (
    <FlexxDashboardWrapper>
      <Typography variant='h4' sx={{fontWeight: 600}}>
        Transactions
      </Typography>
      <TransactionsTable />
    </FlexxDashboardWrapper>
  );
};

export default TransactionsPage
