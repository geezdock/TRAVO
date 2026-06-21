"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { TabSquad } from "./steps/TabSquad";
import { TabDestinations } from "./steps/TabDestinations";
import { TabDates } from "./steps/TabDates";
import { TabBudget } from "./steps/TabBudget";
import { TabPolls } from "./steps/TabPolls";
import type { Squad, WorkspaceTab } from "@/types/squad";

interface WorkspaceViewProps {
  squad: Squad;
  onBack: () => void;
  onUpdate: (squad: Squad) => void;
}

const tabs: { id: WorkspaceTab; label: string }[] = [
  { id: "squad", label: "Squad" },
  { id: "destinations", label: "Destinations" },
  { id: "dates", label: "Dates" },
  { id: "budget", label: "Budget" },
  { id: "polls", label: "Polls" },
];

export function WorkspaceView({ squad, onBack, onUpdate }: WorkspaceViewProps) {
  const [activeTab, setActiveTab] = useState<WorkspaceTab>("squad");

  function renderTab() {
    switch (activeTab) {
      case "squad":
        return <TabSquad squad={squad} onUpdate={onUpdate} />;
      case "destinations":
        return <TabDestinations squad={squad} onUpdate={onUpdate} />;
      case "dates":
        return <TabDates squad={squad} onUpdate={onUpdate} />;
      case "budget":
        return <TabBudget squad={squad} onUpdate={onUpdate} />;
      case "polls":
        return <TabPolls squad={squad} onUpdate={onUpdate} />;
    }
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 font-heading text-sm font-semibold text-ink-muted hover:text-ink transition-colors min-h-[44px] py-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Dashboard
        </button>
        <h1 className="font-display text-2xl font-bold text-ink">
          {squad.name}
        </h1>
      </div>

      <div className="border-b-2 border-ink mb-6 overflow-x-auto">
        <div className="flex gap-0 min-w-max">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative px-4 py-3.5 min-h-[44px] font-heading text-sm font-semibold transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? "text-ink"
                  : "text-ink-muted hover:text-ink"
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.span
                  layoutId="workspace-tab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
        >
          {renderTab()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
