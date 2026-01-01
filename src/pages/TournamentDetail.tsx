import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTenant } from "../context/TenantContext";
import { useTheme } from "../context/ThemeContext";
import { getTournamentById } from "../services/tournamentService";
import LoadingState from "../components/LoadingState";
import EmptyState from "../components/EmptyState";
import ErrorState from "../components/ErrorState";
import StatusBadge from "../components/StatusBadge";

export default function TournamentDetail() {
  const { tenant } = useTenant();
  const { theme } = useTheme();
  const { id } = useParams();

  const [tournament, setTournament] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await getTournamentById(tenant, id);
        if (!data) {
          setError("Tournament not found.");
        } else {
          setTournament(data);
        }
      } catch (err) {
        setError("Failed to load tournament.");
      }
      setLoading(false);
    }

    if (tenant && id) load();
  }, [tenant, id]);

  if (loading) return <LoadingState message="Loading tournament..." />;
  if (error) return <ErrorState message={error} />;
  if (!tournament) return <EmptyState message="Tournament not found." />;

  const start = tournament.startDate
    ? new Date(tournament.startDate).toLocaleDateString()
    : "N/A";

  const end = tournament.endDate
    ? new Date(tournament.endDate).toLocaleDateString()
    : "N/A";

  return (
    <div style={{ color: theme.textColor }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
        <h1 style={{ fontSize: 28, margin: 0 }}>
          {tournament.name || "Untitled Tournament"}
        </h1>
        <StatusBadge status={tournament.status} />
      </div>

      <div style={{ marginBottom: 20, color: "#9ca3af" }}>
        <div>Start: {start}</div>
        <div>End: {end}</div>
      </div>

      {tournament.description && (
        <p style={{ lineHeight: 1.6, maxWidth: 700 }}>
          {tournament.description}
        </p>
      )}
    </div>
  );
}