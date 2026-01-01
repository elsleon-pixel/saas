import { createContext, useContext, useEffect, useState } from "react";
import { saveLastTenant, loadLastTenant } from "../services/sessionRecoveryService";

const TenantContext = createContext(null);

export function TenantProvider({ children }) {
  const [tenant, setTenant] = useState(loadLastTenant());

  useEffect(() => {
    if (tenant) {
      saveLastTenant(tenant);
    }
  }, [tenant]);

  return (
    <TenantContext.Provider value={{ tenant, setTenant }}>
      {children}
    </TenantContext.Provider>
  );
}

export function useTenant() {
  return useContext(TenantContext);
}