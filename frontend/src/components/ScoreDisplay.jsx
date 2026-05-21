export default function ScoreDisplay({
  score,
  grade,
  gradeClass,
  issueCount
}) {
  const barColor =
    gradeClass === "excellent"
      ? "bg-emerald-400"
      : gradeClass === "good"
      ? "bg-cyan-400"
      : gradeClass === "fair"
      ? "bg-yellow-400"
      : "bg-red-400";

  return (
    <div className="rounded-3xl border border-white/10 bg-[#10131f] p-6 text-white shadow-2xl">
      <p className="text-sm font-bold uppercase tracking-[0.2em] text-gray-400">
        Posture Score
      </p>

      <div className="mt-4 flex items-end gap-3">
        <h2 className="text-6xl font-black leading-none">
          {score}
        </h2>

        <span className="pb-1 text-lg text-gray-500">
          /100
        </span>
      </div>

      <p className="mt-2 text-xl font-bold text-cyan-300">
        {grade}
      </p>

      <p className="mt-2 text-sm text-gray-500">
        {issueCount} issues detected
      </p>

      <div className="mt-5 h-3 overflow-hidden rounded-full bg-gray-800">
        <div
          className={`h-full rounded-full transition-all duration-500 ${barColor}`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}