"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Check, Sparkles, Umbrella, Wallet, Music, MapPin } from "lucide-react";

const tags = [
  { label: "Beach", icon: Umbrella },
  { label: "Budget Friendly", icon: Wallet },
  { label: "Nightlife", icon: Music },
  { label: "Road Trip", icon: MapPin },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.15, ease: [0.25, 0.1, 0.25, 1] as const },
  }),
};

export function AITripBuilderSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [progress, setProgress] = useState(0);
  const [showOutput, setShowOutput] = useState(false);
  const [showTags, setShowTags] = useState(false);

  useEffect(() => {
    if (!isInView) return;
    let start: number | null = null;
    let raf: number;
    function step(t: number) {
      if (!start) start = t;
      const elapsed = t - start;
      const p = Math.min(elapsed / 2500, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setProgress(Math.round(eased * 100));
      if (p < 1) { raf = requestAnimationFrame(step); }
    }
    raf = requestAnimationFrame(step);
    const timer1 = setTimeout(() => setShowOutput(true), 2800);
    const timer2 = setTimeout(() => setShowTags(true), 3200);
    return () => { cancelAnimationFrame(raf); clearTimeout(timer1); clearTimeout(timer2); };
  }, [isInView]);

  return (
    <section ref={ref} className="py-16 sm:py-24 lg:py-32 px-4 bg-surface">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col lg:flex-row-reverse gap-10 lg:gap-16 items-center">
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={{ visible: { transition: { staggerChildren: 0.15 } }, hidden: {} }}
            className="flex-1"
          >
            <motion.h2 variants={fadeUp} custom={0} className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink uppercase tracking-tight leading-[1.1]">
              Let AI build
              <br />
              the trip.
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} className="font-heading text-base sm:text-lg text-ink-light mt-4 max-w-md leading-relaxed">
              Once the group agrees, VOYAQ creates the plan.
            </motion.p>
            <motion.div variants={fadeUp} custom={2} className="mt-6 space-y-2.5">
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-success/10 flex items-center justify-center shrink-0"><Check className="w-3 h-3 text-success" /></div>
                <span className="font-heading text-sm sm:text-base text-ink-light">Personalized itineraries</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-success/10 flex items-center justify-center shrink-0"><Check className="w-3 h-3 text-success" /></div>
                <span className="font-heading text-sm sm:text-base text-ink-light">Budget-aware recommendations</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-success/10 flex items-center justify-center shrink-0"><Check className="w-3 h-3 text-success" /></div>
                <span className="font-heading text-sm sm:text-base text-ink-light">Instant trip planning</span>
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
              <div className="flex items-center gap-3 mb-5">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="w-9 h-9 rounded-[8px] bg-accent border-[2px] border-ink flex items-center justify-center shrink-0"
                >
                  <Sparkles className="w-4 h-4 text-white" />
                </motion.div>
                <div className="flex-1">
                  <p className="font-heading text-sm font-bold text-ink">Generating itinerary</p>
                  <div className="w-full h-2 rounded-[3px] bg-ink/10 overflow-hidden mt-1.5">
                    <div
                      className="h-full rounded-[3px] bg-gradient-to-r from-accent to-accent-dark transition-none"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
                <span className="font-mono text-xs font-bold text-ink-muted tabular-nums">{progress}%</span>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={showOutput ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5 }}
                className="mb-5"
              >
                <div className="border-[2px] border-ink rounded-[10px] bg-peach-light/30 p-4">
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-3xl font-extrabold text-ink">3 Days</span>
                    <span className="font-heading text-sm text-ink-muted ml-2">· 12 Stops</span>
                    <span className="font-heading text-sm text-ink-muted">· ₹4,850/person</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={showTags ? { opacity: 1 } : {}}
                transition={{ duration: 0.4 }}
              >
                <span className="font-mono text-[10px] font-bold text-ink-muted uppercase tracking-wider block mb-2">
                  AI Suggestions
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {tags.map((tag, i) => (
                    <motion.div
                      key={tag.label}
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={showTags ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: i * 0.08, type: "spring", stiffness: 400, damping: 16 }}
                      className="flex items-center gap-1 border-[2px] border-ink rounded-full px-2.5 py-1 bg-peach-light"
                    >
                      <tag.icon className="w-3 h-3 text-accent" />
                      <span className="font-mono text-[10px] font-bold text-ink leading-none">{tag.label}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
