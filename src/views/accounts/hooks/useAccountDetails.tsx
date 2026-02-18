import { Account } from '@/domain/Account';
import AccountDetails from '../components/AccountDetails';
import { useDrawer } from './useDrawer';
import { useState } from 'react';

const useAccountDetails = (account: Account | undefined) => {
  const [isMoveMoneyFormShown, setIsMoveMoneyFormShown] = useState(false)
  return useDrawer(() => 
    <AccountDetails account={account} onFormVisible={setIsMoveMoneyFormShown} />, 
    isMoveMoneyFormShown ? 'xl': 'lg'
  );
}

export default useAccountDetails
