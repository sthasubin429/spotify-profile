import Head from 'next/head';
import Image from 'next/image';
import useUrlParams from '../hooks/useUrlParams';
import { useEffect, useState } from 'react';
import { setAccessToken, setRefreshToken } from '../utils/spotify';
import useAuthenticated from '../hooks/useAuthenticated';

export default function Home() {
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

  return authenticated ? 'Logged' : 'Hello';
}
