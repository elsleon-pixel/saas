import { Navigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function RequireAuth({ children }: { children: JSX.Element }) {
  const { user, loading } = useAuth();
  const { tenant } = useParams();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    // Redirect to the tenant-specific login page
    return <Navigate to={`/${tenant}/login`} replace />;
  }

  return children;
}