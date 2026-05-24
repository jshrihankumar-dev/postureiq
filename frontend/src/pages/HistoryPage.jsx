import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

export default function HistoryPage() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchSessions() {
      try {
        const storedUser = localStorage.getItem("user");

        if (!storedUser) {
          setError("Please log in to view history.");
          setLoading(false);
          return;
        }

        const user = JSON.parse(storedUser);

        const response = await fetch(
          `http://127.0.0.1:8000/sessions/${user.id}`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error("Failed to load history");
        }

        setSessions(data);
      } catch {
        setError("Could not load session history.");
      }

      setLoading(false);
    }

    fetchSessions();
  }, []);

  const chartData = sessions
    .slice()
    .reverse()
    .map((session) => ({
      date: new Date(session.created_at).toLocaleDateString(),
      score: session.score
    }));

  const firstScore = chartData[0]?.score ?? 0;
  const lastScore = chartData[chartData.length - 1]?.score ?? 0;
  const lineColor = lastScore >= firstScore ? "#22c55e" : "#ef4444";

  return (
    <main className="min-h-screen bg-[#050816] px-6 py-8 text-white">
      <section className="mx-auto max-w-6xl">
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 shadow-2xl">
          <p className="text-sm font-black uppercase tracking-[0.45em] text-teal-300">
            PostureIQ
          </p>

          <h1 className="mt-5 text-5xl font-black tracking-tight text-white">
            Session History
          </h1>

          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-gray-400">
            Review your saved posture sessions and track your score over time.
          </p>
        </div>

        {loading && (
          <div className="mt-8 rounded-3xl border border-white/10 bg-[#10131f] p-6 text-gray-400">
            Loading history...
          </div>
        )}

        {error && (
          <div className="mt-8 rounded-3xl border border-red-400/30 bg-red-500/10 p-6 text-red-300">
            {error}
          </div>
        )}

        {!loading && !error && sessions.length === 0 && (
          <div className="mt-8 rounded-3xl border border-white/10 bg-[#10131f] p-6 text-gray-400">
            No saved sessions yet.
          </div>
        )}

        {!loading && !error && sessions.length > 0 && (
          <>
            <div className="mt-8 rounded-3xl border border-white/10 bg-[#10131f] p-6 shadow-2xl">
              <h2 className="text-2xl font-black text-white">
                Score Over Time
              </h2>

              <div className="mt-6 h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />

                    <XAxis dataKey="date" stroke="#9ca3af" />

                    <YAxis domain={[0, 100]} stroke="#9ca3af" />

                    <Tooltip
                      contentStyle={{
                        background: "#0b1020",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "12px",
                        color: "#ffffff"
                      }}
                    />

                    <Line
                      type="monotone"
                      dataKey="score"
                      stroke={lineColor}
                      strokeWidth={4}
                      dot={{ r: 5 }}
                      activeDot={{ r: 7 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="mt-8 grid gap-5">
              {sessions.map((session) => (
                <div
                  key={session.id}
                  className="rounded-3xl border border-white/10 bg-[#10131f] p-6 shadow-xl"
                >
                  <p className="text-sm text-gray-500">
                    {new Date(session.created_at).toLocaleString()}
                  </p>

                  <h2 className="mt-2 text-3xl font-black text-white">
                    Score: {session.score}
                  </h2>

                  <p className="mt-1 text-lg font-bold text-teal-300">
                    {session.grade}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-3">
                    {session.issues?.length > 0 ? (
                      session.issues.map((issue, index) => (
                        <span
                          key={`${issue}-${index}`}
                          className="rounded-full bg-yellow-400/15 px-4 py-2 text-sm font-bold text-yellow-300"
                        >
                          {issue}
                        </span>
                      ))
                    ) : (
                      <span className="rounded-full bg-emerald-400/15 px-4 py-2 text-sm font-bold text-emerald-300">
                        No issues detected
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </section>
    </main>
  );
}