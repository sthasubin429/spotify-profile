import React, { ReactElement, useEffect } from 'react';
import Login from './Login';
import Profile from './Profile';
import RecentTracks from './Track/RecentTracks';
import { setAccessToken, setRefreshToken } from 'utils/spotify';
import useUrlParams from 'hooks/useUrlParams';
import useAuthenticated from 'hooks/useAuthenticated';
import ProfileLayout from 'layouts/ProfileLayout';

export default function Home(): ReactElement {
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
        <>
          <ProfileLayout>
            <>
              <Profile />
              <RecentTracks />
            </>
          </ProfileLayout>
        </>
      ) : (
        <Login />
      )}
    </>
  );
}
