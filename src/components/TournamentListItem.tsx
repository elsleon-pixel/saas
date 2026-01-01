import { Link } from "react-router-dom";
import { useTenant } from "../context/TenantContext";

interface TournamentListItemProps {
  id: string;
  name: string;
  date: string;
  venue?: string;
}

export default function TournamentListItem({
  id,
  name,
  date,
  venue
}: TournamentListItemProps) {
  const { tenant } = useTenant();

  return (
    <div
      style={{
        padding: "16px",
        backgroundColor: "#1f1f1f",
        borderRadius: 8,
        marginBottom: 12,
        border: "1px solid #2a2a2a"
      }}
    >
      <h2 style={{ margin: 0, fontSize: 20 }}>{name}</h2>

      <p style={{ margin: "6px 0", color: "#9ca3af" }}>
        {date}
        {venue && ` • ${venue}`}
      </p>

      {tenant && (
        <Link
          to={`/${tenant}/tournaments/${id}`}
          style={{
            display: "inline-block",
            marginTop: 8,
            padding: "6px 12px",
            backgroundColor: "#2563eb",
            color: "#fff",
            borderRadius: 4,
            textDecoration: "none"
          }}
        >
          View Details
        </Link>
      )}
    </div>
  );
}