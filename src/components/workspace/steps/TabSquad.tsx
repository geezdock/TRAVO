"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check, Users, X } from "lucide-react";
import type { Squad } from "@/types/squad";

interface TabSquadProps {
  squad: Squad;
  onUpdate: (squad: Squad) => void;
}

export function TabSquad({ squad, onUpdate }: TabSquadProps) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    const url = `${window.location.origin}/join/${squad.inviteCode}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleRemove(memberId: string) {
    onUpdate({
      ...squad,
      members: squad.members.filter((m) => m.id !== memberId),
    });
  }

  return (
    <div className="max-w-lg space-y-6">
      <div className="border-[3px] border-ink rounded-[16px] bg-white shadow-bruted-lg overflow-hidden">
        <div className="bg-ink px-4 py-5 flex items-center gap-3">
          <Users className="w-5 h-5 text-accent shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="font-display text-sm font-bold text-surface leading-tight">
              Squad Invite
            </p>
            <p className="font-mono text-[11px] text-surface/60 truncate">
              voyaq.com/join/{squad.inviteCode}
            </p>
          </div>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 border-[2px] border-surface/30 rounded-[8px] px-3 py-2 min-h-[36px] hover:bg-surface/10 transition-colors"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-success" />
            ) : (
              <Copy className="w-3.5 h-3.5 text-surface" />
            )}
            <span className="font-mono text-[10px] font-bold text-surface uppercase tracking-wider">
              {copied ? "Copied" : "Copy"}
            </span>
          </button>
        </div>

        <div className="p-5">
          <div className="flex items-center justify-between mb-4">
            <span className="font-mono text-xs font-bold text-ink-muted uppercase tracking-wider">
              Members
            </span>
            <span className="font-mono text-[11px] font-bold text-ink-muted tabular-nums">
              {squad.members.length}/{squad.memberLimit}
            </span>
          </div>

          <div className="space-y-2">
            {squad.members.map((member, i) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04, duration: 0.3 }}
                className="flex items-center gap-3 border-[1.5px] border-ink/10 rounded-[10px] p-2.5"
              >
                <div
                  className={`w-8 h-8 rounded-full ${member.color} flex items-center justify-center ring-2 ring-white shrink-0`}
                >
                  <span className="text-xs font-heading font-bold text-white">
                    {member.initial}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-heading text-sm font-bold text-ink">
                    {member.name}
                  </p>
                  <p className="font-mono text-[10px] text-ink-muted">
                    {member.id === "me" ? "You" : "Joined"}
                  </p>
                </div>
                {member.id !== "me" && (
                  <button
                    onClick={() => handleRemove(member.id)}
                    className="min-h-[44px] min-w-[44px] flex items-center justify-center hover:bg-error/10 rounded transition-colors"
                  >
                    <X className="w-4 h-4 text-ink-muted hover:text-error" />
                  </button>
                )}
              </motion.div>
            ))}
          </div>

          {squad.members.length < squad.memberLimit && (
            <p className="mt-4 font-mono text-xs text-ink-muted text-center">
              Share the invite link to add more members
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
