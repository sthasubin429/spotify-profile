import React, { ReactElement, useEffect } from 'react';
import Login from './Login';
import Profile from './Profile';
import { setAccessToken, setRefreshToken } from 'utils/spotify';
import useUrlParams from 'hooks/useUrlParams';
import useAuthenticated from 'hooks/useAuthenticated';

export default function Home(): ReactElement {
  const params = useUrlParams();

  const isAuthenticated = useAuthenticated();

  useEffect(() => {
    if (params) {
      setAccessToken(params.access_token || '');
      setRefreshToken(params.refresh_token || '');
    }
  }, [params]);

  return <>{isAuthenticated ? <Profile /> : <Login />}</>;
}
