import { Status } from "@prisma/client";

export function StatusBadge({ status }: { status: Status }) {
  let bgColor;
  let textColor;

  switch (status) {
    case "Approved":
      bgColor = "bg-green-50"; // Softer green background
      textColor = "text-green-600"; // Darker green text
      break;
    case "Pending":
      bgColor = "bg-yellow-200"; // Softer yellow background
      textColor = "text-yellow-600"; // Darker yellow text
      break;
    case "Denied":
      bgColor = "bg-red-50"; // Softer red background
      textColor = "text-red-600"; // Darker red text
      break;
    default:
      bgColor = "bg-gray-50"; // Light neutral background for unhandled status
      textColor = "text-gray-600"; // Neutral text color
      break;
  }

  return (
    <span
      className={`inline-block px-4 py-2 rounded-md border ${bgColor} border-gray-200`}
    >
      <span className={`text-sm font-semibold ${textColor}`}>{status}</span>
    </span>
  );
}
