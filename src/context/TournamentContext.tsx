import { createContext, useEffect, useState, ReactNode } from "react";
import { mockTournaments, Tournament } from "../data/mockTournaments";
import { useTenant } from "../context/TenantContext";

interface TournamentContextValue {
  tournaments: Tournament[];
  featured: Tournament[];
  loading: boolean;
  error: string | null;
}

export const TournamentContext = createContext<TournamentContextValue | undefined>(undefined);

interface TournamentProviderProps {
  children: ReactNode;
}

export function TournamentProvider({ children }: TournamentProviderProps) {
  const { tenant } = useTenant();

  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!tenant) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Mocked data for now; later this is where Firebase will plug in
      const tenantSpecific = mockTournaments.filter(t => t.tenant === tenant);

      setTournaments(tenantSpecific);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to load tournaments.");
      setLoading(false);
    }
  }, [tenant]);

  const featured = tournaments.filter(t => t.isFeatured);

  const value: TournamentContextValue = {
    tournaments,
    featured,
    loading,
    error
  };

  return <TournamentContext.Provider value={value}>{children}</TournamentContext.Provider>;
}