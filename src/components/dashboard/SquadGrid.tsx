"use client";

import { useRouter } from "next/navigation";
import { SquadCard } from "./SquadCard";
import type { Squad } from "@/types/squad";

interface SquadGridProps {
  squads: Squad[];
}

export function SquadGrid({ squads }: SquadGridProps) {
  const router = useRouter();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {squads.map((squad) => (
        <SquadCard
          key={squad.id}
          squad={squad}
          onSelect={(id) => router.push(`/workspace/${id}`)}
        />
      ))}
    </div>
  );
}
