import { Navigate } from "react-router-dom";
import { isValidToken } from "@/utils/jwt";

export const AuthGuardRoutes = ({ children }) => {
  const token = localStorage.getItem("@access_token");
  if (!token) return <Navigate to="/" />;

  const isValid = isValidToken(token);
  return isValid ? children : <Navigate to="/" />;
};