import { useAuth } from "../context/AuthContext.jsx";
import { Navigate } from "react-router-dom";

export default function RequireRole({ role, children }) {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (!user) return <Navigate to="/login" />;

  if (user.role !== role) {
    return <Navigate to="/dashboard" />;
  }

  return children;
}