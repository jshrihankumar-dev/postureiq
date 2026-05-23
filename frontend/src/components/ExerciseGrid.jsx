import ExerciseCard from "./ExerciseCard";
import { getExercises } from "../lib/exerciseData";

export default function ExerciseGrid({ issues, hasResults }) {
  const exercises = getExercises(issues);

  return (
    <div className="rounded-3xl border border-white/10 bg-[#10131f] p-6 text-white shadow-2xl">
      <h2 className="text-xl font-black">Recommended Exercises</h2>

      {!hasResults ? (
        <p className="mt-4 text-gray-500">
          Exercises appear after posture analysis.
        </p>
      ) : exercises.length === 0 ? (
        <p className="mt-4 text-emerald-300">
          No corrective exercises needed right now.
        </p>
      ) : (
        <div className="mt-5 space-y-4">
          {exercises.map((exercise) => (
            <ExerciseCard
              key={exercise.name}
              name={exercise.name}
              target={exercise.target}
              sets={exercise.sets}
              desc={exercise.desc}
              difficulty={exercise.difficulty}
            />
          ))}
        </div>
      )}
    </div>
  );
}