"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { mockSquads } from "./mock";
import type { Squad } from "@/types/squad";

interface SquadContextValue {
  squads: Squad[];
  getSquad: (id: string) => Squad | undefined;
  updateSquad: (squad: Squad) => void;
  addSquad: (squad: Squad) => void;
}

const SquadContext = createContext<SquadContextValue | null>(null);

export function SquadProvider({ children }: { children: ReactNode }) {
  const [squads, setSquads] = useState<Squad[]>(mockSquads);

  const getSquad = useCallback(
    (id: string) => squads.find((s) => s.id === id),
    [squads],
  );

  const updateSquad = useCallback((updated: Squad) => {
    setSquads((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
  }, []);

  const addSquad = useCallback((squad: Squad) => {
    setSquads((prev) => [squad, ...prev]);
  }, []);

  return (
    <SquadContext.Provider value={{ squads, getSquad, updateSquad, addSquad }}>
      {children}
    </SquadContext.Provider>
  );
}

export function useSquad(): SquadContextValue {
  const ctx = useContext(SquadContext);
  if (!ctx) throw new Error("useSquad must be used within a SquadProvider");
  return ctx;
}
