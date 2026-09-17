export default function StatCard({ title, value, description }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg transition hover:border-slate-700 hover:shadow-xl">

      {/* Title */}
      <p className="text-sm font-medium text-slate-400">
        {title}
      </p>


      {/* Value */}
      <h2 className="mt-2 text-3xl font-bold text-white">
        {value}
      </h2>


      {/* Description */}
      {description && (
        <p className="mt-2 text-sm text-slate-500">
          {description}
        </p>
      )}

    </div>
  );
}