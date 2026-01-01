import { useAuth } from "../context/AuthContext";
import { Outlet, Link, useParams } from "react-router-dom";

export default function MainLayout() {
  const { user, logout } = useAuth();
  const { tenant } = useParams();

  return (
    <div style={{ backgroundColor: "#121212", minHeight: "100vh", color: "#f9fafb" }}>
      <header style={{ padding: "16px", borderBottom: "1px solid #333" }}>
        <nav style={{ display: "flex", gap: "16px", alignItems: "center" }}>
          <Link to={`/${tenant}/dashboard`}>Home</Link>
          <Link to={`/${tenant}/tournaments`}>Tournaments</Link>
          <Link to={`/${tenant}/venues`}>Venues</Link>
          <Link to={`/${tenant}/standings`}>Standings</Link>
          <Link to={`/${tenant}/profile`}>Profile</Link>
          <Link to={`/${tenant}/support`}>Support</Link>
          <Link to={`/${tenant}/blog`}>Blog</Link>

          {user && (
            <button
              onClick={logout}
              style={{
                marginLeft: "auto",
                padding: "6px 12px",
                backgroundColor: "#333",
                color: "#fff",
                border: "none",
                cursor: "pointer",
                borderRadius: "4px"
              }}
            >
              Logout
            </button>
          )}
        </nav>
      </header>

      <main style={{ padding: "24px" }}>
        <Outlet />
      </main>
    </div>
  );
}