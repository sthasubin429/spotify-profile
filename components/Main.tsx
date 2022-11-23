import React, { ReactElement, useEffect } from 'react';
import Login from './Login';
import { setAccessToken, setRefreshToken } from 'utils/spotify';
import useUrlParams from 'hooks/useUrlParams';
import useAuthenticated from 'hooks/useAuthenticated';

export default function Main(): ReactElement {
  const params = useUrlParams();

  const isAuthenticated = useAuthenticated();

  useEffect(() => {
    if (params) {
      setAccessToken(params.access_token || '');
      setRefreshToken(params.refresh_token || '');
    }
  }, [params]);

  return (
    <>
      {isAuthenticated ? (
        <div className="text-base font-bold"> Logged </div>
      ) : (
        <Login />
      )}
    </>
  );
}
