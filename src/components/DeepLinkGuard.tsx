import { useEffect, useState } from "react";
import { useParams, Navigate, useLocation } from "react-router-dom";
import { db } from "../utils/firebase";
import { doc, getDoc } from "firebase/firestore";
import LoadingState from "./LoadingState";

export default function DeepLinkGuard({ children }) {
  const { tenant, id } = useParams();
  const location = useLocation();

  const [valid, setValid] = useState(null);

  useEffect(() => {
    async function validate() {
      // Validate tenant
      const tenantRef = doc(db, "tenants", tenant);
      const tenantSnap = await getDoc(tenantRef);

      if (!tenantSnap.exists()) {
        setValid(false);
        return;
      }

      // Validate tournament detail deep link
      if (location.pathname.includes("/tournaments/") && id) {
        const tRef = doc(db, "tenants", tenant, "tournaments", id);
        const tSnap = await getDoc(tRef);

        if (!tSnap.exists()) {
          setValid(false);
          return;
        }
      }

      setValid(true);
    }

    validate();
  }, [tenant, id, location.pathname]);

  if (valid === null) return <LoadingState message="Validating link..." />;
  if (valid === false) return <Navigate to="/select" replace />;

  return children;
}