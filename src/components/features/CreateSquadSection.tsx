"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Check, Link, Users } from "lucide-react";

const friends = [
  { initial: "R", color: "bg-accent", name: "Rahul" },
  { initial: "A", color: "bg-peach-dark", name: "Ananya" },
  { initial: "S", color: "bg-clay", name: "Siddharth" },
  { initial: "V", color: "bg-accent-light", name: "Vivek" },
  { initial: "M", color: "bg-peach", name: "Mrunal" },
  { initial: "K", color: "bg-clay-light", name: "Karthik" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.15, ease: [0.25, 0.1, 0.25, 1] as const },
  }),
};

function FriendAvatar({
  friend,
  index,
  visible,
}: {
  friend: { initial: string; color: string; name: string };
  index: number;
  visible: boolean;
}) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={visible ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
      transition={{
        delay: 0.3 + index * 0.12,
        type: "spring",
        stiffness: 400,
        damping: 18,
      }}
      className="flex items-center gap-1.5 border-[2px] border-ink rounded-full pr-2.5 overflow-hidden bg-white"
    >
      <div
        className={`w-5 h-5 sm:w-6 sm:h-6 ${friend.color} flex items-center justify-center text-[9px] sm:text-[10px] font-heading font-bold text-white shrink-0`}
      >
        {friend.initial}
      </div>
      <span className="font-heading text-[10px] sm:text-[11px] font-semibold text-ink leading-none pt-px">
        {friend.name}
      </span>
    </motion.div>
  );
}

export function CreateSquadSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [memberCount, setMemberCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const timer = setTimeout(() => setMemberCount(6), 1800);
    return () => clearTimeout(timer);
  }, [isInView]);

  return (
    <section ref={ref} className="py-16 sm:py-24 lg:py-32 px-4 bg-surface">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={{
              visible: { transition: { staggerChildren: 0.15 } },
              hidden: {},
            }}
            className="flex-1"
          >
            <motion.h2
              variants={fadeUp}
              custom={0}
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink uppercase tracking-tight leading-[1.1]"
            >
              Create a Squad
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={1}
              className="font-heading text-base sm:text-lg text-ink-light mt-4 max-w-md leading-relaxed"
            >
              Start a trip in seconds and invite friends with a single link.
            </motion.p>

            <motion.div
              variants={fadeUp}
              custom={2}
              className="mt-6 space-y-2.5"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-success/10 flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 text-success" />
                </div>
                <span className="font-heading text-sm sm:text-base text-ink-light">
                  Invite with one link
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-success/10 flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 text-success" />
                </div>
                <span className="font-heading text-sm sm:text-base text-ink-light">
                  Shared planning space
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-success/10 flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 text-success" />
                </div>
                <span className="font-heading text-sm sm:text-base text-ink-light">
                  Real-time updates
                </span>
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
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-accent" />
                  <span className="font-display text-sm font-extrabold text-ink uppercase tracking-tight">
                    Your Squad
                  </span>
                </div>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ delay: 1.5, type: "spring", stiffness: 400, damping: 15 }}
                  className="flex items-center gap-1"
                >
                  <span className="font-display text-lg font-extrabold text-accent">
                    {memberCount}
                  </span>
                  <span className="font-heading text-xs text-ink-muted">/8</span>
                </motion.div>
              </div>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {friends.map((f, i) => (
                  <FriendAvatar
                    key={f.name}
                    friend={f}
                    index={i}
                    visible={isInView}
                  />
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1.0, duration: 0.4 }}
                className="flex items-center gap-2 border-[2px] border-ink rounded-[8px] px-3 py-2.5 bg-surface"
              >
                <Link className="w-4 h-4 text-ink-muted shrink-0" />
                <span className="font-mono text-xs text-ink-muted flex-1 truncate">
                  voyaq.in/join/goa-trip
                </span>
                <span className="font-heading text-[11px] font-bold text-accent uppercase shrink-0">
                  Copy Link
                </span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
