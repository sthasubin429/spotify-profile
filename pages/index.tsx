import dynamic from 'next/dynamic';
import React from 'react';

const HomePage = dynamic(() => import('components/Home'), {
  ssr: false
});

const Home: React.FC = () => {
  return <HomePage />;
};

export default Home;
