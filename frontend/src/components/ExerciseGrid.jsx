import ExerciseCard from "./ExerciseCard";
import { getExercises } from "../lib/exerciseData";

export default function ExerciseGrid({ issues }) {
  const exercises = getExercises(issues);

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/30">
      <h2 className="text-xl font-black text-white">Recommended Exercises</h2>

      {exercises.length === 0 ? (
        <p className="mt-4 text-gray-500">
          Exercises will appear after posture issues are detected.
        </p>
      ) : (
        <div className="mt-5 grid gap-4">
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