"use client";

import { Suspense, use, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

function ConsentContent({ code }: { code: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const ref = searchParams.get("ref") || "";

  const [decided, setDecided] = useState<"approved" | "rejected" | null>(null);

  if (decided) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="brut-card w-full max-w-md text-center space-y-4"
        >
          <div
            className={`mx-auto w-16 h-16 rounded-bruted-lg border-2 border-ink flex items-center justify-center ${
              decided === "approved" ? "bg-success" : "bg-error"
            }`}
          >
            {decided === "approved" ? (
              <Check className="w-8 h-8 text-white" />
            ) : (
              <X className="w-8 h-8 text-white" />
            )}
          </div>
          <p className="font-display text-2xl font-bold text-ink">
            {decided === "approved" ? "Trip Approved" : "Trip Rejected"}
          </p>
          <p className="font-heading text-sm text-ink-muted">
            {decided === "approved"
              ? "The squad has been notified. Have a safe trip!"
              : "The squad has been notified of your decision."}
          </p>
          <button
            onClick={() => router.push("/")}
            className="brut-btn w-full text-sm"
          >
            Done
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
        <div className="text-center space-y-2">
          <p className="font-display text-2xl font-bold text-ink">
            Trip Consent Request
          </p>
          <p className="font-heading text-sm text-ink-muted">
            A guardian approval is needed for this trip.
          </p>
        </div>

        <div className="brut-card !p-4 !shadow-bruted-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-heading text-sm text-ink-muted">Trip</span>
            <span className="font-mono text-sm font-bold text-ink">Goa Weekend Trip</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-heading text-sm text-ink-muted">Dates</span>
            <span className="font-mono text-sm text-ink">Aug 15–17, 2026</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-heading text-sm text-ink-muted">Budget</span>
            <span className="font-mono text-sm text-ink">₹5,000/person</span>
          </div>
          {ref && (
            <div className="flex items-center justify-between">
              <span className="font-heading text-sm text-ink-muted">Requested by</span>
              <span className="font-mono text-sm text-ink">{ref}</span>
            </div>
          )}
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setDecided("rejected")}
            className="flex-1 brut-btn text-sm !bg-surface-card !text-ink hover:!bg-surface-alt"
          >
            Reject
          </button>
          <button
            onClick={() => setDecided("approved")}
            className="flex-1 brut-btn text-sm"
          >
            Approve
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default function ConsentPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = use(params);

  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="brut-card w-full max-w-md space-y-4">
            <div className="w-48 h-6 mx-auto bg-surface-alt rounded animate-pulse" />
            <div className="w-full h-24 bg-surface-alt rounded animate-pulse" />
          </div>
        </div>
      }
    >
      <ConsentContent code={code} />
    </Suspense>
  );
}
