import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { accessTokenKey } from '../utils/constant';
import {
  getAccessToken,
  getRefreshToken,
  isAuthenticated,
  setAccessToken
} from '../utils/spotify';

export default function useAuthenticated(): boolean {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(isAuthenticated());

  useEffect(() => {
    let authToken = getAccessToken();
    let refreshToken = getRefreshToken();
    if (!authenticated && authToken && refreshToken) {
      axios
        .get(`api/refresh_token?refresh_token=${refreshToken}`)
        .then(res => {
          const { data } = res;
          setAccessToken(data[accessTokenKey]);
          setAuthenticated(true);
        })
        .catch(() => {
          setAuthenticated(false);
        })
        .finally(() => {
          router.reload();
        });
    }
  }, [authenticated, router]);

  return authenticated;
}
