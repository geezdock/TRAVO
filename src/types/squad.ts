export type SquadStatus = "planning" | "voting" | "booked";

export interface SquadMember {
  id: string;
  name: string;
  verified: boolean;
}

export interface Squad {
  id: string;
  name: string;
  destination?: string;
  members: SquadMember[];
  memberLimit: number;
  budgetTotal: number;
  budgetSpent: number;
  status: SquadStatus;
  createdAt: string;
}
