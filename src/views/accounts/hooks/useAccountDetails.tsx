import { Account } from '@/domain/Account';
import AccountDetails from '../components/AccountDetails';
import { useDrawer } from './useDrawer';

const useAccountDetails = (account: Account | undefined) => {
  return useDrawer(() => <AccountDetails account={account} />, 'lg');
}

export default useAccountDetails
