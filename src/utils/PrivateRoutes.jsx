import { Navigate, Outlet } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";
const PrivateRoutes = () => {
  const [isLoggedIn] = useLocalStorage("isLoggedIn", false);
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
