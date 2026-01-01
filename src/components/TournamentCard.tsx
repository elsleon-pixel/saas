import { Link } from "react-router-dom";
import StatusBadge from "./StatusBadge";
import { useTheme } from "../context/ThemeContext";

export default function TournamentCard({
  tournament,
  tenant,
  showAdminActions = false,
  onDelete
}) {
  const { theme } = useTheme();

  const start = tournament.startDate
    ? new Date(tournament.startDate).toLocaleDateString()
    : "N/A";

  const end = tournament.endDate
    ? new Date(tournament.endDate).toLocaleDateString()
    : "N/A";

  return (
    <li
      style={{
        padding: 16,
        backgroundColor: "#111",
        borderRadius: 6,
        marginBottom: 12
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
        <strong style={{ fontSize: 18 }}>
          {tournament.name || "Untitled Tournament"}
        </strong>
        <StatusBadge status={tournament.status} />
      </div>

      <div style={{ color: "#9ca3af", marginBottom: 12 }}>
        <div>Start: {start}</div>
        <div>End: {end}</div>
      </div>

      <div style={{ display: "flex", gap: 12 }}>
        <Link
          to={`/${tenant}/tournaments/${tournament.id}`}
          style={{ color: theme.primaryColor, textDecoration: "none", fontWeight: 500 }}
        >
          View
        </Link>

        {showAdminActions && (
          <>
            <Link
              to={`/${tenant}/admin/tournaments/${tournament.id}/edit`}
              style={{ color: theme.primaryColor, textDecoration: "none" }}
            >
              Edit
            </Link>

            <span
              onClick={onDelete}
              style={{ color: "#ef4444", cursor: "pointer" }}
            >
              Delete
            </span>
          </>
        )}
      </div>
    </li>
  );
}