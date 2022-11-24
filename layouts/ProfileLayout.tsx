import React, { ReactElement } from 'react';

export default function ProfileLayout({
  children
}: {
  children: ReactElement;
}): ReactElement {
  return (
    <>
      <div> {children} </div>
    </>
  );
}
