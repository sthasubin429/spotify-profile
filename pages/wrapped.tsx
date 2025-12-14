import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext';
import WrappedContainer from '../components/wrapped/WrappedContainer';

function WrappedPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  if (!isAuthenticated) {
    if (typeof window !== 'undefined') {
      router.push('/');
    }
    return null;
  }

  return <WrappedContainer />;
}

export default dynamic(() => Promise.resolve(WrappedPage), { ssr: false });
