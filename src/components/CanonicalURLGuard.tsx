import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function CanonicalURLGuard({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    let path = location.pathname;

    // Normalize slashes
    path = path.replace(/\/+/g, "/");

    // Remove trailing slash (except root)
    if (path.length > 1 && path.endsWith("/")) {
      path = path.slice(0, -1);
    }

    // Normalize tenant slug
    if (params.tenant) {
      const lower = params.tenant.toLowerCase();
      path = path.replace(params.tenant, lower);
    }

    // Normalize tournament ID
    if (params.id) {
      const lower = params.id.toLowerCase();
      path = path.replace(params.id, lower);
    }

    // If anything changed, redirect
    if (path !== location.pathname) {
      navigate(path, { replace: true });
    }
  }, [location.pathname, params.tenant, params.id]);

  return children;
}