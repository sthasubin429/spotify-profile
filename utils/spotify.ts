import { getCookie, setCookie } from 'cookies-next';
import { accessTokenKey, expiresInKey, refreshTokenKey } from './constant';

export const isAuthenticated = (): boolean => {
  const accessToken = getAccessToken();
  if (accessToken && new Date() <= getExpirationTimeStamp()) {
    return true;
  }
  return false;
};

export const getAccessToken = (): string => {
  return getCookie(accessTokenKey) as string;
};

export const getRefreshToken = (): string => {
  return getCookie(refreshTokenKey) as string;
};

export const getExpirationTimeStamp = (): Date => {
  let expiresIn = getCookie(expiresInKey) as string;
  return new Date(expiresIn);
};

export const setAccessToken = (accessToken: string): void => {
  const expirationTimeStamp = new Date(new Date().getTime() + 3600 * 1000);
  setCookie(expiresInKey, expirationTimeStamp);
  setCookie(accessTokenKey, accessToken);
};

export const setRefreshToken = (refreshToken: string): void => {
  setCookie(refreshTokenKey, refreshToken);
};
