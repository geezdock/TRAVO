"use client";

import { motion } from "framer-motion";
import { Compass } from "lucide-react";

interface EmptyStateProps {
  onCreate: () => void;
}

export function EmptyState({ onCreate }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4"
    >
      <div className="mx-auto w-20 h-20 rounded-bruted-lg border-2 border-ink flex items-center justify-center bg-surface-alt mb-6">
        <Compass className="w-10 h-10 text-ink" />
      </div>

      <p className="font-display text-3xl md:text-4xl font-bold text-ink mb-2">
        You&apos;re going nowhere.
      </p>
      <p className="font-heading text-lg text-ink-muted mb-8">
        Initiate Protocol.
      </p>

      <button onClick={onCreate} className="brut-btn text-base px-8 py-4">
        Create a Squad
      </button>
    </motion.div>
  );
}
