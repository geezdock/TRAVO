"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { z } from "zod";
import type { Squad } from "@/types/squad";

const squadSchema = z.object({
  name: z.string().min(1, "Enter a squad name").max(50),
  destination: z.string().max(100).optional(),
  budgetPerPerson: z.number().min(1, "Enter a budget"),
  memberLimit: z.number().min(2, "Need at least 2 members").max(20),
});

interface CreateSquadModalProps {
  open: boolean;
  onClose: () => void;
  onCreated: (squad: Squad) => void;
}

export function CreateSquadModal({
  open,
  onClose,
  onCreated,
}: CreateSquadModalProps) {
  const [name, setName] = useState("");
  const [destination, setDestination] = useState("");
  const [budget, setBudget] = useState("");
  const [memberLimit, setMemberLimit] = useState("5");
  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});

    const result = squadSchema.safeParse({
      name,
      destination: destination || undefined,
      budgetPerPerson: parseInt(budget),
      memberLimit: parseInt(memberLimit),
    });

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        fieldErrors[issue.path[0] as string] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    const totalBudget = result.data.budgetPerPerson * result.data.memberLimit;

    const newSquad: Squad = {
      id: `squad-${Date.now()}`,
      name: result.data.name,
      destination: result.data.destination,
      members: [
        { id: "me", name: "You", verified: true },
      ],
      memberLimit: result.data.memberLimit,
      budgetTotal: totalBudget,
      budgetSpent: 0,
      status: "planning",
      createdAt: new Date().toISOString(),
    };

    onCreated(newSquad);
    onClose();
    setName("");
    setDestination("");
    setBudget("");
    setMemberLimit("5");
  }

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-ink/40"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="brut-card w-full max-w-md relative z-10"
          >
            <div className="flex items-center justify-between mb-6">
              <span className="font-heading text-lg font-bold text-ink">
                Create a Squad
              </span>
              <button
                onClick={onClose}
                className="p-1 hover:bg-surface-alt rounded-bruted transition-colors"
              >
                <X className="w-5 h-5 text-ink" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="font-heading text-xs font-semibold text-ink-light uppercase tracking-wider">
                  Squad Name
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="brut-input w-full text-sm"
                  placeholder="Goa Crew 2026"
                  autoFocus
                />
                {errors.name && (
                  <p className="font-mono text-xs text-error">{errors.name}</p>
                )}
              </div>

              <div className="space-y-1">
                <label className="font-heading text-xs font-semibold text-ink-light uppercase tracking-wider">
                  Destination{" "}
                  <span className="text-ink-muted">(optional)</span>
                </label>
                <input
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="brut-input w-full text-sm"
                  placeholder="Goa, Manali, Pondicherry..."
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-heading text-xs font-semibold text-ink-light uppercase tracking-wider">
                    Budget per person
                  </label>
                  <div className="flex items-stretch">
                    <span className="brut-input inline-flex items-center px-3 border-r-0 rounded-r-none bg-clay-light text-ink font-mono shrink-0 text-sm">
                      ₹
                    </span>
                    <input
                      type="number"
                      inputMode="numeric"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="brut-input w-full rounded-l-none font-mono text-sm"
                      placeholder="5000"
                    />
                  </div>
                  {errors.budgetPerPerson && (
                    <p className="font-mono text-xs text-error">
                      {errors.budgetPerPerson}
                    </p>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="font-heading text-xs font-semibold text-ink-light uppercase tracking-wider">
                    Members
                  </label>
                  <select
                    value={memberLimit}
                    onChange={(e) => setMemberLimit(e.target.value)}
                    className="brut-input w-full font-mono text-sm"
                  >
                    {Array.from({ length: 18 }, (_, i) => i + 2).map((n) => (
                      <option key={n} value={n}>
                        {n} people
                      </option>
                    ))}
                  </select>
                  {errors.memberLimit && (
                    <p className="font-mono text-xs text-error">
                      {errors.memberLimit}
                    </p>
                  )}
                </div>
              </div>

              {budget && memberLimit && parseInt(budget) > 0 && (
                <div className="brut-card !p-3 !shadow-bruted-sm bg-surface-alt">
                  <p className="font-mono text-sm text-ink">
                    Total budget:{" "}
                    <span className="font-bold">
                      ₹
                      {(
                        parseInt(budget) * parseInt(memberLimit)
                      ).toLocaleString("en-IN")}
                    </span>
                  </p>
                </div>
              )}

              <button type="submit" className="brut-btn w-full text-base mt-2">
                Launch Squad
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
