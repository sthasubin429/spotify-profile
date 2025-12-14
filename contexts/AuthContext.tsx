import axios from 'axios';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import {
  createContext,
  ReactElement,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react';
import {
  accessTokenKey,
  expiresInKey,
  refreshTokenKey
} from '../utils/constant';

interface AuthContextType {
  isAuthenticated: boolean;
  logout: () => void;
  setAuthenticated: (value: boolean) => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  logout: () => {},
  setAuthenticated: () => {}
});

export const AuthProvider = ({
  children
}: {
  children: ReactElement;
}): ReactElement => {
  const [isAuthenticatedState, setIsAuthenticatedState] = useState(() => {
    const accessToken = getCookie(accessTokenKey);
    const expiresIn = getCookie(expiresInKey);
    if (
      accessToken &&
      expiresIn &&
      new Date() <= new Date(expiresIn as string)
    ) {
      return true;
    }
    return false;
  });

  const logout = useCallback(() => {
    deleteCookie(accessTokenKey);
    deleteCookie(refreshTokenKey);
    deleteCookie(expiresInKey);
    setIsAuthenticatedState(false);
  }, []);

  const setAuthenticated = useCallback((value: boolean) => {
    setIsAuthenticatedState(value);
  }, []);

  useEffect(() => {
    const authToken = getCookie(accessTokenKey);
    const refreshToken = getCookie(refreshTokenKey);

    if (!isAuthenticatedState && authToken && refreshToken) {
      axios
        .get(`/api/refresh_token?refresh_token=${refreshToken}`)
        .then(res => {
          const { data } = res;
          const expirationTimeStamp = new Date(
            new Date().getTime() + 3600 * 1000
          );
          setCookie(expiresInKey, expirationTimeStamp);
          setCookie(accessTokenKey, data[accessTokenKey]);
          setIsAuthenticatedState(true);
        })
        .catch(() => {
          deleteCookie(accessTokenKey);
          deleteCookie(refreshTokenKey);
          setIsAuthenticatedState(false);
        });
    }
  }, [isAuthenticatedState]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: isAuthenticatedState,
        logout,
        setAuthenticated
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => useContext(AuthContext);
