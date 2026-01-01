import { useState } from "react";
import { useTenant } from "../context/TenantContext";
import { useTheme } from "../context/ThemeContext";
import { createTournament } from "../services/tournamentService";
import { Input, TextArea, Button } from "../components/UI";
import { useToast } from "../context/ToastContext";
import { useNavigate } from "react-router-dom";

export default function CreateTournament() {
  const { tenant } = useTenant();
  const { theme } = useTheme();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleCreate() {
    if (!name.trim()) {
      showToast("Name is required", "error");
      return;
    }

    if (!startDate || !endDate) {
      showToast("Start and end dates are required", "error");
      return;
    }

    setSaving(true);

    try {
      await createTournament(tenant, {
        name,
        description,
        startDate: new Date(startDate).getTime(),
        endDate: new Date(endDate).getTime()
      });

      showToast("Tournament created!");
      navigate(`/${tenant}/admin/tournaments`);
    } catch (err) {
      showToast("Failed to create tournament", "error");
    }

    setSaving(false);
  }

  return (
    <div style={{ color: theme.textColor }}>
      <h1 style={{ fontSize: 24, marginBottom: 16 }}>Create Tournament</h1>

      <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 500 }}>
        <div>
          <label style={{ display: "block", marginBottom: 6 }}>Name</label>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div>
          <label style={{ display: "block", marginBottom: 6 }}>Description</label>
          <TextArea value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>

        <div>
          <label style={{ display: "block", marginBottom: 6 }}>Start Date</label>
          <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </div>

        <div>
          <label style={{ display: "block", marginBottom: 6 }}>End Date</label>
          <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </div>

        <Button disabled={saving} onClick={handleCreate}>
          {saving ? "Creating..." : "Create Tournament"}
        </Button>
      </div>
    </div>
  );
}