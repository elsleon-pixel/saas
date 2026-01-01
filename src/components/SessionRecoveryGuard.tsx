import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { loadLastTenant, loadLastPage } from "../services/sessionRecoveryService";
import LoadingState from "./LoadingState";

export default function SessionRecoveryGuard({ children }) {
  const { tenant } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [ready, setReady] = useState(false);

  useEffect(() => {
    async function recover() {
      const lastTenant = loadLastTenant();
      const lastPage = loadLastPage();

      // If tenant missing but we have a last tenant → restore
      if (!tenant && lastTenant) {
        navigate(`/${lastTenant}`, { replace: true });
        return;
      }

      // If tenant exists but page is root AND we have lastPage → restore
      if (tenant && location.pathname === `/${tenant}` && lastPage) {
        navigate(lastPage, { replace: true });
        return;
      }

      setReady(true);
    }

    recover();
  }, [tenant, location.pathname]);

  if (!ready) return <LoadingState message="Restoring session..." />;

  return children;
}