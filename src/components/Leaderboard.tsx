interface LeaderboardEntry {
  rank: number;
  player: string;
  points: number;
}

const mockLeaderboard: LeaderboardEntry[] = [
  { rank: 1, player: "Player 1", points: 120 },
  { rank: 2, player: "Player 2", points: 96 },
  { rank: 3, player: "Player 3", points: 84 }
];

export function Leaderboard() {
  return (
    <div
      style={{
        background: "#020617",
        borderRadius: 12,
        border: "1px solid #1f2937",
        padding: 16,
        boxShadow: "0 8px 20px rgba(0,0,0,0.5)"
      }}
    >
      <h3 style={{ margin: 0, marginBottom: 8, color: "#f9fafb", fontSize: 16 }}>Leaderboard</h3>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, color: "#e5e7eb" }}>
        <thead>
          <tr style={{ textAlign: "left", color: "#9ca3af" }}>
            <th style={{ paddingBottom: 6 }}>Rank</th>
            <th style={{ paddingBottom: 6 }}>Player</th>
            <th style={{ paddingBottom: 6, textAlign: "right" }}>Points</th>
          </tr>
        </thead>
        <tbody>
          {mockLeaderboard.map(entry => (
            <tr key={entry.rank}>
              <td style={{ padding: "4px 0" }}>#{entry.rank}</td>
              <td style={{ padding: "4px 0" }}>{entry.player}</td>
              <td style={{ padding: "4px 0", textAlign: "right" }}>{entry.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}