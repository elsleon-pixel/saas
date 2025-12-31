export type TournamentStatus = "upcoming" | "late_reg" | "running" | "paused" | "completed";

export interface Tournament {
  id: string;
  name: string;
  venue: string;
  buyIn: number;
  rake: number;
  startingStack: number;
  levelDurationMinutes: number;
  maxPlayers: number;
  registeredPlayers: number;
  date: string; // ISO string
  status: TournamentStatus;
  isFeatured?: boolean;
}

export const mockTournaments: Tournament[] = [
  {
    id: "t1",
    name: "Saturday Deepstack",
    venue: "Chip Talk Lounge",
    buyIn: 500,
    rake: 50,
    startingStack: 50000,
    levelDurationMinutes: 25,
    maxPlayers: 60,
    registeredPlayers: 48,
    date: "2025-02-15T18:00:00Z",
    status: "late_reg",
    isFeatured: true
  },
  {
    id: "t2",
    name: "Weeknight Turbo",
    venue: "Downtown Poker Room",
    buyIn: 200,
    rake: 30,
    startingStack: 25000,
    levelDurationMinutes: 15,
    maxPlayers: 40,
    registeredPlayers: 32,
    date: "2025-02-12T19:00:00Z",
    status: "upcoming"
  },
  {
    id: "t3",
    name: "Monthly Main Event",
    venue: "Bayview Casino",
    buyIn: 1500,
    rake: 150,
    startingStack: 80000,
    levelDurationMinutes: 30,
    maxPlayers: 100,
    registeredPlayers: 97,
    date: "2025-03-01T16:00:00Z",
    status: "running",
    isFeatured: true
  }
];