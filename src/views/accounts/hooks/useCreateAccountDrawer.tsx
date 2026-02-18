import CreateAccountForm from '@views/accounts/components/CreateAccountForm';
import { useDrawer } from './useDrawer';

const useCreateAccountDrawer = () => {
  return useDrawer(close => <CreateAccountForm actionOnSubmit={close} />);
};

export default useCreateAccountDrawer
