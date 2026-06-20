"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { EmptyState } from "./EmptyState";
import { SquadGrid } from "./SquadGrid";
import { CreateSquadModal } from "./CreateSquadModal";
import { UserAvatarDropdown } from "./UserAvatarDropdown";
import { mockSquads } from "@/lib/mock";
import type { Squad } from "@/types/squad";

const navLinks = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Friends", href: "/friends" },
  { label: "Trips", href: "/trips" },
];

export function DashboardView() {
  const pathname = usePathname();
  const [squads, setSquads] = useState<Squad[]>(mockSquads);
  const [showCreate, setShowCreate] = useState(false);

  return (
    <div className="min-h-screen">
      <header className="border-b-2 border-ink bg-surface-card">
        <div className="max-w-6xl mx-auto px-4 py-0 flex items-center justify-between h-16">
          <div className="w-28">
            <span className="font-display text-xl font-bold text-ink">
              VOYAQ
            </span>
          </div>

          <nav className="flex items-center h-full gap-1">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative flex items-center h-full px-4 font-heading text-sm font-semibold transition-colors ${
                    active
                      ? "text-ink"
                      : "text-ink-muted hover:text-ink"
                  }`}
                >
                  {link.label}
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-ink rounded-full"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="w-28 flex justify-end">
            <UserAvatarDropdown />
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {squads.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h1 className="font-display text-2xl font-bold text-ink">
                Your Squads
              </h1>
              <button
                onClick={() => setShowCreate(true)}
                className="brut-btn text-sm px-5 py-2.5"
              >
                + New Squad
              </button>
            </div>
            <SquadGrid squads={squads} />
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
        }}
      />
    </div>
  );
}
