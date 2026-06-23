"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { TripView } from "@/components/trip/TripView";
import { useSquad } from "@/lib/SquadContext";

export default function TripPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { getSquad } = useSquad();

  const squad = getSquad(id);

  if (!squad) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="brut-card w-full max-w-md text-center space-y-4">
          <h1 className="font-display text-2xl font-bold text-ink">
            Trip not found
          </h1>
          <p className="font-heading text-sm text-ink-muted">
            This trip doesn&apos;t exist or has been removed.
          </p>
          <button
            onClick={() => router.push("/dashboard")}
            className="brut-btn text-sm"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <TripView
      squad={squad}
      onBack={() => router.push("/dashboard")}
    />
  );
}
