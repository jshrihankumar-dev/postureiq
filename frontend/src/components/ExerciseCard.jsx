export default function ExerciseCard({
  name,
  target,
  sets,
  desc,
  difficulty
}) {
  return (
    <div className="rounded-2xl border border-gray-800 bg-[#0a0d16] p-5 transition hover:border-cyan-400">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-black text-white">
          {name}
        </h3>

        <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-bold text-cyan-300">
          {difficulty}
        </span>
      </div>

      <p className="mt-2 text-sm font-bold text-cyan-300">
        {target}
      </p>

      <p className="mt-3 text-sm font-semibold text-gray-300">
        {sets}
      </p>

      <p className="mt-3 text-sm leading-relaxed text-gray-500">
        {desc}
      </p>
    </div>
  );
}