import React, { ReactElement } from 'react';

const Base = ({ children }: { children: ReactElement }): ReactElement => {
  return (
    <>
      <div className="container min-h-screen bg-black"> {children} </div>
    </>
  );
};

export default Base;
