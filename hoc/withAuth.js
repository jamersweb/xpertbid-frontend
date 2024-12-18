import { useEffect } from 'react';
import { useRouter } from 'next/router';
import api from '../utils/api';

export default function withAuth(Component) {
  return function ProtectedRoute(props) {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
      } else {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }
    }, []);

    return <Component {...props} />;
  };
}
