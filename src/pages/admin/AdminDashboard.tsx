import { useTenant } from "../../context/TenantContext";
import { useTheme } from "../../context/ThemeContext";
import { Link } from "react-router-dom";
import { Button } from "../../components/UI";

export default function AdminDashboard() {
  const { tenant } = useTenant();
  const { theme } = useTheme();

  if (!tenant) {
    return <div style={{ color: theme.textColor }}>No tenant selected.</div>;
  }

  return (
    <div style={{ color: theme.textColor }}>
      <h1 style={{ fontSize: 24, marginBottom: 16 }}>Admin Dashboard</h1>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <Link to={`/${tenant}/admin/tournaments`} style={{ textDecoration: "none" }}>
          <Button>Manage Tournaments</Button>
        </Link>

        <Link to={`/${tenant}/admin/users`} style={{ textDecoration: "none" }}>
          <Button>Manage Users</Button>
        </Link>

        <Link to={`/${tenant}/settings`} style={{ textDecoration: "none" }}>
          <Button>Tenant Settings</Button>
        </Link>
      </div>
    </div>
  );
}