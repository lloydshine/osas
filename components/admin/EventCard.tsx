import { Event } from "@/lib/globals";
import Link from "next/link";
import DeleteButton from "./DeleteButton";
import { deleteEvent } from "@/actions/event.action";

export const eventColors: { [key: string]: string } = {
  "1": "bg-blue-400", // Lavender (#7986CB)
  "2": "bg-green-500", // Sage (#33B679)
  "3": "bg-purple-600", // Grape (#8E24AA)
  "4": "bg-red-400", // Flamingo (#E67C73)
  "5": "bg-yellow-500", // Banana (#F6BF26)
  "6": "bg-orange-500", // Tangerine (#F4511E)
  "7": "bg-cyan-500", // Peacock (#039BE5)
  "8": "bg-gray-500", // Graphite (#616161)
  "9": "bg-blue-500", // Blueberry (#3F51B5)
  "10": "bg-green-600", // Basil (#0B8043)
  "11": "bg-red-600", // Tomato (#D50000)
};

export default function EventCard({ event }: { event: Event }) {
  const colorClass = eventColors[event.colorId] || "bg-gray-500"; // Fallback to gray-500 if color is not found

  return (
    <div className={`p-6 rounded-lg shadow-md ${colorClass} text-white`}>
      <h2 className="text-lg font-bold mb-2">{event.summary}</h2>
      <p className="text-sm mb-2">
        <strong>Location:</strong> {event.location ? event.location : "TBD"}
      </p>
      <p className="text-sm">
        <strong>Start:</strong>{" "}
        {event.start.dateTime
          ? new Date(event.start.dateTime).toLocaleString()
          : "TBD"}
      </p>
      <p className="text-sm">
        <strong>End:</strong>{" "}
        {event.end.dateTime
          ? new Date(event.end.dateTime).toLocaleString()
          : "TBD"}
      </p>
      <Link href={`/osas/events/${event.id}`} className="mt-10">
        View
      </Link>
      <DeleteButton id={event.id} deleteFunction={deleteEvent} />
    </div>
  );
}
