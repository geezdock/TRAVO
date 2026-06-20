"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Check } from "lucide-react";

const checklist = [
  { label: "Destination chosen", delay: 0.3 },
  { label: "Budget locked", delay: 0.5 },
  { label: "Dates finalized", delay: 0.7 },
  { label: "Friends confirmed", delay: 0.9 },
  { label: "Itinerary generated", delay: 1.1 },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.15, ease: [0.25, 0.1, 0.25, 1] as const },
  }),
};

export function UnifiedDashboardSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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
              Everything in
              <br />
              one place.
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} className="font-heading text-base sm:text-lg text-ink-light mt-4 max-w-md leading-relaxed">
              No more jumping between five different apps.
            </motion.p>
            <motion.div variants={fadeUp} custom={2} className="mt-6 space-y-2.5">
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-success/10 flex items-center justify-center shrink-0"><Check className="w-3 h-3 text-success" /></div>
                <span className="font-heading text-sm sm:text-base text-ink-light">Centralized planning</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-success/10 flex items-center justify-center shrink-0"><Check className="w-3 h-3 text-success" /></div>
                <span className="font-heading text-sm sm:text-base text-ink-light">Real-time collaboration</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-success/10 flex items-center justify-center shrink-0"><Check className="w-3 h-3 text-success" /></div>
                <span className="font-heading text-sm sm:text-base text-ink-light">Ready-to-book experience</span>
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
              <div className="flex items-center justify-between mb-4">
                <span className="font-display text-sm font-extrabold text-ink uppercase tracking-tight">
                  Trip Dashboard
                </span>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ delay: 1.5, type: "spring", stiffness: 400, damping: 15 }}
                  className="border-[2px] border-success/30 rounded-full px-2.5 py-0.5"
                >
                  <span className="font-mono text-[10px] font-bold text-success">Ready to Book</span>
                </motion.div>
              </div>

              <div className="space-y-2">
                {checklist.map((item) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -12 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{
                      delay: item.delay,
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                    }}
                    className="flex items-center gap-3 border-[2px] border-ink/10 rounded-[8px] p-3 bg-surface"
                  >
                    <div className="w-6 h-6 rounded-full bg-success flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className="font-heading text-sm font-semibold text-ink">{item.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
