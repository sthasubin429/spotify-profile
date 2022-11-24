import React, { ReactElement } from 'react';

export default function Base({
  children
}: {
  children: ReactElement;
}): ReactElement {
  return (
    <>
      <div className="w-full min-h-screen"> {children} </div>
    </>
  );
}
