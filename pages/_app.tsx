import { NextComponentType } from 'next';
import {
  GetNextPageParamFunction,
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import { GlobalStyle } from '../styles/globalStyles';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function MyApp({
  Component,
  pageProps,
}: {
  Component: NextComponentType;
  pageProps: any;
}) {
  return (
    <div style={{ maxWidth: '960px', margin: '0 auto' }}>
      <QueryClientProvider client={queryClient}>
        <GlobalStyle />
        <Component {...pageProps} />
      </QueryClientProvider>
    </div>
  );
}

export default MyApp;
