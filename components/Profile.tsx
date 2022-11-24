import React, { ReactElement, useEffect, useState } from 'react';
import { User } from 'shared/interface';
import { getCurrentUser } from 'spotify/users';

export default function Profile(): ReactElement {
  const [CurrentUser, setCurrentUser] = useState({} as User);
  useEffect(() => {
    getCurrentUser().then((data: User) => {
      setCurrentUser(data);
    });
  }, []);

  return (
    <>
      <div> Profile </div>
      <div> {CurrentUser.display_name}</div>
      <div> {CurrentUser.email}</div>
    </>
  );
}
