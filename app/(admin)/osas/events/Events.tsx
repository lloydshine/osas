import { getEvents } from "@/actions/event.action";
import EventCard from "@/components/admin/EventCard";

export async function Events({ calendarID }: { calendarID: string }) {
  const events = await getEvents(calendarID);
  return (
    <div className="space-y-4">
      {events.map((event) => (
        <EventCard event={event} key={event.id} />
      ))}
    </div>
  );
}
