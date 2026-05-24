import { useState } from "react";

import CameraFeed from "../components/CameraFeed";
import ScoreDisplay from "../components/ScoreDisplay";
import IssuesList from "../components/IssuesList";
import ExerciseGrid from "../components/ExerciseGrid";

export default function AnalyzePage() {
  const [analysisResult, setAnalysisResult] =
    useState(null);

  const [cameraActive, setCameraActive] =
    useState(false);

  const [isAnalyzing, setIsAnalyzing] =
    useState(false);

  const [toast, setToast] = useState("");

  const score = analysisResult?.score ?? 0;

  const grade =
    analysisResult?.grade ?? "Waiting";

  const gradeClass =
    analysisResult?.gradeClass ?? "poor";

  const issues =
    analysisResult?.issues ?? [];

  const hasResults =
    analysisResult !== null;

  async function saveSession() {
    if (!analysisResult) {
      setToast("No session to save.");
      return;
    }

    const storedUser =
      localStorage.getItem("user");

    if (!storedUser) {
      setToast("Please log in first.");
      return;
    }

    const user = JSON.parse(storedUser);

    try {
      const response = await fetch(
        "http://amused-encouragement-production-21c9.up.railway.app/sessions",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json"
          },
          body: JSON.stringify({
            user_id: user.id,
            score,
            grade,
            issues: issues.map(
              (issue) => issue.label
            ),
            duration_seconds: 60
          })
        }
      );

      if (!response.ok) {
        throw new Error();
      }

      setToast("Session saved!");
    } catch {
      setToast(
        "Failed to save session."
      );
    }

    setTimeout(() => {
      setToast("");
    }, 2500);
  }

  return (
    <main className="min-h-screen bg-[#050816] px-6 py-8 text-white">
      {toast && (
        <div className="fixed right-6 top-24 z-50 rounded-xl bg-teal-400 px-5 py-3 font-bold text-black shadow-2xl">
          {toast}
        </div>
      )}

      <section className="mx-auto max-w-7xl">
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 shadow-2xl">
          <p className="text-sm font-black uppercase tracking-[0.45em] text-teal-300">
            PostureIQ
          </p>

          <h1 className="mt-5 text-5xl font-black tracking-tight text-white">
            Real-Time Posture Analysis
          </h1>

          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-gray-400">
            Track your posture using
            live computer vision, detect
            alignment issues, and get
            targeted corrective
            exercises.
          </p>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.7fr_1fr]">
          <CameraFeed
            onResults={setAnalysisResult}
            onCameraActiveChange={
              setCameraActive
            }
            onAnalyzingChange={
              setIsAnalyzing
            }
          />

          <aside className="space-y-6">
            {isAnalyzing && (
              <div className="rounded-3xl border border-teal-400/30 bg-teal-400/10 p-5 text-center text-lg font-bold text-teal-300">
                Analyzing posture...
              </div>
            )}

            <ScoreDisplay
              score={score}
              grade={grade}
              gradeClass={gradeClass}
              issueCount={issues.length}
            />

            <button
              type="button"
              onClick={saveSession}
              disabled={!hasResults}
              className="w-full rounded-2xl bg-teal-400 px-5 py-4 text-lg font-black text-black transition hover:bg-teal-300 disabled:opacity-40"
            >
              Save Session
            </button>

            <IssuesList
              issues={issues}
              cameraActive={cameraActive}
              isAnalyzing={isAnalyzing}
              hasResults={hasResults}
            />

            <ExerciseGrid
              issues={issues}
              hasResults={hasResults}
            />
          </aside>
        </div>
      </section>
    </main>
  );
}