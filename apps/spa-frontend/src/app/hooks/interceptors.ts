import axios from 'axios';
import { useContext, useMemo, useEffect } from 'react';

export function useInterceptors() {
  const { dispatch } = useContext(AppContext);

  const interceptors = useMemo(() => {
    const request = axios.interceptors.request.use(
      (config) => {
        dispatch({ type: 'SET_LOADING', payload: true });
        return config;
      },
      (error) => {
        dispatch({ type: 'SET_LOADING', payload: false });
        return Promise.reject(error);
      }
    );

    const response = axios.interceptors.response.use(
      (response) => {
        dispatch({ type: 'SET_LOADING', payload: false });
        return response;
      },
      (error) => {
        dispatch({ type: 'SET_LOADING', payload: false });
        return Promise.reject(error);
      }
    );

    return { request, response };
  }, [dispatch]);

  useEffect(() => {
    return () => {
      axios.interceptors.request.eject(interceptors.request);
      axios.interceptors.response.eject(interceptors.response);
    };
  }, [interceptors]);

  return null;
}
