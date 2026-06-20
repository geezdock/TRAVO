"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Check, X } from "lucide-react";

const withoutApps = [
  "WhatsApp", "Google Sheets", "Notes App",
  "Splitwise", "Instagram Reels", "Google Docs",
];

const withItems = [
  "Destination", "Budget", "Dates", "Squad", "Itinerary",
];

export function ComparisonSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-16 sm:py-24 lg:py-32 px-4 bg-surface">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="border-[3px] border-error/40 rounded-[16px] p-6 sm:p-8 bg-white/60"
          >
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 rounded-full bg-error/10 flex items-center justify-center">
                <X className="w-4 h-4 text-error" />
              </div>
              <span className="font-display text-lg font-extrabold text-error uppercase tracking-tight">
                Without VOYAQ
              </span>
            </div>

            <div className="space-y-2">
              {withoutApps.map((app, i) => (
                <motion.div
                  key={app}
                  initial={{ opacity: 0, x: -20 + (i % 2 === 0 ? 10 : -5), rotate: i % 3 === 0 ? -2 : 1 }}
                  animate={isInView ? { opacity: 1, x: 0, rotate: 0 } : {}}
                  transition={{
                    delay: 0.15 + i * 0.08,
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                  }}
                  className="border-[2px] border-error/20 rounded-[8px] px-3 py-2.5 bg-white"
                >
                  <span className="font-heading text-sm font-medium text-ink-light">{app}</span>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.8, duration: 0.4 }}
              className="mt-5 pt-4 border-t border-error/20"
            >
              <span className="font-heading text-xs text-error/70 uppercase tracking-wider font-bold">
                Messy · Disconnected · Chaotic
              </span>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="border-[3px] border-success/40 rounded-[16px] p-6 sm:p-8 bg-white/60"
          >
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center">
                <Check className="w-4 h-4 text-success" />
              </div>
              <span className="font-display text-lg font-extrabold text-success uppercase tracking-tight">
                With VOYAQ
              </span>
            </div>

            <div className="space-y-2">
              {withItems.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{
                    delay: 0.35 + i * 0.08,
                    type: "spring",
                    stiffness: 300,
                    damping: 18,
                  }}
                  className="border-[2px] border-success/20 rounded-[8px] px-3 py-2.5 bg-white flex items-center gap-2.5"
                >
                  <Check className="w-3.5 h-3.5 text-success shrink-0" />
                  <span className="font-heading text-sm font-semibold text-ink">{item}</span>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 1.0, duration: 0.4 }}
              className="mt-5 pt-4 border-t border-success/20"
            >
              <span className="font-heading text-xs text-success/70 uppercase tracking-wider font-bold">
                Single clean dashboard
              </span>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center mt-10 sm:mt-14"
        >
          <span className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-ink uppercase tracking-tight">
            One trip.
            <br className="sm:hidden" />
            {" "}One workspace.
          </span>
        </motion.div>
      </div>
    </section>
  );
}
