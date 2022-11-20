import { ReactElement, useEffect, useState } from 'react';
import useUrlParams from '../hooks/useUrlParams';
import { setAccessToken, setRefreshToken } from '../utils/spotify';
import useAuthenticated from '../hooks/useAuthenticated';

export default function Home(): ReactElement {
  const params = useUrlParams();

  const isAuthenticated = useAuthenticated();
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    setAuthenticated(isAuthenticated);
  }, [isAuthenticated]);

  useEffect(() => {
    if (params) {
      setAccessToken(params.access_token || '');
      setRefreshToken(params.refresh_token || '');
    }
  }, [params]);

  return (
    <>
      {authenticated ? (
        <div className="text-base">Logged </div>
      ) : (
        <div className="text-base font-bold"> Hello</div>
      )}
    </>
  );
}
