import React, { ReactElement, useEffect, useRef } from 'react';
import Login from './Login';
import useUrlParams from 'hooks/useUrlParams';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/router';
import { setCookie } from 'cookies-next';
import {
  accessTokenKey,
  expiresInKey,
  refreshTokenKey
} from '../utils/constant';

export default function Main(): ReactElement {
  const params = useUrlParams();
  const router = useRouter();
  const { isAuthenticated, setAuthenticated } = useAuth();
  const hasProcessedTokens = useRef(false);

  useEffect(() => {
    if (params && params.access_token && !hasProcessedTokens.current) {
      hasProcessedTokens.current = true;
      const expirationTimeStamp = new Date(new Date().getTime() + 3600 * 1000);
      setCookie(expiresInKey, expirationTimeStamp);
      setCookie(accessTokenKey, params.access_token);
      setCookie(refreshTokenKey, params.refresh_token || '');
      setAuthenticated(true);
      router.push('/profile');
    }
  }, [params, setAuthenticated, router]);

  // Only redirect if already authenticated and on home page (no token params)
  useEffect(() => {
    if (isAuthenticated && !params?.access_token) {
      router.push('/profile');
    }
  }, [isAuthenticated, params, router]);

  return <>{!isAuthenticated && <Login />}</>;
}
