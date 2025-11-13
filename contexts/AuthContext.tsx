import axios from 'axios';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import {
  createContext,
  ReactElement,
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
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
});

export const AuthProvider = ({
  children,
}: {
  children: ReactElement;
}): ReactElement => {
  const [isAuthenticatedState, setIsAuthenticatedState] = useState(() => {
    const accessToken = getCookie(accessTokenKey);
    const expiresIn = getCookie(expiresInKey);
    if (accessToken && expiresIn && new Date() <= new Date(expiresIn as string)) {
      return true;
    }
    return false;
  });

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
    <AuthContext.Provider value={{ isAuthenticated: isAuthenticatedState }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => useContext(AuthContext);
