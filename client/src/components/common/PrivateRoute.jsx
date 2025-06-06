import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import Loading from './Loading';

const PrivateRoute = ({ adminOnly = false }) => {
  const location = useLocation();
  const { user, token, isLoading, isAdmin } = useSelector((state) => state.auth);

  if (isLoading) {
    return <Loading />;
  }

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;