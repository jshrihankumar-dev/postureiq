export default function ExerciseCard({ name, target, sets, desc, difficulty }) {
  return (
    <div className="rounded-2xl border border-gray-800 bg-gray-950 p-5 text-white shadow-lg transition-all duration-300 hover:border-teal-400 hover:shadow-xl">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-lg font-bold">{name}</h3>

        <span className="rounded-full bg-gray-800 px-3 py-1 text-xs font-medium text-gray-300">
          {difficulty}
        </span>
      </div>

      <p className="mt-2 text-sm text-teal-300">{target}</p>

      <p className="mt-3 text-sm font-semibold text-gray-200">{sets}</p>

      <p className="mt-3 text-sm leading-relaxed text-gray-400">{desc}</p>
    </div>
  );
}