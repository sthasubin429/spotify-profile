import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ReactElement } from 'react';
import Base from '../layouts/Base';

export default function App({ Component, pageProps }: AppProps): ReactElement {
  return (
    <Base>
      <Component {...pageProps} />
    </Base>
  );
}
