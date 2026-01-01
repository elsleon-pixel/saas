import { useEffect, useState, useMemo } from "react";
import { useTenant } from "../../context/TenantContext";
import { useTheme } from "../../context/ThemeContext";
import { getTournaments, deleteTournament } from "../../services/tournamentService";
import { Link } from "react-router-dom";
import { Button, Input } from "../../components/UI";
import { useModal } from "../../context/ModalContext";
import ConfirmAction from "../../components/ConfirmAction";
import { useToast } from "../../context/ToastContext";
import LoadingState from "../../components/LoadingState";
import EmptyState from "../../components/EmptyState";
import ErrorState from "../../components/ErrorState";
import TournamentCard from "../../components/TournamentCard";

export default function AdminTournaments() {
  const { tenant } = useTenant();
  const { theme } = useTheme();
  const { openModal, closeModal } = useModal();
  const { showToast } = useToast();

  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error] = useState(null);

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("createdDesc");
  const [statusFilter, setStatusFilter] = useState("all");

  async function load() {
    setLoading(true);
    const data = await getTournaments(tenant);
    setTournaments(data);
    setLoading(false);
  }

  useEffect(() => {
    if (!tenant) return;
    load();
  }, [tenant]);

  function confirmDelete(t) {
    openModal(
      <ConfirmAction
        title="Delete Tournament"
        message={`Are you sure you want to delete "${t.name}"?`}
        onCancel={closeModal}
        onConfirm={async () => {
          await deleteTournament(tenant, t.id);
          closeModal();
          showToast("Tournament deleted");
          load();
        }}
      />
    );
  }

  const filtered = useMemo(() => {
    let list = [...tournaments];

    if (search.trim()) {
      const s = search.toLowerCase();
      list = list.filter(t =>
        (t.name || "").toLowerCase().includes(s)
      );
    }

    if (statusFilter !== "all") {
      list = list.filter(t => t.status === statusFilter);
    }

    switch (sort) {
      case "nameAsc":
        list.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
        break;
      case "nameDesc":
        list.sort((a, b) => (b.name || "").localeCompare(a.name || ""));
        break;
      case "createdAsc":
        list.sort((a, b) => (a.createdAt || 0) - (b.createdAt || 0));
        break;
      case "createdDesc":
        list.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
        break;
      default:
        break;
    }

    return list;
  }, [tournaments, search, sort, statusFilter]);

  if (loading) return <LoadingState message="Loading tournaments..." />;
  if (error) return <ErrorState message="Failed to load tournaments." />;
  if (tournaments.length === 0) return <EmptyState message="No tournaments yet." />;

  return (
    <div style={{ color: theme.textColor }}>
      <h1 style={{ fontSize: 24, marginBottom: 16 }}>Manage Tournaments</h1>

      <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
        <Input
          placeholder="Search tournaments..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ flex: 1 }}
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{
            padding: "10px 12px",
            backgroundColor: "#111",
            color: "#f9fafb",
            border: "1px solid #333",
            borderRadius: 6
          }}
        >
          <option value="all">All Statuses</option>
          <option value="upcoming">Upcoming</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          style={{
            padding: "10px 12px",
            backgroundColor: "#111",
            color: "#f9fafb",
            border: "1px solid #333",
            borderRadius: 6
          }}
        >
          <option value="createdDesc">Newest First</option>
          <option value="createdAsc">Oldest First</option>
          <option value="nameAsc">Name A–Z</option>
          <option value="nameDesc">Name Z–A</option>
        </select>

        <Link
          to={`/${tenant}/tournaments/create`}
          style={{ textDecoration: "none" }}
        >
          <Button>Create</Button>
        </Link>
      </div>

      {filtered.length === 0 ? (
        <EmptyState message="No tournaments match your filters." />
      ) : (
        <ul style={{ paddingLeft: 0, listStyle: "none" }}>
          {filtered.map(t => (
            <TournamentCard
              key={t.id}
              tournament={t}
              tenant={tenant}
              showAdminActions={true}
              onDelete={() => confirmDelete(t)}
            />
          ))}
        </ul>
      )}
    </div>
  );
}