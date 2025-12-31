import { Tournament } from "../data/mockTournaments";

interface TournamentCardProps {
  tournament: Tournament;
}

const statusColors: Record<Tournament["status"], string> = {
  upcoming: "#1e90ff",
  late_reg: "#ff8c00",
  running: "#32cd32",
  paused: "#ffd700",
  completed: "#888888"
};

export function TournamentCard({ tournament }: TournamentCardProps) {
  const {
    name,
    venue,
    buyIn,
    rake,
    startingStack,
    levelDurationMinutes,
    maxPlayers,
    registeredPlayers,
    date,
    status
  } = tournament;

  const statusColor = statusColors[status];

  return (
    <div
      style={{
        background: "#111827",
        borderRadius: 12,
        padding: 16,
        border: "1px solid #1f2937",
        boxShadow: "0 8px 20px rgba(0,0,0,0.4)",
        display: "flex",
        flexDirection: "column",
        gap: 8
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
        <div>
          <h3 style={{ margin: 0, color: "#f9fafb", fontSize: 18 }}>{name}</h3>
          <p style={{ margin: 0, color: "#9ca3af", fontSize: 13 }}>{venue}</p>
        </div>
        <span
          style={{
            padding: "4px 10px",
            borderRadius: 999,
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: 0.06,
            backgroundColor: statusColor + "22",
            color: statusColor,
            border: `1px solid ${statusColor}55`
          }}
        >
          {status.replace("_", " ")}
        </span>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          gap: 8,
          fontSize: 12,
          color: "#d1d5db"
        }}
      >
        <div>
          <div style={{ color: "#9ca3af" }}>Buy‑in</div>
          <div>
            R{buyIn} + R{rake}
          </div>
        </div>
        <div>
          <div style={{ color: "#9ca3af" }}>Stack</div>
          <div>{startingStack.toLocaleString()} chips</div>
        </div>
        <div>
          <div style={{ color: "#9ca3af" }}>Level time</div>
          <div>{levelDurationMinutes} min</div>
        </div>
        <div>
          <div style={{ color: "#9ca3af" }}>Players</div>
          <div>
            {registeredPlayers}/{maxPlayers}
          </div>
        </div>
        <div>
          <div style={{ color: "#9ca3af" }}>Date</div>
          <div>{new Date(date).toLocaleString()}</div>
        </div>
      </div>
    </div>
  );
}