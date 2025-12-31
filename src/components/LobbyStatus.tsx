import { Tournament } from "../data/mockTournaments";

interface LobbyStatusProps {
  tournaments: Tournament[];
}

export function LobbyStatus({ tournaments }: LobbyStatusProps) {
  const running = tournaments.filter(t => t.status === "running" || t.status === "late_reg");
  const upcoming = tournaments.filter(t => t.status === "upcoming");

  return (
    <div
      style={{
        background: "#020617",
        borderRadius: 12,
        border: "1px solid #1f2937",
        padding: 16,
        display: "flex",
        flexDirection: "column",
        gap: 8,
        color: "#e5e7eb"
      }}
    >
      <h3 style={{ margin: 0, fontSize: 16 }}>Lobby status</h3>
      <p style={{ margin: 0, fontSize: 12, color: "#9ca3af" }}>
        {running.length} live / late‑reg tournaments, {upcoming.length} upcoming.
      </p>
    </div>
  );
}