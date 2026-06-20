"use client";

import { motion } from "framer-motion";

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2, delayChildren: 0.2 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

export function FeaturesHeader() {
  return (
    <section className="min-h-[60vh] sm:min-h-dvh flex items-center justify-center px-4 py-20">
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto text-center"
      >
        <motion.h1
          variants={fadeUp}
          className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold uppercase text-ink leading-[1.05] tracking-tight"
        >
          Everything You Need
          <br />
          Before You Book.
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="font-heading text-base sm:text-lg lg:text-xl text-ink-light mt-6 sm:mt-8 max-w-2xl mx-auto leading-relaxed"
        >
          Stop switching between WhatsApp, spreadsheets, notes, polls, and
          planning apps.
          <br className="hidden sm:block" />
          VOYAQ brings every pre-booking decision into one place.
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="mt-10 sm:mt-12 flex justify-center"
        >
          <div className="h-1 w-16 sm:w-24 bg-accent rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
