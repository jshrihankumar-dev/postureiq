export default function IssuesList({
  issues,
  cameraActive,
  isAnalyzing,
  hasResults
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-[#10131f] p-6 text-white shadow-2xl">
      <h2 className="text-xl font-black">Detected Issues</h2>

      {!hasResults && !cameraActive ? (
        <p className="mt-4 text-gray-500">Enable camera to begin</p>
      ) : isAnalyzing ? (
        <p className="mt-4 text-cyan-300">Analyzing...</p>
      ) : issues.length === 0 ? (
        <div className="mt-4 inline-flex rounded-full bg-emerald-500/20 px-4 py-2 text-sm font-bold text-emerald-300">
          Posture looks good
        </div>
      ) : (
        <div className="mt-4 flex flex-wrap gap-3">
          {issues.map((issue) => (
            <div
              key={issue.key}
              className={`rounded-full px-4 py-2 text-sm font-bold ${
                issue.severity === "severe"
                  ? "bg-red-500/20 text-red-300"
                  : "bg-yellow-500/20 text-yellow-300"
              }`}
            >
              {issue.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}