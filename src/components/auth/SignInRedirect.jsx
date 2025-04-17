import useAuthStore from "../../hooks/useAuthStore";
import { Navigate } from "react-router";

export default function SignInRedirect({ children }) {
  const { isAuthenticated: isSignedIn, isAdmin } = useAuthStore();

  return isAdmin ? (
    <Navigate to="/admin" />
  ) : isSignedIn ? (
    <Navigate to="/user" />
  ) : (
    <>{children}</>
  );
}
