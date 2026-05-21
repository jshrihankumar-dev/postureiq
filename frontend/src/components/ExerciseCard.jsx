export default function ExerciseCard({ name, target, sets, desc, difficulty }) {
  return (
    <div className="rounded-2xl border border-gray-800 bg-black/40 p-5 text-white transition-all duration-300 hover:border-teal-400 hover:bg-teal-400/5">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-lg font-black">{name}</h3>

        <span className="rounded-full bg-teal-400/10 px-3 py-1 text-xs font-bold text-teal-300">
          {difficulty}
        </span>
      </div>

      <p className="mt-2 text-sm font-bold text-teal-300">{target}</p>
      <p className="mt-3 text-sm font-bold text-gray-200">{sets}</p>
      <p className="mt-3 text-sm leading-relaxed text-gray-400">{desc}</p>
    </div>
  );
}