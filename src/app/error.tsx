"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="brut-card w-full max-w-md text-center space-y-6"
      >
        <div className="space-y-2">
          <p className="font-display text-2xl font-bold text-ink">
            Something went wrong
          </p>
          <p className="font-heading text-sm text-ink-muted">
            {error.message || "An unexpected error occurred."}
          </p>
          {error.digest && (
            <p className="font-mono text-xs text-ink-muted/60">
              Error ID: {error.digest}
            </p>
          )}
        </div>

        <div className="flex gap-3">
          <button onClick={reset} className="flex-1 brut-btn text-sm">
            Try Again
          </button>
          <Link
            href="/"
            className="flex-1 brut-btn text-sm !bg-surface-card !text-ink !shadow-bruted-sm hover:!shadow-bruted text-center"
          >
            Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
