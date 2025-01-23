import { ComponentType } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

interface PrivateRoutersProps {
  component: ComponentType;
}
const PrivateRouters: React.FC<PrivateRoutersProps> = ({
  component: Component,
}) => {
  const {isAuthenticated} = useSelector((state:RootState)=>state.auth)
  return isAuthenticated === true ? <Component /> : <Navigate to="/" replace />;
};
export default PrivateRouters;