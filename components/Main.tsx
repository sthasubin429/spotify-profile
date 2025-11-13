import React, { ReactElement, useEffect } from 'react';
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
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (params) {
      const expirationTimeStamp = new Date(new Date().getTime() + 3600 * 1000);
      setCookie(expiresInKey, expirationTimeStamp);
      setCookie(accessTokenKey, params.access_token || '');
      setCookie(refreshTokenKey, params.refresh_token || '');
    }
  }, [params]);

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/profile');
    }
  }, [isAuthenticated, router]);

  return <>{!isAuthenticated && <Login />}</>;
}
