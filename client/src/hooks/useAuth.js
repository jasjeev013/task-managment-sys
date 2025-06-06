// src/hooks/useAuth.js
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getMe } from '../features/auth/authThunks';

const useAuth = () => {
  const dispatch = useDispatch();
  const { user, token, isLoading, isError, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    // Only try to get user if we have a token but no user data
    // And only if we're not already loading
    if (token && !user && !isLoading) {
      dispatch(getMe());
    }
  }, [token, user, isLoading, dispatch]);

  const isAdmin = user?.role === 'admin';



  return {
    user,
    token,
    isLoading,
    isError,
    message,
    isAdmin,
  };
};

export default useAuth;