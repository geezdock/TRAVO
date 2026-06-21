export default function DashboardLoading() {
  return (
    <div className="min-h-screen">
      <header className="border-b-2 border-ink bg-surface-card">
        <div className="max-w-6xl mx-auto px-4 py-0 flex items-center h-16">
          <div className="w-32 h-4 bg-surface-alt rounded animate-pulse" />
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="w-48 h-8 bg-surface-alt rounded animate-pulse" />
            <div className="w-40 h-10 bg-surface-alt rounded animate-pulse" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="brut-card space-y-4">
                <div className="w-3/4 h-5 bg-surface-alt rounded animate-pulse" />
                <div className="w-1/2 h-4 bg-surface-alt rounded animate-pulse" />
                <div className="flex gap-2">
                  {[1, 2, 3].map((j) => (
                    <div
                      key={j}
                      className="w-8 h-8 rounded-full bg-surface-alt animate-pulse"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
