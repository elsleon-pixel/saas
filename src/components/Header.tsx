import { Link } from "react-router-dom";
import { useTenant } from "../context/TenantContext";
import { useTheme } from "../context/ThemeContext";

export default function Header() {
  const { tenant } = useTenant();
  const { theme } = useTheme();

  return (
    <header
      style={{
        padding: "16px 32px",
        backgroundColor: "#111",
        borderBottom: "1px solid #222",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}
    >
      <Link
        to={tenant ? `/${tenant}` : "/"}
        style={{ textDecoration: "none", color: theme.textColor }}
      >
        {theme.logoUrl ? (
          <img
            src={theme.logoUrl}
            alt="Tenant Logo"
            style={{ height: 40, objectFit: "contain" }}
          />
        ) : (
          <h1 style={{ margin: 0, fontSize: 22 }}>Chip‑Talk</h1>
        )}
      </Link>

      <nav style={{ display: "flex", gap: 20 }}>
        {tenant && (
          <>
            <Link
              to={`/${tenant}/tournaments`}
              style={{ color: theme.textColor, textDecoration: "none" }}
            >
              Tournaments
            </Link>

            <Link
              to={`/${tenant}/settings`}
              style={{ color: theme.textColor, textDecoration: "none" }}
            >
              Settings
            </Link>

            <Link
              to={`/${tenant}/admin`}
              style={{ color: theme.textColor, textDecoration: "none" }}
            >
              Admin
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}