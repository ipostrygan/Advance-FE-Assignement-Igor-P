import {useQuery} from 'react-query';

import {QueryClientIds} from '@/QueryClient/queryClient.ids';
import flexxApiService from '@/flexxApi/flexxApiService';
import { type Transaction } from '@/domain/Transaction';

interface UseFetchTransactionsArgs {
  searchQuery?: string;
}

const useFetchTransactions = ({searchQuery}: UseFetchTransactionsArgs) => {
  return useQuery<Transaction[]>(
    [QueryClientIds.TRANSACTIONS, searchQuery],
    () => flexxApiService().fetchTransactions({search_term: searchQuery}),
  );
};

export default useFetchTransactions;
