"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

interface Particle {
  x: number;
  size: number;
  delay: number;
  duration: number;
  color: string;
}

function seededRandom(seed: number) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

function generateParticles(): Particle[] {
  const colors = ["bg-accent/30", "bg-accent-light/30", "bg-peach/30", "bg-clay/30", "bg-surface/20"];
  return Array.from({ length: 30 }, (_, i) => ({
    x: Math.round(seededRandom(i * 7) * 100 * 100) / 100,
    size: Math.round((4 + seededRandom(i * 11) * 8) * 100) / 100,
    delay: Math.round(seededRandom(i * 5) * 3 * 100) / 100,
    duration: Math.round((4 + seededRandom(i * 17) * 4) * 100) / 100,
    color: colors[i % colors.length],
  }));
}

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

export function FinalCTASection() {
  const router = useRouter();
  const particles = useMemo(() => generateParticles(), []);

  return (
    <section className="relative min-h-[70vh] sm:min-h-dvh bg-ink flex items-center justify-center overflow-hidden px-4 py-16">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className={`absolute ${p.color} rounded-sm`}
          style={{
            left: `${p.x}%`,
            width: p.size,
            height: p.size * 0.6,
            bottom: "-10%",
          }}
          animate={{
            y: ["0vh", "-120vh"],
            rotate: [0, 360],
            opacity: [0.6, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="max-w-3xl mx-auto text-center relative z-10"
      >
        <motion.span
          variants={fadeUp}
          className="font-mono text-xs sm:text-sm font-bold text-surface/40 uppercase tracking-widest block mb-4"
        >
          From
        </motion.span>

        <motion.h2
          variants={fadeUp}
          className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold text-surface uppercase leading-[1.1] tracking-tight"
        >
          &ldquo;We should go
          <br />
          somewhere&rdquo;
          <br />
          <span className="text-accent">To</span>
          <br />
          &ldquo;See you in Goa.&rdquo;
        </motion.h2>

        <motion.p
          variants={fadeUp}
          className="font-heading text-base sm:text-lg text-surface/50 mt-6 max-w-lg mx-auto leading-relaxed"
        >
          The easiest way for friends to plan trips together.
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-8 sm:mt-10"
        >
          <button
            onClick={() => router.push("/auth")}
            className="brut-btn bg-accent hover:bg-accent-dark text-white font-display font-bold uppercase text-sm h-12 px-8 shadow-bruted w-full sm:w-auto"
          >
            Start a Squad
          </button>
          <button className="border-[2px] border-surface/30 text-surface font-display font-bold uppercase text-sm h-12 px-8 rounded-bruted hover:bg-surface/10 transition-colors w-full sm:w-auto">
            See How It Works
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
