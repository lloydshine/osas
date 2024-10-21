import { getEventById } from "@/actions/event.action";
import { EventForm } from "@/components/forms/EventForm";
import React from "react";

export default async function EventPage({ params }: { params: any }) {
  if (!params) return null;

  const event = await getEventById(params.id);
  if (!event) return <>Event not found</>;
  return <EventForm defaultValues={event} />;
}
