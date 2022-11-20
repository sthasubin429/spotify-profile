import React, { useEffect } from 'react';
import { setAccessToken, setRefreshToken } from 'utils/spotify';
import useUrlParams from 'hooks/useUrlParams';
import useAuthenticated from 'hooks/useAuthenticated';

const HomePage: React.FC = () => {
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
        <div className="text-base">Logged </div>
      ) : (
        <div className="text-base font-bold"> Hello</div>
      )}
    </>
  );
};

export default HomePage;
