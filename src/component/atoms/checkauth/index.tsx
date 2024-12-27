import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

interface CheckAuthProps {
  isAuthenticated: boolean;
  user: string | null;
  children: ReactNode;
}
function CheckAuth({ isAuthenticated, user, children }: CheckAuthProps) {
  
  const location = useLocation();
  if (location.pathname === "/") {
    if (!isAuthenticated || !user) {
      return <Navigate to="/client" />;
    } else {
      if (user) {
        return <Navigate to="/home" />;
      } else {
        return <Navigate to="/client" />;
      }
    }
  }
  
  return <>{children}</>;
}

export default CheckAuth;