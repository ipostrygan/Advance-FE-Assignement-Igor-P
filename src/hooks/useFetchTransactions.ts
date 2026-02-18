import {useQuery} from 'react-query';

import {QueryClientIds} from '@/QueryClient/queryClient.ids';
import flexxApiService from '@/flexxApi/flexxApiService';
import { type Transaction } from '@/domain/Transaction';

interface UseFetchTransactionsArgs {
  searchQuery?: string;
  accountId?: string;
}

const useFetchTransactions = ({ accountId, searchQuery }: UseFetchTransactionsArgs) => {
  return useQuery<Transaction[]>(
    [QueryClientIds.TRANSACTIONS, accountId, searchQuery],
    () => flexxApiService().fetchTransactions({
      search_term: searchQuery,
      account_id: accountId
    }),
  );
};

export default useFetchTransactions;
