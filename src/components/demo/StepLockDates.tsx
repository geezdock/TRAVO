"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useMemo } from "react";

interface DateSlot {
  date: number;
  day: string;
  available: number;
}

function generateDateSlots(): DateSlot[] {
  const avails = [3, 6, 7, 5, 2, 0, 4];
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const baseDate = 12;
  return avails.map((count, i) => ({
    date: baseDate + i,
    day: days[i],
    available: count,
  }));
}

export function StepLockDates() {
  const slots = useMemo(() => generateDateSlots(), []);
  const selectedRange = [2, 3, 4];

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="text-center space-y-2">
        <span className="font-mono text-xs font-bold text-accent uppercase tracking-widest">
          STEP 04
        </span>
        <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-ink uppercase tracking-tight">
          Lock Dates
        </h2>
        <p className="font-heading text-sm sm:text-base text-ink-light max-w-md mx-auto">
          See everyone&apos;s availability at a glance. Book the best overlap.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        className="w-full max-w-md border-[3px] border-ink rounded-[16px] bg-white p-4 sm:p-6 shadow-bruted-lg"
      >
        <div className="flex items-center justify-between mb-5">
          <span className="font-mono text-xs font-bold text-ink-muted uppercase tracking-wider">
            August 2026
          </span>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
            className="flex items-center gap-1.5 bg-success/10 border border-success/30 rounded-full px-3 py-1"
          >
            <Check className="w-4 h-4 text-success" />
            <span className="font-heading text-xs font-bold text-success">Aug 15–17 Locked</span>
          </motion.div>
        </div>

        <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
          {slots.map((slot, i) => (
            <motion.div
              key={slot.date}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.05, duration: 0.3 }}
              className={`rounded-[10px] border-[2px] p-2 sm:p-3 text-center ${
                selectedRange.includes(i)
                  ? "border-accent bg-accent/5"
                  : "border-ink/10 bg-white"
              }`}
            >
              <span className="font-mono text-[8px] sm:text-[9px] font-bold text-ink-muted uppercase">
                {slot.day}
              </span>
              <p className="font-display text-sm sm:text-base font-extrabold text-ink mt-0.5">
                Aug {slot.date}
              </p>
              <span className="font-mono text-[9px] sm:text-[10px] font-bold text-ink-muted mt-0.5 block">
                {slot.available} avail
              </span>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-5 pt-3 border-t border-ink/10 flex items-center gap-2 text-ink-muted"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="font-heading text-sm">Best overlap: Aug 15–17 (7/8 available)</span>
        </motion.div>
      </motion.div>
    </div>
  );
}
