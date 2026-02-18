import {useQuery} from 'react-query';

import {Account} from '@/domain/Account';
import {QueryClientIds} from '@/QueryClient/queryClient.ids';
import flexxApiService from '@/flexxApi/flexxApiService';

interface useFetchAccountsArgs {
  searchQuery?: string;
}

const useFetchAccounts = ({ searchQuery }: useFetchAccountsArgs) => {
  return useQuery<Account[]>([QueryClientIds.ACCOUNTS, searchQuery], () =>
    flexxApiService().fetchAccounts({search_term: searchQuery}),
  );
};

export default useFetchAccounts;
