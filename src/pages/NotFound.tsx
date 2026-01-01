import { useTheme } from "../context/ThemeContext";
import { Link } from "react-router-dom";

export default function NotFound() {
  const { theme } = useTheme();

  return (
    <div style={{ color: theme.textColor }}>
      <h1 style={{ fontSize: 32, marginBottom: 12 }}>404 — Not Found</h1>
      <p style={{ marginBottom: 20 }}>The page you're looking for doesn't exist.</p>

      <Link
        to="/select"
        style={{ color: theme.primaryColor, textDecoration: "none", fontSize: 18 }}
      >
        Return to Tenant Selection →
      </Link>
    </div>
  );
}