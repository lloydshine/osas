import { getCalendarID } from "@/actions/event.action";
import { CalendarIDForm } from "@/components/forms/CalendarIDForm";
import { Suspense } from "react";
import { Events } from "./Events";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function EventsPage() {
  const calendarID = await getCalendarID();
  return (
    <main className="p-10 space-y-10">
      {calendarID && (
        <Suspense fallback={<>Loading Events</>}>
          <Button asChild>
            <Link href="/osas/events/create">Create Event</Link>
          </Button>
          <h1 className="text-2xl font-bold text-primary">Upcoming Events</h1>
          <Events calendarID={calendarID} />
        </Suspense>
      )}
      <CalendarIDForm defaultID={calendarID} />
    </main>
  );
}
