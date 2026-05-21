export default function IssuesList({ issues, cameraActive }) {
  if (!cameraActive) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-lg">
        <h2 className="text-xl font-bold">Detected Issues</h2>

        <p className="mt-4 text-gray-500">
          Enable camera to begin
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-lg">
      <h2 className="text-xl font-bold">Detected Issues</h2>

      {issues.length === 0 ? (
        <p className="mt-4 text-green-600 font-medium">
          Posture looks good!
        </p>
      ) : (
        <div className="mt-4 flex flex-wrap gap-3">
          {issues.map((issue) => {
            const badgeColor =
              issue.severity === "severe"
                ? "bg-red-100 text-red-700"
                : issue.severity === "mild"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-green-100 text-green-700";

            return (
              <div
                key={issue.key}
                className={`rounded-full px-4 py-2 text-sm font-medium ${badgeColor}`}
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