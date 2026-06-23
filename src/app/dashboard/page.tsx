import { Suspense } from "react";
import { DashboardView } from "@/components/dashboard/DashboardView";

export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen">
          <header className="border-b-2 border-ink bg-surface-card">
            <div className="max-w-6xl mx-auto px-4 py-0 flex items-center h-16">
              <span className="font-display text-xl font-bold text-ink">VOYAQ</span>
            </div>
          </header>
          <main className="max-w-6xl mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-6">
              <div className="w-48 h-8 bg-surface-alt rounded animate-pulse" />
              <div className="w-40 h-10 bg-surface-alt rounded animate-pulse" />
            </div>
          </main>
        </div>
      }
    >
      <DashboardView />
    </Suspense>
  );
}
