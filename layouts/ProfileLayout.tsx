import React, { ReactElement } from 'react';
import Navbar from 'components/Navbar';

export default function ProfileLayout({
  children
}: {
  children: ReactElement;
}): ReactElement {
  return (
    <div className="relative">
      <Navbar />
      <div className="pl-64"> {children} </div>
    </div>
  );
}
