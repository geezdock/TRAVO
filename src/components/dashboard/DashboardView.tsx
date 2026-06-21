"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { EmptyState } from "./EmptyState";
import { SquadGrid } from "./SquadGrid";
import { CreateSquadModal } from "./CreateSquadModal";
import { UserAvatarDropdown } from "./UserAvatarDropdown";
import { WorkspaceView } from "@/components/workspace/WorkspaceView";
import { mockSquads } from "@/lib/mock";
import type { Squad } from "@/types/squad";

export function DashboardView() {
  const [squads, setSquads] = useState<Squad[]>(mockSquads);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showCreate, setShowCreate] = useState(false);

  const selectedSquad = squads.find((s) => s.id === selectedId) || null;

  function handleUpdateSquad(updated: Squad) {
    setSquads((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
  }

  return (
    <div className="min-h-screen">
      <header className="border-b-2 border-ink bg-surface-card">
        <div className="max-w-6xl mx-auto px-4 py-0 flex items-center justify-between h-16">
          <div className="w-28">
            <span className="font-display text-xl font-bold text-ink">
              VOYAQ
            </span>
          </div>

          <div className="w-28 flex justify-end">
            <UserAvatarDropdown />
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {selectedSquad ? (
          <motion.div
            key="workspace"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <WorkspaceView
              squad={selectedSquad}
              onBack={() => setSelectedId(null)}
              onUpdate={handleUpdateSquad}
            />
          </motion.div>
        ) : squads.length > 0 ? (
          <motion.div
            key="squad-list"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h1 className="font-display text-2xl font-bold text-ink">
                Your Squads
              </h1>
              <button
                onClick={() => setShowCreate(true)}
                className="brut-btn text-sm px-5 py-3 min-h-[44px]"
              >
                + New Squad
              </button>
            </div>
            <SquadGrid squads={squads} onSelect={setSelectedId} />
          </motion.div>
        ) : (
          <EmptyState onCreate={() => setShowCreate(true)} />
        )}
      </main>

      <CreateSquadModal
        open={showCreate}
        onClose={() => setShowCreate(false)}
        onCreated={(squad: Squad) => {
          setSquads((prev) => [squad, ...prev]);
          setSelectedId(squad.id);
        }}
      />
    </div>
  );
}
