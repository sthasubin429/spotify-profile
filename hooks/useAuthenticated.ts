import axios from 'axios';
import { useEffect, useState } from 'react';
import { accessTokenKey } from '../utils/constant';
import {
  getAccessToken,
  getRefreshToken,
  isAuthenticated,
  setAccessToken
} from '../utils/spotify';

export default function useAuthenticated(): boolean {
  const [authenticated, setAuthenticated] = useState(isAuthenticated());

  useEffect(() => {
    const authToken = getAccessToken();
    const refreshToken = getRefreshToken();

    // Only refresh if we have tokens but aren't authenticated yet
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
        });
    }
  }, []); // Empty dependency array - run only once on mount

  return authenticated;
}
