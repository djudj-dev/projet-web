import {
    QueryClient,
    QueryClientProvider,
} from 'react-query'

const querryClientSignleton = () => {
    let queryClient;

    if (!queryClient) {
        queryClient = new QueryClient();
    }
  return queryClient;
}

export const ReactQueryProvider = ({ children }) => (
    <QueryClientProvider client={querryClientSignleton()}>
        {children}
    </QueryClientProvider>
)