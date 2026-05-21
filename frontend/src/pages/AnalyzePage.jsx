import { useState } from "react";
import CameraFeed from "../components/CameraFeed";
import ScoreDisplay from "../components/ScoreDisplay";
import IssuesList from "../components/IssuesList";
import ExerciseGrid from "../components/ExerciseGrid";

export default function AnalyzePage() {
  const [analysisResult, setAnalysisResult] = useState(null);

  const score = analysisResult?.score ?? 0;
  const grade = analysisResult?.grade ?? "Waiting";
  const gradeClass = analysisResult?.gradeClass ?? "poor";
  const issues = analysisResult?.issues ?? [];
  const cameraActive = analysisResult !== null;

  return (
    <main className="min-h-screen bg-gray-950 px-6 py-8 text-white">
      <section className="mx-auto max-w-7xl">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-teal-400">
            PostureIQ
          </p>

          <h1 className="mt-3 text-4xl font-bold">
            Real-Time Posture Analysis
          </h1>

          <p className="mt-3 max-w-2xl text-gray-400">
            Enable your camera to analyze posture, detect alignment issues, and
            receive corrective exercise suggestions.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.4fr_0.9fr]">
          <CameraFeed onResults={setAnalysisResult} />

          <aside className="space-y-6">
            <ScoreDisplay
              score={score}
              grade={grade}
              gradeClass={gradeClass}
              issueCount={issues.length}
            />

            <IssuesList issues={issues} cameraActive={cameraActive} />

            <ExerciseGrid issues={issues} />
          </aside>
        </div>
      </section>
    </main>
  );
}