import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ReactElement, useState } from 'react';
import Base from '../layouts/Base';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AuthProvider, useAuth } from '../contexts/AuthContext';

function AppContent({ Component, pageProps }: AppProps) {
  const { isAuthenticated } = useAuth();
  return (
    <Base isAuthenticated={isAuthenticated}>
      <Component {...pageProps} />
    </Base>
  );
}

export default function App({
  Component,
  pageProps,
  router
}: AppProps): ReactElement {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppContent
          Component={Component}
          pageProps={pageProps}
          router={router}
        />
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
