import { useState, useContext, useCallback, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { ProductsContext } from '../../context'
export const useAsync = () => {
  const history = useHistory();
  const context = useContext(ProductsContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const activeHttpRequests = useRef([]);

  const sendRequest = useCallback(
    async (url, method = 'GET', body = null, headers = {}) => {
      const httpAbortCtrl = new AbortController();
      activeHttpRequests.current.push(httpAbortCtrl)
      setIsLoading(true);
      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
          signal: httpAbortCtrl.signal
        });

        const responseData = await response.json();

        activeHttpRequests.current = activeHttpRequests.current.filter(el => el !== httpAbortCtrl);

        // if response has a 400ish/500ish response code, then handle that error
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        setIsLoading(false);
        history.push('/');
        context.toggleSignedInHandler(responseData)
        return responseData;
      } catch (error) {
        setIsLoading(false);
        setError(error);
        context.setErrorHandler(error || 'Something went wrong, please try again');
        context.toggleErrorModalHandler();
        throw error;
      }
    }, []);

  useEffect(() => {
    return () => {
      activeHttpRequests.current.forEach(el => el.abort())
    }
  }, []);

  return { isLoading, error, sendRequest };
}