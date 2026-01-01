export default function StatusBadge({ status }) {
  let color = "#3b82f6"; // upcoming

  if (status === "active") color = "#16a34a";
  if (status === "completed") color = "#9ca3af";

  return (
    <span
      style={{
        padding: "4px 8px",
        borderRadius: 6,
        backgroundColor: color,
        color: "white",
        fontSize: 12,
        fontWeight: 600
      }}
    >
      {status.toUpperCase()}
    </span>
  );
}