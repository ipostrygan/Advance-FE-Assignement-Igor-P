import {useQuery} from 'react-query';

import {Account} from '@/domain/Account';
import {QueryClientIds} from '@/QueryClient/queryClient.ids';
import flexxApiService from '@/flexxApi/flexxApiService';

interface useFetchAccountsArgs {
  searchQuery?: string;
  enabled?: boolean
}

const useFetchAccounts = ({ searchQuery, enabled = true }: useFetchAccountsArgs) => {
  return useQuery<Account[]>([QueryClientIds.ACCOUNTS, searchQuery], () =>
    flexxApiService().fetchAccounts({search_term: searchQuery}),
    {
      enabled
    }
  );
};

export default useFetchAccounts;
