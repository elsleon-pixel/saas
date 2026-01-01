import { useEffect, useState } from "react";
import { useTenant } from "../../context/TenantContext";
import { useTheme } from "../../context/ThemeContext";
import { Input, Button } from "../../components/UI";
import { useToast } from "../../context/ToastContext";
import LoadingState from "../../components/LoadingState";
import ErrorState from "../../components/ErrorState";
import { db } from "../../utils/firebase";
import { doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";

export default function TenantBranding() {
  const { tenant } = useTenant();
  const { theme } = useTheme();
  const { showToast } = useToast();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [importing, setImporting] = useState(false);
  const [error, setError] = useState(null);

  const [logoUrl, setLogoUrl] = useState("");
  const [primaryColor, setPrimaryColor] = useState("");
  const [accentColor, setAccentColor] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("");
  const [textColor, setTextColor] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const ref = doc(db, "tenants", tenant, "settings", "theme");
        const snap = await getDoc(ref);

        if (snap.exists()) {
          const data = snap.data();
          setLogoUrl(data.logoUrl || "");
          setPrimaryColor(data.primaryColor || "");
          setAccentColor(data.accentColor || "");
          setBackgroundColor(data.backgroundColor || "");
          setTextColor(data.textColor || "");
        } else {
          setLogoUrl(theme.logoUrl || "");
          setPrimaryColor(theme.primaryColor);
          setAccentColor(theme.accentColor);
          setBackgroundColor(theme.backgroundColor);
          setTextColor(theme.textColor);
        }
      } catch (err) {
        setError("Failed to load branding settings.");
      }

      setLoading(false);
    }

    if (tenant) load();
  }, [tenant]);

  async function handleSave() {
    setSaving(true);

    try {
      const ref = doc(db, "tenants", tenant, "settings", "theme");

      await setDoc(ref, {
        logoUrl,
        primaryColor,
        accentColor,
        backgroundColor,
        textColor
      });

      showToast("Branding updated!");
    } catch (err) {
      showToast("Failed to save branding", "error");
    }

    setSaving(false);
  }

  async function handleReset() {
    setResetting(true);

    try {
      const ref = doc(db, "tenants", tenant, "settings", "theme");
      await deleteDoc(ref);

      showToast("Branding reset to defaults");

      setLogoUrl(theme.logoUrl || "");
      setPrimaryColor(theme.primaryColor);
      setAccentColor(theme.accentColor);
      setBackgroundColor(theme.backgroundColor);
      setTextColor(theme.textColor);
    } catch (err) {
      showToast("Failed to reset branding", "error");
    }

    setResetting(false);
  }

  function handleExport() {
    const data = {
      logoUrl,
      primaryColor,
      accentColor,
      backgroundColor,
      textColor
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json"
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `branding_${tenant}.json`;
    a.click();
    URL.revokeObjectURL(url);

    showToast("Branding exported");
  }

  function handleImportFile(e) {
    const file = e.target.files[0];
    if (!file) return;

    setImporting(true);

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result);

        setLogoUrl(data.logoUrl || "");
        setPrimaryColor(data.primaryColor || "");
        setAccentColor(data.accentColor || "");
        setBackgroundColor(data.backgroundColor || "");
        setTextColor(data.textColor || "");

        showToast("Branding imported (not saved yet)");
      } catch (err) {
        showToast("Invalid JSON file", "error");
      }

      setImporting(false);
    };

    reader.readAsText(file);
  }

  if (loading) return <LoadingState message="Loading branding..." />;
  if (error) return <ErrorState message={error} />;

  const previewTheme = {
    logoUrl,
    primaryColor,
    accentColor,
    backgroundColor,
    textColor
  };

  return (
    <div style={{ color: theme.textColor }}>
      <h1 style={{ fontSize: 24, marginBottom: 16 }}>Tenant Branding</h1>

      <div style={{ display: "flex", gap: 40 }}>
        {/* LEFT: FORM */}
        <div style={{ flex: 1, maxWidth: 450, display: "flex", flexDirection: "column", gap: 20 }}>
          <div>
            <label style={{ display: "block", marginBottom: 6 }}>Logo URL</label>
            <Input value={logoUrl} onChange={(e) => setLogoUrl(e.target.value)} />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: 6 }}>Primary Color</label>
            <Input type="color" value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: 6 }}>Accent Color</label>
            <Input type="color" value={accentColor} onChange={(e) => setAccentColor(e.target.value)} />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: 6 }}>Background Color</label>
            <Input type="color" value={backgroundColor} onChange={(e) => setBackgroundColor(e.target.value)} />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: 6 }}>Text Color</label>
            <Input type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)} />
          </div>

          <div style={{ display: "flex", gap: 12 }}>
            <Button disabled={saving} onClick={handleSave}>
              {saving ? "Saving..." : "Save Branding"}
            </Button>

            <Button
              disabled={resetting}
              onClick={handleReset}
              style={{ backgroundColor: "#ef4444" }}
            >
              {resetting ? "Resetting..." : "Reset"}
            </Button>
          </div>

          <div style={{ display: "flex", gap: 12 }}>
            <Button onClick={handleExport}>Export JSON</Button>

            <label
              style={{
                padding: "10px 16px",
                backgroundColor: "#444",
                color: "white",
                borderRadius: 6,
                cursor: "pointer",
                fontWeight: 600
              }}
            >
              {importing ? "Importing..." : "Import JSON"}
              <input
                type="file"
                accept="application/json"
                onChange={handleImportFile}
                style={{ display: "none" }}
              />
            </label>
          </div>
        </div>

        {/* RIGHT: LIVE PREVIEW */}
        <div
          style={{
            flex: 1,
            padding: 24,
            borderRadius: 8,
            backgroundColor: previewTheme.backgroundColor,
            color: previewTheme.textColor,
            border: "1px solid #333",
            minHeight: 300
          }}
        >
          <div style={{ marginBottom: 20 }}>
            {previewTheme.logoUrl ? (
              <img
                src={previewTheme.logoUrl}
                alt="Preview Logo"
                style={{ height: 50, objectFit: "contain" }}
              />
            ) : (
              <h2 style={{ margin: 0 }}>Preview Logo</h2>
            )}
          </div>

          <div style={{ marginBottom: 12 }}>
            <strong>Primary Color:</strong> {previewTheme.primaryColor}
          </div>

          <div style={{ marginBottom: 12 }}>
            <strong>Accent Color:</strong> {previewTheme.accentColor}
          </div>

          <div style={{ marginBottom: 12 }}>
            <strong>Background:</strong> {previewTheme.backgroundColor}
          </div>

          <div style={{ marginBottom: 12 }}>
            <strong>Text Color:</strong> {previewTheme.textColor}
          </div>

          <div
            style={{
              marginTop: 20,
              padding: "10px 16px",
              backgroundColor: previewTheme.primaryColor,
              color: "white",
              borderRadius: 6,
              display: "inline-block",
              fontWeight: 600
            }}
          >
            Sample Button
          </div>
        </div>
      </div>
    </div>
  );
}