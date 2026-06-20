"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Check, Users } from "lucide-react";

const destinations = [
  { name: "Goa", votes: 4, pct: 57 },
  { name: "Gokarna", votes: 2, pct: 29 },
  { name: "Pondicherry", votes: 1, pct: 14 },
];

const voters = [
  { initial: "R", color: "bg-accent" },
  { initial: "A", color: "bg-peach-dark" },
  { initial: "S", color: "bg-clay" },
  { initial: "V", color: "bg-accent-light" },
  { initial: "M", color: "bg-peach" },
  { initial: "K", color: "bg-clay-light" },
  { initial: "P", color: "bg-peach-dark" },
];

function AnimatedBar({ targetPct, delay }: { targetPct: number; delay: number }) {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    let start: number | null = null;
    let raf: number;
    const delayMs = delay * 1000;
    function step(timestamp: number) {
      if (!start) start = timestamp;
      const elapsed = timestamp - start - delayMs;
      if (elapsed < 0) { raf = requestAnimationFrame(step); return; }
      const progress = Math.min(elapsed / 800, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setPct(Math.min(eased * targetPct, 100));
      if (progress < 1) raf = requestAnimationFrame(step);
    }
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [targetPct, delay]);

  return (
    <div className="w-full h-2.5 rounded-[4px] bg-clay-light/40 overflow-hidden">
      <div
        className="h-full rounded-[4px] transition-none"
        style={{ width: `${pct}%`, backgroundColor: pct > 50 ? "#D4836A" : "#C4A99A" }}
      />
    </div>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.15, ease: [0.25, 0.1, 0.25, 1] as const },
  }),
};

export function VotingSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    if (!isInView) return;
    const timer = setTimeout(() => setShowResult(true), 2200);
    return () => clearTimeout(timer);
  }, [isInView]);

  return (
    <section ref={ref} className="py-16 sm:py-24 lg:py-32 px-4 bg-surface-alt">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col lg:flex-row-reverse gap-10 lg:gap-16 items-center">
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={{ visible: { transition: { staggerChildren: 0.15 } }, hidden: {} }}
            className="flex-1"
          >
            <motion.h2 variants={fadeUp} custom={0} className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink uppercase tracking-tight leading-[1.1]">
              Stop debating.
              <br />
              Start voting.
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} className="font-heading text-base sm:text-lg text-ink-light mt-4 max-w-md leading-relaxed">
              Turn endless discussions into clear decisions.
            </motion.p>
            <motion.div variants={fadeUp} custom={2} className="mt-6 space-y-2.5">
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-success/10 flex items-center justify-center shrink-0"><Check className="w-3 h-3 text-success" /></div>
                <span className="font-heading text-sm sm:text-base text-ink-light">Live voting</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-success/10 flex items-center justify-center shrink-0"><Check className="w-3 h-3 text-success" /></div>
                <span className="font-heading text-sm sm:text-base text-ink-light">Anonymous voting</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-success/10 flex items-center justify-center shrink-0"><Check className="w-3 h-3 text-success" /></div>
                <span className="font-heading text-sm sm:text-base text-ink-light">Instant consensus</span>
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
                <span className="font-mono text-xs font-bold text-ink-muted uppercase tracking-wider">Destination Vote</span>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={showResult ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                  className="flex items-center gap-1.5 bg-success/10 border border-success/30 rounded-full px-3 py-1"
                >
                  <Check className="w-3 h-3 text-success" />
                  <span className="font-heading text-[11px] font-bold text-success">Goa Leading</span>
                </motion.div>
              </div>

              <div className="space-y-3.5">
                {destinations.map((dest, i) => (
                  <div key={dest.name}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-heading text-sm font-semibold text-ink shrink-0">{dest.name}</span>
                      <div className="flex-1" />
                      <div className="flex items-center -space-x-1">
                        {voters.slice(0, dest.votes).map((v, vi) => (
                          <motion.div
                            key={vi}
                            initial={{ scale: 0 }}
                            animate={isInView ? { scale: 1 } : {}}
                            transition={{ delay: 0.8 + i * 0.15 + vi * 0.06, type: "spring", stiffness: 500, damping: 16 }}
                            className={`w-4 h-4 rounded-full ${v.color} flex items-center justify-center ring-[1.5px] ring-white`}
                          >
                            <span className="text-[6px] font-heading font-bold text-white">{v.initial}</span>
                          </motion.div>
                        ))}
                      </div>
                      <span className="font-mono text-[11px] font-bold text-ink-muted w-6 text-right tabular-nums">{dest.pct}%</span>
                    </div>
                    <AnimatedBar targetPct={dest.pct} delay={0.3 + i * 0.2} />
                  </div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 1.0, duration: 0.4 }}
                className="mt-5 pt-4 border-t border-ink/10 flex items-center gap-2 text-ink-muted"
              >
                <Users className="w-3.5 h-3.5" />
                <span className="font-heading text-xs">7 friends voted</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
