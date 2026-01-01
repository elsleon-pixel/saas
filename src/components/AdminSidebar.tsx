import { Link } from "react-router-dom";
import { useTenant } from "../context/TenantContext";

export default function AdminSidebar() {
  const { tenant } = useTenant();

  if (!tenant) {
    return (
      <div style={{ padding: 16, color: "#f9fafb" }}>
        No tenant selected.
      </div>
    );
  }

  return (
    <div
      style={{
        width: 220,
        backgroundColor: "#111",
        padding: "20px 16px",
        borderRight: "1px solid #222",
        height: "100vh",
        boxSizing: "border-box"
      }}
    >
      <h2 style={{ color: "#f9fafb", marginBottom: 20, fontSize: 20 }}>
        Admin Panel
      </h2>

      <nav style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <Link
          to={`/${tenant}/admin`}
          style={{ color: "#9ca3af", textDecoration: "none" }}
        >
          Dashboard
        </Link>

        <Link
          to={`/${tenant}/admin/users`}
          style={{ color: "#9ca3af", textDecoration: "none" }}
        >
          Users
        </Link>

        <Link
          to={`/${tenant}/admin/tournaments`}
          style={{ color: "#9ca3af", textDecoration: "none" }}
        >
          Tournaments
        </Link>

        <Link
          to={`/${tenant}/settings`}
          style={{ color: "#9ca3af", textDecoration: "none" }}
        >
          Settings
        </Link>
      </nav>
    </div>
  );
}