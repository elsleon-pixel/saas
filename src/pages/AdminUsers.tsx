import { useEffect, useState } from "react";
import { useTenant } from "../../context/TenantContext";
import { useTheme } from "../../context/ThemeContext";
import { Button } from "../../components/UI";

export default function AdminUsers() {
  const { tenant } = useTenant();
  const { theme } = useTheme();

  const [users, setUsers] = useState([]);
  const [loading] = useState(false); // placeholder for future Firestore integration

  if (!tenant) {
    return <div style={{ color: theme.textColor }}>No tenant selected.</div>;
  }

  if (loading) {
    return <div style={{ color: theme.textColor }}>Loading users...</div>;
  }

  return (
    <div style={{ color: theme.textColor }}>
      <h1 style={{ fontSize: 24, marginBottom: 16 }}>Manage Users</h1>

      <Button disabled style={{ opacity: 0.5 }}>
        Add User (coming soon)
      </Button>

      <div style={{ marginTop: 20 }}>
        {users.length === 0 && (
          <p style={{ color: "#9ca3af" }}>No users yet.</p>
        )}
      </div>
    </div>
  );
}