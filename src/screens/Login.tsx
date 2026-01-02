import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useAuth } from "../context/AuthContext";

/**
 * ChipTalk Login Screen
 * 
 * Provides a secure entry point for community members.
 * Features:
 * - Real-time validation feedback
 * - Firebase Auth integration
 * - Modern dark-themed responsive UI
 * - AuthContext state awareness
 */
const Login: React.FC = () => {
  const { loading: authLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Handles the sign-in process with Firebase.
   * Maps technical error codes to user-friendly messages for a better UX.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Successful login will be detected by the AuthProvider and trigger navigation/UI updates via the router
    } catch (err: any) {
      console.error("Login attempt failed:", err.code);
      
      // Friendly error mapping for common Firebase Auth issues as per requirements
      switch (err.code) {
        case "auth/invalid-email":
          setError("The email address provided is not valid.");
          break;
        case "auth/user-not-found":
          setError("We couldn't find an account with that email.");
          break;
        case "auth/wrong-password":
          setError("The password you entered is incorrect.");
          break;
        case "auth/too-many-requests":
          setError("Too many attempts. Your account has been temporarily disabled. Try again later.");
          break;
        default:
          setError("Something went wrong during sign-in. Please try again.");
          break;
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show a clean loading state if the Auth provider is still verifying the session
  if (authLoading) {
    return (
      <div style={containerStyle}>
        <div style={cardStyle}>
          <div style={loadingContainerStyle}>
            <p style={messageStyle}>Verifying session...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <div style={headerStyle}>
          <h1 style={titleStyle}>ChipTalk</h1>
          <p style={subtitleStyle}>Sign in to join the community</p>
        </div>

        <form onSubmit={handleSubmit} style={formStyle}>
          <div style={inputGroupStyle}>
            <label htmlFor="email" style={labelStyle}>Email Address</label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="poker.pro@example.com"
              required
              style={inputStyle}
            />
          </div>

          <div style={inputGroupStyle}>
            <label htmlFor="password" style={labelStyle}>Password</label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              style={inputStyle}
            />
          </div>

          {error && (
            <div role="alert" style={errorStyle}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              ...buttonStyle,
              opacity: isSubmitting ? 0.7 : 1,
              cursor: isSubmitting ? "not-allowed" : "pointer",
            }}
          >
            {isSubmitting ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div style={footerStyle}>
          <p style={footerTextStyle}>
            Forgot your password? <span style={linkStyle}>Reset it</span>
          </p>
        </div>
      </div>
    </div>
  );
};

// --- Inline Styles (SaaS Aesthetic) ---

const containerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  width: "100%",
  backgroundColor: "#0f172a", // Deep slate background
  color: "#f8fafc",
  fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
  padding: "20px",
  boxSizing: "border-box",
};

const cardStyle: React.CSSProperties = {
  width: "100%",
  maxWidth: "420px",
  padding: "48px 32px",
  backgroundColor: "#1e293b", // Slate 800
  borderRadius: "20px",
  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.2)",
  border: "1px solid #334155",
};

const headerStyle: React.CSSProperties = {
  textAlign: "center",
  marginBottom: "36px",
};

const titleStyle: React.CSSProperties = {
  fontSize: "32px",
  fontWeight: "800",
  margin: "0 0 10px 0",
  background: "linear-gradient(to right, #3b82f6, #60a5fa)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

const subtitleStyle: React.CSSProperties = {
  fontSize: "15px",
  color: "#94a3b8",
  margin: 0,
};

const formStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "24px",
};

const inputGroupStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "8px",
};

const labelStyle: React.CSSProperties = {
  fontSize: "13px",
  fontWeight: "600",
  color: "#cbd5e1",
  marginLeft: "4px",
};

const inputStyle: React.CSSProperties = {
  padding: "14px 16px",
  backgroundColor: "#0f172a",
  border: "1px solid #475569",
  borderRadius: "12px",
  color: "#f8fafc",
  fontSize: "16px",
  outline: "none",
  transition: "border-color 0.2s ease",
};

const buttonStyle: React.CSSProperties = {
  marginTop: "8px",
  padding: "16px",
  backgroundColor: "#2563eb",
  color: "#ffffff",
  border: "none",
  borderRadius: "12px",
  fontSize: "16px",
  fontWeight: "700",
  transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
  boxShadow: "0 4px 6px -1px rgba(37, 99, 235, 0.2)",
};

const errorStyle: React.CSSProperties = {
  padding: "12px 16px",
  backgroundColor: "rgba(220, 38, 38, 0.15)",
  border: "1px solid #ef4444",
  borderRadius: "12px",
  color: "#fca5a5",
  fontSize: "14px",
  textAlign: "center",
  lineHeight: "1.5",
};

const footerStyle: React.CSSProperties = {
  marginTop: "32px",
  textAlign: "center",
};

const footerTextStyle: React.CSSProperties = {
  fontSize: "14px",
  color: "#94a3b8",
};

const linkStyle: React.CSSProperties = {
  color: "#60a5fa",
  cursor: "pointer",
  fontWeight: "600",
};

const loadingContainerStyle: React.CSSProperties = {
  padding: "40px 0",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const messageStyle: React.CSSProperties = {
  fontSize: "16px",
  color: "#94a3b8",
  fontWeight: "500",
};

export default Login;
