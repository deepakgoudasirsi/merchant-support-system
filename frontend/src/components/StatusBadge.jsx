import { priorityColors, statusColors } from "../utils/statusColors";

export default function StatusBadge({ type, value }) {
  const map = type === "priority" ? priorityColors : statusColors;
  const label = String(value ?? "UNKNOWN").toUpperCase();
  const classes = map[label] || map.UNKNOWN;

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-semibold uppercase tracking-wide ${classes}`}
    >
      {label}
    </span>
  );
}

