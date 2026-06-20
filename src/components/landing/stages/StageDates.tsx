"use client";

import { MotionValue, motion, useTransform } from "framer-motion";
import { useStageOpacity } from "./stageUtils";
import { useMemo } from "react";

interface DateSlot {
  date: number;
  day: string;
  available: number;
  friends: { initial: string; color: string }[];
}

function seededRandom(seed: number) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

function generateDateSlots(): DateSlot[] {
  const friendColors = [
    { initial: "R", color: "bg-accent" },
    { initial: "A", color: "bg-peach-dark" },
    { initial: "V", color: "bg-clay" },
    { initial: "S", color: "bg-accent-light" },
    { initial: "M", color: "bg-peach" },
    { initial: "K", color: "bg-clay-light" },
    { initial: "P", color: "bg-peach-dark" },
    { initial: "Ar", color: "bg-accent" },
  ];

  const avails = [3, 6, 7, 5, 2, 0, 4];
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const baseDate = 12;

  return avails.map((count, i) => {
    const shuffled = [...friendColors].sort(() => seededRandom(i * 19) - 0.5);
    return {
      date: baseDate + i,
      day: days[i],
      available: count,
      friends: shuffled.slice(0, count),
    };
  });
}

function DateFriendAvatar({
  friend,
  friendIndex,
  appearDelay,
  localProgress,
}: {
  friend: { initial: string; color: string };
  friendIndex: number;
  appearDelay: number;
  localProgress: MotionValue<number>;
}) {
  const avStart = appearDelay + 0.05 + friendIndex * 0.03;
  const scale = useTransform(localProgress, [avStart, avStart + 0.02], [0, 1]);
  const opacity = useTransform(localProgress, [avStart, avStart + 0.02], [0, 1]);

  return (
    <motion.div
      style={{ scale, opacity }}
      className={`w-5 h-5 rounded-full ${friend.color} flex items-center justify-center ring-[1.5px] ring-white -ml-1 first:ml-0`}
    >
      <span className="text-[7px] font-heading font-bold text-white leading-none">
        {friend.initial}
      </span>
    </motion.div>
  );
}

function DateCell({
  slot,
  index,
  localProgress: lp,
}: {
  slot: DateSlot;
  index: number;
  localProgress: MotionValue<number>;
}) {
  const appearDelay = 0.10 + index * 0.07;
  const opacity = useTransform(lp, [appearDelay, appearDelay + 0.04], [0, 1]);
  const y = useTransform(lp, [appearDelay, appearDelay + 0.04], [20, 0]);

  const selectedRange = [2, 3, 4];

  return (
    <motion.div
      style={{ opacity, y }}
      className={`rounded-[12px] border-[2px] p-1.5 sm:p-3 text-center ${
        selectedRange.includes(index)
          ? "border-accent bg-accent/5"
          : "border-ink/10 bg-white"
      }`}
    >
      <span className="font-mono text-[8px] sm:text-[10px] font-bold text-ink-muted uppercase">
        {slot.day}
      </span>
      <p className="font-display text-sm sm:text-lg font-extrabold text-ink mt-0.5">
        Aug {slot.date}
      </p>
      <div className="flex items-center justify-center gap-0.5 mt-1 sm:mt-2 flex-wrap">
        {slot.friends.slice(0, 4).map((f, i) => (
          <DateFriendAvatar
            key={f.initial + i}
            friend={f}
            friendIndex={i}
            appearDelay={appearDelay}
            localProgress={lp}
          />
        ))}
      </div>
      <span className="font-mono text-[10px] font-bold text-ink-muted mt-1.5 block">
        {slot.available} available
      </span>
    </motion.div>
  );
}

export function StageDates({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>;
}) {
  const start = 0.52;
  const end = 0.65;

  const slots = useMemo(() => generateDateSlots(), []);

  const stageOpacity = useStageOpacity(scrollYProgress, start, end);

  const localProgress = useTransform(scrollYProgress, [start, end], [0, 1]);

  const headlineOpacity = useTransform(localProgress, [0, 0.06], [0, 1]);
  const headlineY = useTransform(localProgress, [0, 0.06], [24, 0]);

  const cardOpacity = useTransform(localProgress, [0, 0.08], [0, 1]);
  const cardY = useTransform(localProgress, [0, 0.08], [30, 0]);

  const lockedOpacity = useTransform(localProgress, [0.75, 0.80], [0, 1]);
  const lockedScale = useTransform(localProgress, [0.75, 0.80], [0.8, 1]);

  const footerOpacity = useTransform(localProgress, [0.65, 0.70], [0, 1]);

  return (
    <motion.div
      style={{ opacity: stageOpacity }}
      className="absolute inset-0 flex items-center justify-center"
    >
      <div className="w-full max-w-3xl mx-auto px-4">
        <motion.div
          style={{ opacity: headlineOpacity, y: headlineY }}
          className="text-center mb-8"
        >
          <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-extrabold text-ink uppercase tracking-tight">
            Find dates that actually work.
          </h2>
        </motion.div>

        <motion.div
          style={{ opacity: cardOpacity, y: cardY }}
          className="border-[3px] border-ink rounded-[16px] bg-white p-3 sm:p-8 shadow-bruted-lg"
        >
          <div className="flex items-center justify-between mb-6">
            <span className="font-mono text-xs font-bold text-ink-muted uppercase tracking-wider">
              August 2026
            </span>
            <motion.div
              style={{ opacity: lockedOpacity, scale: lockedScale }}
              className="flex items-center gap-1.5 bg-success/10 border border-success/30 rounded-full px-3 py-1"
            >
              <svg className="w-4 h-4 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
              <span className="font-heading text-xs font-bold text-success">Aug 15–17 Locked</span>
            </motion.div>
          </div>

          <div className="grid grid-cols-7 gap-1 sm:gap-2">
            {slots.map((slot, i) => (
              <DateCell
                key={slot.date}
                slot={slot}
                index={i}
                localProgress={localProgress}
              />
            ))}
          </div>

          <motion.div
            style={{ opacity: footerOpacity }}
            className="mt-6 pt-4 border-t border-ink/10 flex items-center gap-2 text-ink-muted"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="font-heading text-sm">Best overlap: Aug 15–17 (7/8 available)</span>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
