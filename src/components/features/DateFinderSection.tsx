"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Check, Calendar } from "lucide-react";

interface DateSlot {
  date: number;
  day: string;
  available: number;
}

const slots: DateSlot[] = [
  { date: 12, day: "Mon", available: 3 },
  { date: 13, day: "Tue", available: 5 },
  { date: 14, day: "Wed", available: 6 },
  { date: 15, day: "Thu", available: 6 },
  { date: 16, day: "Fri", available: 7 },
  { date: 17, day: "Sat", available: 5 },
  { date: 18, day: "Sun", available: 2 },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.15, ease: [0.25, 0.1, 0.25, 1] as const },
  }),
};

export function DateFinderSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [showLocked, setShowLocked] = useState(false);

  useEffect(() => {
    if (!isInView) return;
    const timer = setTimeout(() => setShowLocked(true), 2200);
    return () => clearTimeout(timer);
  }, [isInView]);

  return (
    <section ref={ref} className="py-16 sm:py-24 lg:py-32 px-4 bg-surface-alt">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={{ visible: { transition: { staggerChildren: 0.15 } }, hidden: {} }}
            className="flex-1"
          >
            <motion.h2 variants={fadeUp} custom={0} className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink uppercase tracking-tight leading-[1.1]">
              Find dates that
              <br />
              actually work.
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} className="font-heading text-base sm:text-lg text-ink-light mt-4 max-w-md leading-relaxed">
              Stop asking &ldquo;Who&rsquo;s free?&rdquo; over and over.
            </motion.p>
            <motion.div variants={fadeUp} custom={2} className="mt-6 space-y-2.5">
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-success/10 flex items-center justify-center shrink-0"><Check className="w-3 h-3 text-success" /></div>
                <span className="font-heading text-sm sm:text-base text-ink-light">Availability matching</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-success/10 flex items-center justify-center shrink-0"><Check className="w-3 h-3 text-success" /></div>
                <span className="font-heading text-sm sm:text-base text-ink-light">Date locking</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-success/10 flex items-center justify-center shrink-0"><Check className="w-3 h-3 text-success" /></div>
                <span className="font-heading text-sm sm:text-base text-ink-light">Smart suggestions</span>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex-1 w-full max-w-md"
          >
            <div className="border-[3px] border-ink rounded-[16px] bg-white p-5 sm:p-6 shadow-bruted-lg">
              <div className="flex items-center justify-between mb-5">
                <span className="font-mono text-xs font-bold text-ink-muted uppercase tracking-wider">
                  August 2026
                </span>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={showLocked ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4 }}
                  className="flex items-center gap-1.5 bg-success/10 border border-success/30 rounded-full px-3 py-1"
                >
                  <Check className="w-3 h-3 text-success" />
                  <span className="font-heading text-[11px] font-bold text-success">Aug 15–17 Locked</span>
                </motion.div>
              </div>

              <div className="grid grid-cols-7 gap-1.5">
                {slots.map((slot, i) => {
                  const selected = i >= 3 && i <= 5;
                  return (
                    <motion.div
                      key={slot.date}
                      initial={{ opacity: 0, y: 12 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.15 + i * 0.08, duration: 0.4 }}
                      className={`rounded-[10px] border-[2px] p-1.5 sm:p-2 text-center ${
                        selected ? "border-accent bg-accent/5" : "border-ink/10 bg-surface"
                      }`}
                    >
                      <span className="font-mono text-[8px] sm:text-[9px] font-bold text-ink-muted uppercase block">{slot.day}</span>
                      <span className="font-display text-sm sm:text-base font-extrabold text-ink block mt-0.5">Aug {slot.date}</span>
                      <span className={`font-mono text-[9px] sm:text-[10px] font-bold block mt-0.5 ${
                        slot.available >= 5 ? "text-success" : "text-ink-muted"
                      }`}>
                        {slot.available}
                      </span>
                    </motion.div>
                  );
                })}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 1.2, duration: 0.4 }}
                className="mt-5 pt-4 border-t border-ink/10 flex items-center gap-2 text-ink-muted"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span className="font-heading text-xs">Best overlap: Aug 15–17 (7 available)</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
