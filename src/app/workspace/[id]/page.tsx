"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { WorkspaceView } from "@/components/workspace/WorkspaceView";
import { useSquad } from "@/lib/SquadContext";

export default function WorkspacePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { getSquad, updateSquad } = useSquad();

  const squad = getSquad(id);

  if (!squad) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="brut-card w-full max-w-md text-center space-y-4">
          <h1 className="font-display text-2xl font-bold text-ink">
            Squad not found
          </h1>
          <p className="font-heading text-sm text-ink-muted">
            This squad doesn&apos;t exist or has been removed.
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
    <div className="min-h-screen">
      <main className="max-w-6xl mx-auto px-4 py-8">
        <WorkspaceView
          squad={squad}
          onBack={() => router.push("/dashboard")}
          onUpdate={updateSquad}
        />
      </main>
    </div>
  );
}
