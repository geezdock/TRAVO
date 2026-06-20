"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const promises = [
  { line1: "NO MORE", line2: "200 Message\nGroup Chats", color: "bg-accent/10 border-accent/30" },
  { line1: "NO MORE", line2: "Who's Coming?", color: "bg-error/10 border-error/30" },
  { line1: "NO MORE", line2: "We'll See", color: "bg-warning/10 border-warning/30" },
  { line1: "NO MORE", line2: "Last-Minute\nCancellations", color: "bg-clay/10 border-clay/30" },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.12, ease: [0.25, 0.1, 0.25, 1] as const },
  }),
};

export function PromiseSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-16 sm:py-24 lg:py-32 px-4 bg-surface-alt">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center mb-10 sm:mb-14"
        >
          <span className="font-mono text-xs font-bold text-ink-muted uppercase tracking-widest">
            The VOYAQ Promise
          </span>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {promises.map((promise, i) => (
            <motion.div
              key={promise.line2}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className={`border-[3px] border-ink rounded-[16px] p-6 sm:p-8 shadow-bruted-lg ${promise.color} bg-white`}
            >
              <span className="font-mono text-[10px] font-bold text-ink-muted uppercase tracking-wider block mb-3">
                {promise.line1}
              </span>
              <span className="font-display text-xl sm:text-2xl lg:text-3xl font-extrabold text-ink uppercase leading-[1.15] whitespace-pre-line">
                {promise.line2}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
