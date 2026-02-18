import { useMutation, useQueryClient } from 'react-query';

import { QueryClientIds } from '@/QueryClient/queryClient.ids';
import flexxApiService from '@/flexxApi/flexxApiService';

const useCreateAccount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['create-account'],
    mutationFn: flexxApiService().createAccount,
    onSuccess: () => {
      queryClient.invalidateQueries([QueryClientIds.ACCOUNTS]);
    },
  });
};

export default useCreateAccount;
