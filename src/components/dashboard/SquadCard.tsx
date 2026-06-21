"use client";

import { motion } from "framer-motion";
import { Users } from "lucide-react";
import type { Squad } from "@/types/squad";

interface SquadCardProps {
  squad: Squad;
  onSelect: (id: string) => void;
}

const statusConfig = {
  planning: { label: "Planning", className: "bg-clay-light text-ink" },
  voting: { label: "Voting", className: "bg-peach text-ink" },
  booked: { label: "Booked", className: "bg-success text-surface" },
};

export function SquadCard({ squad, onSelect }: SquadCardProps) {
  const status = statusConfig[squad.status];
  const destination = squad.destination || squad.destinations[0] || "Undecided";

  return (
    <motion.button
      onClick={() => onSelect(squad.id)}
      className="brut-card w-full text-left cursor-pointer hover:shadow-bruted-lg hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-150 block"
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="min-w-0">
          <h3 className="font-heading text-lg font-bold text-ink truncate">
            {squad.name}
          </h3>
          <p className="font-mono text-sm text-ink-muted truncate">
            {destination}
          </p>
        </div>
        <span
          className={`font-mono text-xs px-3 py-1 rounded-bruted shrink-0 ${status.className}`}
        >
          {status.label}
        </span>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-ink-muted shrink-0" />
          <span className="font-mono text-sm text-ink">
            {squad.members.length} / {squad.memberLimit} members
          </span>
        </div>

        {squad.votes.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-ink-muted">
              {squad.votes.length} vote{squad.votes.length !== 1 ? "s" : ""}
            </span>
          </div>
        )}

        <div className="flex items-center gap-1.5 pt-1">
          {squad.members.slice(0, 5).map((m) => (
            <div
              key={m.id}
              className={`w-7 h-7 rounded-full ${m.color} flex items-center justify-center ring-2 ring-white relative`}
            >
              <span className="text-xs font-heading font-bold text-white">
                {m.initial}
              </span>
              {m.verified && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-success rounded-full border border-surface" />
              )}
            </div>
          ))}
          {squad.members.length > 5 && (
            <span className="font-mono text-xs text-ink-muted ml-1">
              +{squad.members.length - 5}
            </span>
          )}
        </div>
      </div>
    </motion.button>
  );
}
