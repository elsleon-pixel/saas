import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../utils/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useTheme } from "../context/ThemeContext";

export default function TenantSelect() {
  const { theme } = useTheme();
  const [tenants, setTenants] = useState([]);

  useEffect(() => {
    async function load() {
      const snap = await getDocs(collection(db, "tenants"));
      setTenants(snap.docs.map(d => d.id));
    }
    load();
  }, []);

  return (
    <div style={{ color: theme.textColor }}>
      <h1 style={{ fontSize: 28, marginBottom: 20 }}>Select Your Club</h1>

      <ul style={{ listStyle: "none", paddingLeft: 0, display: "flex", flexDirection: "column", gap: 12 }}>
        {tenants.map(t => (
          <li key={t}>
            <Link
              to={`/${t}`}
              style={{
                color: theme.primaryColor,
                textDecoration: "none",
                fontSize: 18
              }}
            >
              {t}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}