export default function ScoreDisplay({ score, grade, gradeClass, issueCount }) {
  const barColor =
    gradeClass === "excellent"
      ? "bg-teal-400"
      : gradeClass === "good"
        ? "bg-blue-400"
        : gradeClass === "fair"
          ? "bg-yellow-400"
          : "bg-red-400";

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/30 backdrop-blur">
      <p className="text-sm font-black uppercase tracking-[0.25em] text-gray-400">
        Posture Score
      </p>

      <div className="mt-4 flex items-end gap-3">
        <h2 className="text-7xl font-black leading-none text-white transition-all duration-500">
          {score}
        </h2>
        <span className="pb-2 text-xl font-bold text-gray-500">/100</span>
      </div>

      <p className="mt-3 text-2xl font-bold text-teal-300">{grade}</p>

      <p className="mt-2 text-sm text-gray-500">
        {issueCount} issues detected
      </p>

      <div className="mt-6 h-4 w-full overflow-hidden rounded-full bg-gray-800">
        <div
          className={`h-full rounded-full transition-all duration-500 ${barColor}`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}