import { useMutation, useQueryClient } from 'react-query';

import { Transaction } from '@/domain/Transaction';
import { QueryClientIds } from '@/QueryClient/queryClient.ids';
import flexxApiService from '@/flexxApi/flexxApiService';

export interface MoveMoneyPayload {
  source_account_id: string;
  destination_account_id: string;
  amount: string | number;
}

const useMoveMoney = () => {
  const queryClient = useQueryClient();

  return useMutation<Transaction, Error, MoveMoneyPayload>({
    mutationKey: ['move-money'],
    mutationFn: flexxApiService().moveMoney,
    onSuccess: () => {
      queryClient.invalidateQueries([QueryClientIds.TRANSACTIONS]);
    },
  });
};

export default useMoveMoney;
