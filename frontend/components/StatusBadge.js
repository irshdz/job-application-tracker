export default function StatusBadge({ status }) {
  const statusStyles = {
    APPLIED: "bg-blue-100 text-blue-700",
    SCREENING: "bg-yellow-100 text-yellow-700",
    INTERVIEW: "bg-purple-100 text-purple-700",
    OFFER: "bg-green-100 text-green-700",
    REJECTED: "bg-red-100 text-red-700",
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
        statusStyles[status] || "bg-gray-100 text-gray-700"
      }`}
    >
      {statusLabels[status] || status || "Unknown"}
    </span>
  );
}