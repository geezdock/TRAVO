export default function AuthLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="brut-card w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <div className="mx-auto w-16 h-16 rounded-bruted-lg bg-surface-alt animate-pulse" />
          <div className="w-48 h-6 mx-auto bg-surface-alt rounded animate-pulse" />
          <div className="w-32 h-4 mx-auto bg-surface-alt rounded animate-pulse" />
        </div>

        <div className="space-y-3">
          <div className="w-full h-12 bg-surface-alt rounded animate-pulse" />
          <div className="w-full h-12 bg-surface-alt rounded animate-pulse" />
        </div>

        <div className="flex justify-center gap-2 pt-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-surface-alt animate-pulse"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
