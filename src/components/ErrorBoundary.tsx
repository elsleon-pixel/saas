import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("React Error Boundary:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return <CrashFallback />;
    }

    return this.props.children;
  }
}

function CrashFallback() {
  const { theme } = useTheme();

  return (
    <div style={{ color: theme.textColor }}>
      <h1 style={{ fontSize: 32, marginBottom: 12 }}>Something went wrong</h1>
      <p style={{ marginBottom: 20 }}>
        The page crashed, but your session is safe.
      </p>

      <Link
        to="/select"
        style={{ color: theme.primaryColor, textDecoration: "none", fontSize: 18 }}
      >
        Return to Tenant Selection →
      </Link>
    </div>
  );
}