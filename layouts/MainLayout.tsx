import { Outlet, Link } from "react-router-dom";

export default function MainLayout() {
  return (
    <div style={{ backgroundColor: "#121212", minHeight: "100vh", color: "#f9fafb" }}>
      <header style={{ padding: "16px", borderBottom: "1px solid #333" }}>
        <nav style={{ display: "flex", gap: "16px" }}>
          <Link to="/">Home</Link>
          <Link to="/tournaments">Tournaments</Link>
          <Link to="/venues">Venues</Link>
          <Link to="/standings">Standings</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/support">Support</Link>
          <Link to="/blog">Blog</Link>
        </nav>
      </header>

      <main style={{ padding: "24px" }}>
        <Outlet />
      </main>
    </div>
  );
}