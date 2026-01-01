import { useEffect, useState } from "react";
import { useTenant } from "../context/TenantContext";
import { useTheme } from "../context/ThemeContext";
import { useOffline } from "../context/OfflineContext";
import { getTournaments } from "../services/tournamentService";
import { saveTournamentCache, loadTournamentCache } from "../services/offlineCacheService";
import EmptyState from "../components/EmptyState";
import ErrorState from "../components/ErrorState";
import TournamentCard from "../components/TournamentCard";
import TournamentListSkeleton from "../components/skeletons/TournamentListSkeleton";

export default function Tournaments() {
  const { tenant } = useTenant();
  const { theme } = useTheme();
  const { isOffline } = useOffline();

  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error] = useState(null);

  useEffect(() => {
    async function load() {
      if (isOffline) {
        const cached = loadTournamentCache(tenant);
        if (cached) {
          setTournaments(cached);
          setLoading(false);
          return;
        }
      }

      try {
        const data = await getTournaments(tenant);
        setTournaments(data);
        saveTournamentCache(tenant, data);
      } catch (err) {
        console.error(err);
      }

      setLoading(false);
    }

    if (tenant) load();
  }, [tenant, isOffline]);

  if (loading) return <TournamentListSkeleton />;
  if (error) return <ErrorState message="Failed to load tournaments." />;
  if (tournaments.length === 0) return <EmptyState message="No tournaments yet." />;

  return (
    <div style={{ color: theme.textColor }}>
      <h1 style={{ fontSize: 28, marginBottom: 20 }}>Tournaments</h1>

      <ul style={{ paddingLeft: 0, listStyle: "none" }}>
        {tournaments.map(t => (
          <TournamentCard
            key={t.id}
            tournament={t}
            tenant={tenant}
            showAdminActions={false}
          />
        ))}
      </ul>
    </div>
  );
}