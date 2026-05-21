export default function IssuesList({ issues, cameraActive, isAnalyzing }) {
  if (!cameraActive) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/30">
        <h2 className="text-xl font-black text-white">Detected Issues</h2>
        <p className="mt-4 text-gray-500">Enable camera to begin.</p>
      </div>
    );
  }

  if (isAnalyzing) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/30">
        <h2 className="text-xl font-black text-white">Detected Issues</h2>
        <p className="mt-4 text-teal-300">Analyzing...</p>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/30">
      <h2 className="text-xl font-black text-white">Detected Issues</h2>

      {issues.length === 0 ? (
        <p className="mt-4 inline-block rounded-full bg-teal-400/15 px-4 py-2 text-sm font-bold text-teal-300">
          Posture looks good!
        </p>
      ) : (
        <div className="mt-4 flex flex-wrap gap-3">
          {issues.map((issue) => {
            const badgeColor =
              issue.severity === "severe"
                ? "bg-red-400/15 text-red-300"
                : "bg-yellow-400/15 text-yellow-300";

            return (
              <div
                key={issue.key}
                className={`rounded-full px-4 py-2 text-sm font-bold ${badgeColor}`}
              >
                {issue.label}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}