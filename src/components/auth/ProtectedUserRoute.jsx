import useAuthStore from "../../hooks/useAuthStore";
import { Navigate } from "react-router";

export default function ProtectedUserRoute({ children }) {
  const { isAuthenticated: hasPermission, isAdmin } = useAuthStore();

  return isAdmin ? <Navigate to="/admin" /> : hasPermission ? <>{children}</> : <Navigate to="/" />;
}
