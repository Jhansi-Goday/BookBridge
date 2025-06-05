import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ReactNode } from 'react';
import { UserType } from '../utils/types';

interface ProtectedRouteProps {
  children: ReactNode;
  userType?: UserType;
}

const ProtectedRoute = ({ children, userType }: ProtectedRouteProps) => {
  const { isAuthenticated, userType: currentUserType } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  // If a specific userType is required, check if the current user has that type
  if (userType && currentUserType !== userType) {
    return <Navigate to="/\" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;