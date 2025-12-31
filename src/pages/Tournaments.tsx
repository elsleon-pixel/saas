import { useTournaments } from "../hooks/useTournaments";
import { TournamentCard } from "../components/TournamentCard";
import { Leaderboard } from "../components/Leaderboard";
import { LobbyStatus } from "../components/LobbyStatus";

export default function Tournaments() {
  const { tournaments, featured, loading, error } = useTournaments();

  if (loading) {
    return <p style={{ color: "#e5e7eb" }}>Loading tournaments…</p>;
  }

  if (error) {
    return <p style={{ color: "#f87171" }}>{error}</p>;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <header>
        <h1 style={{ margin: 0, color: "#f9fafb", fontSize: 24 }}>Tournaments</h1>
        <p style={{ margin: 0, marginTop: 4, color: "#9ca3af", fontSize: 14 }}>
          Track live events, upcoming tournaments, and player standings in one place.
        </p>
      </header>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 2.5fr) minmax(0, 1.2fr)",
          gap: 24,
          alignItems: "flex-start"
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {featured.length > 0 && (
            <section style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <h2 style={{ margin: 0, color: "#e5e7eb", fontSize: 16 }}>Featured</h2>
              {featured.map(t => (
                <TournamentCard key={t.id} tournament={t} />
              ))}
            </section>
          )}

          <section style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <h2 style={{ margin: 0, color: "#e5e7eb", fontSize: 16 }}>All tournaments</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {tournaments.map(t => (
                <TournamentCard key={t.id} tournament={t} />
              ))}
            </div>
          </section>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <LobbyStatus tournaments={tournaments} />
          <Leaderboard />
        </div>
      </div>
    </div>
  );
}