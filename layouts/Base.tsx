import React, { ReactElement } from 'react';
import Sidebar from '../components/Sidebar';

interface BaseLayoutProps {
  children: ReactElement;
  isAuthenticated: boolean;
}

const Base = ({ children, isAuthenticated }: BaseLayoutProps): ReactElement => {
  return (
    <div className="flex w-full min-h-screen">
      {isAuthenticated && <Sidebar />}
      <main
        className={`flex-grow pt-16 md:pt-0 ${
          isAuthenticated ? 'md:ml-64' : ''
        }`}
      >
        {children}
      </main>
    </div>
  );
};

export default Base;
