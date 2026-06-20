"use client";

import { MotionValue, motion, useTransform } from "framer-motion";

const stages = [
  { label: "Chaos", start: 0, end: 0.20 },
  { label: "Vote", start: 0.20, end: 0.37 },
  { label: "Budget", start: 0.37, end: 0.52 },
  { label: "Dates", start: 0.52, end: 0.65 },
  { label: "AI", start: 0.65, end: 0.78 },
  { label: "Trip", start: 0.78, end: 0.90 },
  { label: "Go", start: 0.90, end: 1.0 },
];

function StageTick({
  label,
  start,
  end,
  scrollYProgress,
}: {
  label: string;
  start: number;
  end: number;
  scrollYProgress: MotionValue<number>;
}) {
  const midpoint = (start + end) / 2;
  const halfSpan = (end - start) / 2;
  const fade = 0.03;

  const opacity = useTransform(scrollYProgress, (v: number) => {
    const dist = Math.abs(v - midpoint);
    const active = halfSpan + fade;
    if (dist > active) return 0.3;
    if (dist > active - fade)
      return 0.3 + 0.7 * ((active - dist) / fade);
    return 1;
  });

  const barOpacity = useTransform(scrollYProgress, (v: number) => {
    if (v < start) return 0;
    if (v < end) return (v - start) / (end - start);
    return 1;
  });

  return (
    <div className="flex-1 flex flex-col items-center gap-1 min-w-0">
      <motion.span
        style={{ opacity }}
        className="font-mono text-[9px] sm:text-[10px] font-bold uppercase leading-none truncate w-full text-center"
      >
        {label}
      </motion.span>
      <div className="w-full h-[3px] bg-ink/10 rounded-full overflow-hidden">
        <motion.div
          style={{ scaleX: barOpacity, transformOrigin: "left" }}
          className="h-full rounded-full bg-accent"
        />
      </div>
    </div>
  );
}

export function StageTracker({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>;
}) {
  return (
    <nav className="absolute bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-t-[1.5px] border-ink/10 px-2 sm:px-4 py-2">
      <div className="max-w-3xl mx-auto flex items-center gap-1 sm:gap-2">
        {stages.map((stage) => (
          <StageTick
            key={stage.label}
            label={stage.label}
            start={stage.start}
            end={stage.end}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </div>
    </nav>
  );
}
