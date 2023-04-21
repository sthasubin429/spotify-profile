import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';
import { deleteAllCookies } from 'utils/spotify';

export default function Logout(): ReactElement {
  const router = useRouter();
  const logout = (): void => {
    deleteAllCookies();
    router.push('/');
    window.location.replace('/');
  };

  return (
    <>
      <button onClick={logout}>Logout</button>
    </>
  );
}
