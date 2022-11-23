import React, { ReactElement } from 'react';

const Base = ({ children }: { children: ReactElement }): ReactElement => {
  return (
    <>
      <div className="w-full min-h-screen"> {children} </div>
    </>
  );
};

export default Base;
