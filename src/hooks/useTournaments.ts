import { useContext } from "react";
import { TournamentContext } from "../context/TournamentContext";

export function useTournaments() {
  const ctx = useContext(TournamentContext);

  if (!ctx) {
    throw new Error("useTournaments must be used within a TournamentProvider");
  }

  return ctx;
}