"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Users, ArrowLeft, Check } from "lucide-react";
import { mockSquads } from "@/lib/mock";

export default function JoinPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = use(params);
  const router = useRouter();
  const [joined, setJoined] = useState(false);

  const squad = mockSquads.find((s) => s.inviteCode === code);

  if (!squad) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="brut-card w-full max-w-md text-center space-y-4">
          <p className="font-display text-2xl font-bold text-ink">
            Squad not found
          </p>
          <p className="font-heading text-sm text-ink-muted">
            This invite link may have expired or is invalid.
          </p>
          <button
            onClick={() => router.push("/")}
            className="brut-btn w-full text-sm"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  const isFull = squad.members.length >= squad.memberLimit;
  const alreadyJoined = squad.members.some((m) => m.id === "me");

  function handleJoin() {
    setJoined(true);
  }

  if (joined) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="brut-card w-full max-w-md text-center space-y-4"
        >
          <div className="mx-auto w-16 h-16 rounded-bruted-lg border-2 border-ink flex items-center justify-center bg-success">
            <Check className="w-8 h-8 text-white" />
          </div>
          <p className="font-display text-2xl font-bold text-ink">
            You&apos;re in!
          </p>
          <p className="font-heading text-sm text-ink-muted">
            Welcome to <span className="font-bold text-ink">{squad.name}</span>
          </p>
          <button
            onClick={() => router.push("/dashboard")}
            className="brut-btn w-full text-sm"
          >
            Go to Dashboard
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="brut-card w-full max-w-md space-y-6"
      >
        <button
          onClick={() => router.push("/")}
          className="flex items-center gap-1.5 font-heading text-sm font-semibold text-ink-muted hover:text-ink transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Home
        </button>

        <div className="text-center space-y-2">
          <div className="mx-auto w-14 h-14 rounded-bruted-lg border-2 border-ink flex items-center justify-center bg-peach">
            <Users className="w-7 h-7 text-ink" />
          </div>
          <p className="font-display text-2xl font-bold text-ink">
            Join {squad.name}
          </p>
          {squad.destination && (
            <p className="font-mono text-sm text-ink-muted">
              {squad.destination}
            </p>
          )}
        </div>

        <div className="brut-card !p-4 !shadow-bruted-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-heading text-sm text-ink-muted">Members</span>
            <span className="font-mono text-sm font-bold text-ink">
              {squad.members.length} / {squad.memberLimit}
            </span>
          </div>
          <div className="flex items-center gap-1">
            {squad.members.slice(0, 8).map((m) => (
              <div
                key={m.id}
                className={`w-7 h-7 rounded-full ${m.color} flex items-center justify-center ring-2 ring-white`}
              >
                <span className="text-xs font-heading font-bold text-white">
                  {m.initial}
                </span>
              </div>
            ))}
          </div>
        </div>

        {alreadyJoined ? (
          <div className="brut-card !p-3 !shadow-bruted-sm bg-surface-alt text-center">
            <p className="font-heading text-sm text-ink-muted">
              You&apos;re already in this squad
            </p>
          </div>
        ) : isFull ? (
          <div className="brut-card !p-3 !shadow-bruted-sm bg-surface-alt text-center">
            <p className="font-heading text-sm text-ink-muted">
              This squad is full
            </p>
          </div>
        ) : (
          <button onClick={handleJoin} className="brut-btn w-full text-base">
            Join Squad
          </button>
        )}
      </motion.div>
    </div>
  );
}
