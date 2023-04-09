import { useEffect, useState } from 'react';
import config from '../config';

export function useAuth() {
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(config.ApiHost + 'api/auth/check/');
        if (response.ok) {
          //const data = await response.json();
          setAuth(true);
        } else if (response.status === 401) {
          // Redirect to login page if not authenticated
          window.location.href = '/login/';
        } else {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return [auth, loading];
}
