import { useMutation, useQueryClient } from 'react-query';

import { Transaction } from '@/domain/Transaction';
import { QueryClientIds } from '@/QueryClient/queryClient.ids';
import flexxApiService from '@/flexxApi/flexxApiService';

const useMoveMoney = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['move-money'],
    mutationFn: flexxApiService().moveMoney,
    onSuccess: () => {
      queryClient.invalidateQueries([QueryClientIds.TRANSACTIONS]);
    },
  });
};

export default useMoveMoney;
