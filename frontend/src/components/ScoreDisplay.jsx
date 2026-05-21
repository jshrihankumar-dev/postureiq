export default function ScoreDisplay({ score, grade, gradeClass, issueCount }) {
  const barColor =
    gradeClass === "excellent"
      ? "bg-teal-500"
      : gradeClass === "good"
        ? "bg-blue-500"
        : gradeClass === "fair"
          ? "bg-yellow-500"
          : "bg-red-500";

  return (
    <div className="rounded-2xl bg-white p-6 shadow-lg">
      <p className="text-sm font-medium text-gray-500">Posture Score</p>

      <div className="mt-2 text-6xl font-bold transition-all duration-500">
        {score}
      </div>

      <p className="mt-2 text-xl font-semibold">{grade}</p>

      <p className="mt-1 text-sm text-gray-500">
        {issueCount} issues detected
      </p>

      <div className="mt-5 h-3 w-full overflow-hidden rounded-full bg-gray-200">
        <div
          className={`h-full rounded-full transition-all duration-500 ${barColor}`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}