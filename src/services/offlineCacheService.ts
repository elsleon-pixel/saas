export function saveTournamentCache(tenant, tournaments) {
  localStorage.setItem(`cache_tournaments_${tenant}`, JSON.stringify(tournaments));
}

export function loadTournamentCache(tenant) {
  const raw = localStorage.getItem(`cache_tournaments_${tenant}`);
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}