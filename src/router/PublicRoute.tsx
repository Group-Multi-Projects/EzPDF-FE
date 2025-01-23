import { ComponentType } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

interface PublicRouteProps {
  component: ComponentType;
}
const PublicRoute: React.FC<PublicRouteProps> = ({
  component: Component,
}) => {
  const {isAuthenticated} = useSelector((state:RootState)=>state.auth)
  return isAuthenticated === false ? <Component /> : <Navigate to="/home" replace />;
};
export default PublicRoute;