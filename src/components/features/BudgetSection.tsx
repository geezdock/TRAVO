"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Check, AlertTriangle } from "lucide-react";

const budgetGroups = [
  { label: "₹3,500", friends: 2, pct: 25 },
  { label: "₹5,000", friends: 4, pct: 50 },
  { label: "₹6,500", friends: 2, pct: 25 },
];

function AnimatedSavings() {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let start: number | null = null;
    let raf: number;
    function step(t: number) {
      if (!start) start = t;
      const p = Math.min((t - start) / 1200, 1);
      setValue(Math.round(Math.pow(p, 0.6) * 650));
      if (p < 1) raf = requestAnimationFrame(step);
    }
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);
  return <span>₹{value.toLocaleString("en-IN")}</span>;
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.15, ease: [0.25, 0.1, 0.25, 1] as const },
  }),
};

export function BudgetSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [phase, setPhase] = useState<"hidden" | "conflict" | "locked">("hidden");

  useEffect(() => {
    if (!isInView) return;
    setPhase("conflict");
    const timer = setTimeout(() => setPhase("locked"), 2000);
    return () => clearTimeout(timer);
  }, [isInView]);

  return (
    <section ref={ref} className="py-16 sm:py-24 lg:py-32 px-4 bg-surface">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={{ visible: { transition: { staggerChildren: 0.15 } }, hidden: {} }}
            className="flex-1"
          >
            <motion.h2 variants={fadeUp} custom={0} className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink uppercase tracking-tight leading-[1.1]">
              Know the budget
              <br />
              before plans fall apart.
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} className="font-heading text-base sm:text-lg text-ink-light mt-4 max-w-md leading-relaxed">
              Find a budget everyone can agree on.
            </motion.p>
            <motion.div variants={fadeUp} custom={2} className="mt-6 space-y-2.5">
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-success/10 flex items-center justify-center shrink-0"><Check className="w-3 h-3 text-success" /></div>
                <span className="font-heading text-sm sm:text-base text-ink-light">Cost transparency</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-success/10 flex items-center justify-center shrink-0"><Check className="w-3 h-3 text-success" /></div>
                <span className="font-heading text-sm sm:text-base text-ink-light">Budget matching</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-success/10 flex items-center justify-center shrink-0"><Check className="w-3 h-3 text-success" /></div>
                <span className="font-heading text-sm sm:text-base text-ink-light">Conflict detection</span>
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
                <span className="font-mono text-xs font-bold text-ink-muted uppercase tracking-wider">Budget Preferences</span>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={phase === "conflict" ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4 }}
                  className="flex items-center gap-1.5 bg-error/10 border border-error/30 rounded-full px-3 py-1"
                >
                  <AlertTriangle className="w-3 h-3 text-error" />
                  <span className="font-heading text-[11px] font-bold text-error">Conflict Detected</span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={phase === "locked" ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4 }}
                  className="flex items-center gap-1.5 bg-success/10 border border-success/30 rounded-full px-3 py-1"
                >
                  <Check className="w-3 h-3 text-success" />
                  <span className="font-heading text-[11px] font-bold text-success">Budget Locked</span>
                </motion.div>
              </div>

              <div className="flex h-10 rounded-[8px] overflow-hidden border-[2px] border-ink mb-4">
                {budgetGroups.map((g) => (
                  <div
                    key={g.label}
                    style={{ width: `${g.pct}%` }}
                    className="flex items-center justify-center bg-gradient-to-b from-peach-light to-peach-dark border-r last:border-r-0 border-ink"
                  >
                    <span className="font-heading text-xs font-bold text-ink">{g.label}</span>
                  </div>
                ))}
              </div>

              {budgetGroups.map((g) => (
                <div key={g.label} className="flex items-center gap-2 mb-2.5 last:mb-0">
                  <span className="font-mono text-xs font-bold text-ink-muted w-16">{g.label}</span>
                  <div className="flex-1 h-2 rounded-[3px] bg-ink/10 overflow-hidden">
                    <div className="h-full rounded-[3px] bg-ink/30" style={{ width: `${(g.friends / 8) * 100}%` }} />
                  </div>
                  <span className="font-heading text-xs text-ink-light">{g.friends} friends</span>
                </div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={phase === "locked" ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5 }}
                className="mt-5 pt-4 border-t border-ink/10"
              >
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-3xl font-extrabold text-ink">₹5,000</span>
                  <span className="font-heading text-sm text-ink-muted">/person</span>
                </div>
                <div className="flex items-center gap-2 text-success mt-2">
                  <Check className="w-4 h-4" />
                  <span className="font-heading text-sm font-bold">
                    Save <AnimatedSavings /> per person
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
