import dynamic from 'next/dynamic';
import React, { ReactElement } from 'react';

const Main = dynamic(() => import('components/Main'), { ssr: false });

export default function Home(): ReactElement {
  return <Main />;
}
