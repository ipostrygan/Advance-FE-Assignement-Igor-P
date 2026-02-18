import CreateAccountForm from '@views/accounts/components/CreateAccountForm';
import { useDrawer } from './useDrawer';

export const useCreateAccount = () => {
  return useDrawer(close => <CreateAccountForm actionOnSubmit={close} />);
};
