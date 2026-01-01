import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTenant } from "../../context/TenantContext";
import { useTheme } from "../../context/ThemeContext";
import { getTournamentById, updateTournament } from "../../services/tournamentService";
import { Input, TextArea, Button } from "../../components/UI";
import LoadingState from "../../components/LoadingState";
import EmptyState from "../../components/EmptyState";
import ErrorState from "../../components/ErrorState";
import { useToast } from "../../context/ToastContext";

export default function EditTournament() {
  const { tenant } = useTenant();
  const { theme } = useTheme();
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [tournament, setTournament] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await getTournamentById(tenant, id);
        if (!data) {
          setError("Tournament not found.");
        } else {
          setTournament({
            ...data,
            startDate: data.startDate ? new Date(data.startDate).toISOString().slice(0, 10) : "",
            endDate: data.endDate ? new Date(data.endDate).toISOString().slice(0, 10) : ""
          });
        }
      } catch (err) {
        setError("Failed to load tournament.");
      }
      setLoading(false);
    }

    if (tenant && id) load();
  }, [tenant, id]);

  async function handleSave() {
    setSaving(true);
    try {
      await updateTournament(tenant, id, {
        name: tournament.name,
        description: tournament.description,
        startDate: new Date(tournament.startDate).getTime(),
        endDate: new Date(tournament.endDate).getTime()
      });

      showToast("Tournament updated!");
      navigate(`/${tenant}/admin/tournaments`);
    } catch (err) {
      showToast("Failed to update tournament", "error");
    }
    setSaving(false);
  }

  if (loading) return <LoadingState message="Loading tournament..." />;
  if (error) return <ErrorState message={error} />;
  if (!tournament) return <EmptyState message="Tournament not found." />;

  return (
    <div style={{ color: theme.textColor }}>
      <h1 style={{ fontSize: 24, marginBottom: 16 }}>Edit Tournament</h1>

      <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 500 }}>
        <div>
          <label style={{ display: "block", marginBottom: 6 }}>Name</label>
          <Input
            value={tournament.name}
            onChange={(e) =>
              setTournament({ ...tournament, name: e.target.value })
            }
          />
        </div>

        <div>
          <label style={{ display: "block", marginBottom: 6 }}>Description</label>
          <TextArea
            value={tournament.description || ""}
            onChange={(e) =>
              setTournament({ ...tournament, description: e.target.value })
            }
          />
        </div>

        <div>
          <label style={{ display: "block", marginBottom: 6 }}>Start Date</label>
          <Input
            type="date"
            value={tournament.startDate}
            onChange={(e) =>
              setTournament({ ...tournament, startDate: e.target.value })
            }
          />
        </div>

        <div>
          <label style={{ display: "block", marginBottom: 6 }}>End Date</label>
          <Input
            type="date"
            value={tournament.endDate}
            onChange={(e) =>
              setTournament({ ...tournament, endDate: e.target.value })
            }
          />
        </div>

        <Button disabled={saving} onClick={handleSave}>
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  );
}