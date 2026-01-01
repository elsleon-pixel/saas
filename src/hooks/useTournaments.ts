import { useContext } from "react";
import { TournamentContext } from "../context/TournamentContext";
import { useTenant } from "../context/TenantContext";

export function useTournaments() {
  const ctx = useContext(TournamentContext);
  const { tenant } = useTenant();

  if (!ctx) {
    throw new Error("useTournaments must be used within a TournamentProvider");
  }

  if (!tenant) {
    throw new Error("useTournaments requires a valid tenant from TenantProvider");
  }

  return {
    ...ctx,
    tenant
  };
}