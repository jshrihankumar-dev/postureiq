import ExerciseCard from "./ExerciseCard";
import { getExercises } from "../lib/exerciseData";

export default function ExerciseGrid({ issues }) {
  const exercises = getExercises(issues);

  return (
    <div className="rounded-2xl bg-white p-6 shadow-lg">
      <h2 className="text-xl font-bold">Recommended Exercises</h2>

      {exercises.length === 0 ? (
        <p className="mt-4 text-gray-500">
          No exercises needed yet. Start camera analysis first.
        </p>
      ) : (
        <div className="mt-5 grid gap-4 md:grid-cols-2">
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