import React from 'react';

import {Stack} from '@mui/material';
import AdvanceActionButtons from '@components/AdvanceActionButtons/AdvanceActionButtons';
import {ActionButtonConfig} from '@components/AdvanceActionButtons/types';
import { useMoveMoneyDrawer } from '../hooks/useMoveMoneyDrawer';
import useCreateAccountDrawer from '../hooks/useCreateAccountDrawer';

const AccountsCtas: React.FC = () => {
  const { openDrawer: openCreateAccountDrawer, Drawer: CreateAccountDrawer } = useCreateAccountDrawer();
  const { openDrawer: openMoveMoneyDrawer, Drawer: MoveMoneyDrawer } = useMoveMoneyDrawer()

  const actions: ActionButtonConfig[] = [
    {
      name: 'Add Account',
      variant: 'outlined',
      onClick: openCreateAccountDrawer,
      startIcon: 'fluent--add-circle-20-regular',
    },
    {
      name: 'Move Money',
      variant: 'outlined',
      onClick: openMoveMoneyDrawer,
      startIcon: 'fluent--arrow-swap-20-regular',
    },
  ];

  return (
    <>
      <Stack direction='row' gap={'1rem'} alignItems={'center'}>
        <AdvanceActionButtons actions={actions} />
      </Stack>
      {CreateAccountDrawer}
      {MoveMoneyDrawer}
    </>
  );
};
export default AccountsCtas;
