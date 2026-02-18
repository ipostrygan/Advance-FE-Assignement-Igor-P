import { useQuery } from 'react-query';

import { Account } from '@/domain/Account';
import { QueryClientIds } from '@/QueryClient/queryClient.ids';
import flexxApiService from '@/flexxApi/flexxApiService';

const useAccount = (id: string | undefined) => {
  return useQuery<Account>(
    [QueryClientIds.ACCOUNT, id], 
    () => flexxApiService().fetchAccount(id!),
    { 
      enabled: !!id
    }
  );
};

export default useAccount
