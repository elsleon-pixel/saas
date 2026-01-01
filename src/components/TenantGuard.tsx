import { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { db } from "../utils/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useTenant } from "../context/TenantContext";
import LoadingState from "./LoadingState";

export default function TenantGuard({ children }) {
  const { tenant: currentTenant, setTenant } = useTenant();
  const { tenant } = useParams();

  const [valid, setValid] = useState(null);

  useEffect(() => {
    async function validate() {
      if (!tenant) {
        setValid(false);
        return;
      }

      const ref = doc(db, "tenants", tenant);
      const snap = await getDoc(ref);

      if (!snap.exists()) {
        setValid(false);
        return;
      }

      // Update context if tenant changed
      if (currentTenant !== tenant) {
        setTenant(tenant);
      }

      setValid(true);
    }

    validate();
  }, [tenant]);

  if (valid === null) return <LoadingState message="Loading tenant..." />;
  if (valid === false) return <Navigate to="/select" replace />;

  return children;
}