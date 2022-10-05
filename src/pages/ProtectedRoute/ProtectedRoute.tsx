import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { selectIsLoggedIn } from '../../features/auth/authSlice';
import { AppRoutes } from '../../helpers/routes';

export const ProtectedRoute = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  if (!isLoggedIn) return <Navigate to={AppRoutes.HOME} replace />;

  return <Outlet />;
};
