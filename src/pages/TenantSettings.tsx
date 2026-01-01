import { useEffect, useState } from "react";
import { useTenant } from "../context/TenantContext";
import { db } from "../utils/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Input, TextArea, Button } from "../components/UI";

export default function TenantSettings() {
  const { tenant } = useTenant();

  const [name, setName] = useState("");
  const [logo, setLogo] = useState("");
  const [primaryColor, setPrimaryColor] = useState("#2563eb");
  const [secondaryColor, setSecondaryColor] = useState("#1e40af");
  const [timezone, setTimezone] = useState("America/Denver");
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!tenant) return;

    async function load() {
      const ref = doc(db, "tenants", tenant, "settings", "profile");
      const snap = await getDoc(ref);

      if (snap.exists()) {
        const data = snap.data();
        setName(data.name || "");
        setLogo(data.logo || "");
        setPrimaryColor(data.primaryColor || "#2563eb");
        setSecondaryColor(data.secondaryColor || "#1e40af");
        setTimezone(data.timezone || "America/Denver");
        setEmail(data.email || "");
      }

      setLoading(false);
    }

    load();
  }, [tenant]);

  async function handleSave(e) {
    e.preventDefault();
    if (!tenant) return;

    setSaving(true);

    const ref = doc(db, "tenants", tenant, "settings", "profile");

    await setDoc(ref, {
      name,
      logo,
      primaryColor,
      secondaryColor,
      timezone,
      email
    });

    setSaving(false);
  }

  if (loading) {
    return <div style={{ color: "#f9fafb" }}>Loading settings...</div>;
  }

  return (
    <div style={{ color: "#f9fafb" }}>
      <h1 style={{ fontSize: 24, marginBottom: 8 }}>Tenant Settings</h1>

      <form
        onSubmit={handleSave}
        style={{
          marginTop: 16,
          display: "flex",
          flexDirection: "column",
          gap: 12,
          width: 320
        }}
      >
        <Input
          type="text"
          placeholder="Club name"
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <Input
          type="text"
          placeholder="Logo URL"
          value={logo}
          onChange={e => setLogo(e.target.value)}
        />

        <label style={{ color: "#9ca3af" }}>Primary Color</label>
        <Input
          type="color"
          value={primaryColor}
          onChange={e => setPrimaryColor(e.target.value)}
          style={{ padding: 0, width: 60, height: 40 }}
        />

        <label style={{ color: "#9ca3af" }}>Secondary Color</label>
        <Input
          type="color"
          value={secondaryColor}
          onChange={e => setSecondaryColor(e.target.value)}
          style={{ padding: 0, width: 60, height: 40 }}
        />

        <select
          value={timezone}
          onChange={e => setTimezone(e.target.value)}
          style={{
            padding: 8,
            backgroundColor: "#111",
            color: "#f9fafb",
            border: "1px solid #333",
            borderRadius: 4
          }}
        >
          <option value="America/Denver">America/Denver</option>
          <option value="America/Chicago">America/Chicago</option>
          <option value="America/New_York">America/New_York</option>
          <option value="America/Los_Angeles">America/Los_Angeles</option>
        </select>

        <Input
          type="email"
          placeholder="Contact email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <Button type="submit" disabled={saving}>
          {saving ? "Saving..." : "Save Settings"}
        </Button>
      </form>
    </div>
  );
}