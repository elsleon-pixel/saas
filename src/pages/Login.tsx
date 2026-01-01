import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase";

export default function Login() {
  const navigate = useNavigate();
  const { tenant } = useParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);

      // Redirect to tenant dashboard
      navigate(`/${tenant}/dashboard`, { replace: true });
    } catch (err: any) {
      console.error(err);
      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        maxWidth: 360,
        margin: "80px auto",
        padding: 24,
        backgroundColor: "#1f1f1f",
        borderRadius: 8,
        color: "#f9fafb"
      }}
    >
      <h1 style={{ margin: 0, marginBottom: 16 }}>Login</h1>

      {tenant && (
        <p style={{ marginTop: 0, marginBottom: 16, color: "#9ca3af" }}>
          Tenant: <strong>{tenant}</strong>
        </p>
      )}

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          style={{
            padding: 10,
            borderRadius: 4,
            border: "1px solid #333",
            backgroundColor: "#111",
            color: "#fff"
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          style={{
            padding: 10,
            borderRadius: 4,
            border: "1px solid #333",
            backgroundColor: "#111",
            color: "#fff"
          }}
        />

        {error && (
          <p style={{ color: "#f87171", margin: 0, marginTop: 4 }}>
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            marginTop: 8,
            padding: "10px 0",
            backgroundColor: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: 4,
            cursor: "pointer",
            opacity: loading ? 0.6 : 1
          }}
        >
          {loading ? "Logging in…" : "Login"}
        </button>
      </form>
    </div>
  );
}