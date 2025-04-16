import useAuthStore from "../../hooks/useAuthStore";
import { Navigate } from "react-router";

export default function ProtectedAdminRoute({ children }) {
  const { isAuthenticated: isUser, isAdmin } = useAuthStore();

  const hasPermission = isUser && isAdmin;

  return hasPermission ? <>{children}</> : isUser ? <Navigate to="/user" /> : <Navigate to="/" />;
}
