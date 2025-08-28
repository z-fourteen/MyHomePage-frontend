import { Navigate } from "react-router-dom";
import { ACCESS_TOKEN } from "../constants";

export default function ProtectedRoute({ children }) {
  const isAuthenticated = !!localStorage.getItem(ACCESS_TOKEN);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return children;
}