"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export default function JoinPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = use(params);
  const router = useRouter();

  // Redirect to dashboard with join code
  // The dashboard will handle the actual join logic
  router.replace(`/dashboard?join=${code}`);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="brut-card w-full max-w-md text-center space-y-4"
      >
        <Loader2 className="w-8 h-8 text-accent mx-auto animate-spin" />
        <p className="font-display text-xl font-bold text-ink">
          Joining squad...
        </p>
        <p className="font-heading text-sm text-ink-muted">
          Redirecting you to the dashboard.
        </p>
      </motion.div>
    </div>
  );
}
