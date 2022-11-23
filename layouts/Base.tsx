import React, { ReactElement } from 'react';

const Base = ({ children }: { children: ReactElement }): ReactElement => {
  return (
    <>
      <div className="same-thing">{children}</div>
      <div className="same-thing">{children}</div>
      <div className="same-thing">{children}</div>
    </>
  );
};

export default Base;
