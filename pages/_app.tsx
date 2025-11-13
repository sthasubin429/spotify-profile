import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ReactElement, useState } from 'react';
import Base from '../layouts/Base';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export default function App({ Component, pageProps }: AppProps): ReactElement {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Base>
        <Component {...pageProps} />
      </Base>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
