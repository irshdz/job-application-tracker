export default function StatusBadge({ status }) {
  const statusStyles = {
    APPLIED:
      "border border-blue-500/30 bg-blue-500/10 text-blue-400",

    SCREENING:
      "border border-yellow-500/30 bg-yellow-500/10 text-yellow-400",

    INTERVIEW:
      "border border-purple-500/30 bg-purple-500/10 text-purple-400",

    OFFER:
      "border border-green-500/30 bg-green-500/10 text-green-400",

    REJECTED:
      "border border-red-500/30 bg-red-500/10 text-red-400",
  };

  const statusLabels = {
    APPLIED: "Applied",
    SCREENING: "Screening",
    INTERVIEW: "Interview",
    OFFER: "Offer",
    REJECTED: "Rejected",
  };

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
        statusStyles[status] ||
        "border border-slate-700 bg-slate-800 text-slate-300"
      }`}
    >
      {statusLabels[status] || status || "Unknown"}
    </span>
  );
}