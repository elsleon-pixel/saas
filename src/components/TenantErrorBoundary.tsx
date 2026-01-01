import React from "react";
import { Link, useParams } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

export default class TenantErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Tenant Error Boundary:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return <TenantCrashFallback />;
    }

    return this.props.children;
  }
}

function TenantCrashFallback() {
  const { tenant } = useParams();
  const { theme } = useTheme();

  return (
    <div style={{ color: theme.textColor }}>
      <h1 style={{ fontSize: 32, marginBottom: 12 }}>Something broke</h1>
      <p style={{ marginBottom: 20 }}>
        This tenant page crashed, but your data is safe.
      </p>

      <Link
        to={`/${tenant}`}
        style={{ color: theme.primaryColor, textDecoration: "none", fontSize: 18 }}
      >
        Return to {tenant} Home →
      </Link>
    </div>
  );
}