"use server";

import { EventFormData } from "@/components/forms/EventForm";
import { auth } from "@/lib/auth";
import { db } from "@/lib/firebase";
import { google } from "googleapis"; // Move the import here for clarity
import { revalidatePath } from "next/cache";

const oauth2Client = new google.auth.OAuth2();
const calendar = google.calendar({ version: "v3", auth: oauth2Client });

export async function getCalendarID() {
  try {
    const calendarDoc = await db.collection("calendar").doc("id").get();
    if (calendarDoc.exists) {
      return calendarDoc.data()!.id as string;
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function setCalendarID(id: string) {
  try {
    await db.collection("calendar").doc("id").set({ id: id });
    revalidatePath("/osas/events");
  } catch (error) {
    console.log(error);
  }
}

export async function getEvents(calendarId: string) {
  if (!calendarId) {
    throw new Error("Calendar ID is required.");
  }
  const session = await auth();
  if (!session?.accessToken) {
    throw new Error("Access token is required.");
  }
  oauth2Client.setCredentials({ access_token: session.accessToken });
  try {
    const response = await calendar.events.list({
      calendarId: calendarId, // Use the provided calendar ID
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: "startTime",
    });
    console.log(response.data.items);

    const events =
      response.data.items?.map((item) => ({
        id: item.id || "",
        colorId: item.colorId || "1",
        summary: item.summary || "No Title",
        location: item.location || null,
        start: {
          dateTime: item.start?.dateTime || null,
        },
        end: {
          dateTime: item.end?.dateTime || null,
        },
      })) || [];
    return events;
  } catch (error) {
    console.error("Error fetching calendar events:", error);
    return [];
  }
}

export async function createEvent(data: EventFormData) {
  const calendarId = await getCalendarID();
  if (!calendarId) {
    throw new Error("Calendar ID is required.");
  }
  const session = await auth();
  if (!session?.accessToken) {
    throw new Error("Access token is required.");
  }
  oauth2Client.setCredentials({ access_token: session.accessToken });
  try {
    const eventPayload = {
      summary: data.summary,
      location: data.location || undefined, // Optional field
      start: {
        dateTime: new Date(data.start.dateTime).toISOString(), // Convert to ISO string
        timeZone: "UTC", // Adjust this to your preferred time zone
      },
      end: {
        dateTime: new Date(data.end.dateTime).toISOString(), // Convert to ISO string
        timeZone: "UTC", // Adjust this to your preferred time zone
      },
      colorId: data.colorId,
    };
    calendar.events.insert({
      calendarId: calendarId,
      requestBody: eventPayload,
    });
    revalidatePath("/osas/events");
  } catch (error) {
    console.log(error);
  }
}

export async function getEventById(eventId: string) {
  const calendarId = await getCalendarID();
  if (!calendarId) {
    throw new Error("Calendar ID is required.");
  }
  const session = await auth();
  if (!session?.accessToken) {
    throw new Error("Access token is required.");
  }
  oauth2Client.setCredentials({ access_token: session.accessToken });
  try {
    const response = await calendar.events.get({ calendarId, eventId });
    return {
      id: response.data.id || "",
      colorId: response.data.colorId || "1",
      summary: response.data.summary || "No Title",
      location: response.data.location!,
      start: {
        dateTime: response.data.start!.dateTime!,
        timeZone: response.data.start!.timeZone!,
      },
      end: {
        dateTime: response.data.end!.dateTime!,
        timeZone: response.data.end!.timeZone!,
      },
    };
  } catch (error) {
    console.log(error);
  }
}

export async function updateEvent(eventId: string, data: EventFormData) {
  const calendarId = await getCalendarID();
  if (!calendarId) {
    throw new Error("Calendar ID is required.");
  }
  const session = await auth();
  if (!session?.accessToken) {
    throw new Error("Access token is required.");
  }
  oauth2Client.setCredentials({ access_token: session.accessToken });
  try {
    const eventPayload = {
      summary: data.summary,
      location: data.location || undefined, // Optional field
      start: {
        dateTime: new Date(data.start.dateTime).toISOString(), // Convert to ISO string
        timeZone: "UTC", // Adjust this to your preferred time zone
      },
      end: {
        dateTime: new Date(data.end.dateTime).toISOString(), // Convert to ISO string
        timeZone: "UTC", // Adjust this to your preferred time zone
      },
      colorId: data.colorId,
    };
    calendar.events.update({
      eventId: eventId,
      calendarId: calendarId,
      requestBody: eventPayload,
    });
    revalidatePath("/");
  } catch (error) {
    console.log(error);
  }
}

export async function deleteEvent(eventId: string) {
  const calendarId = await getCalendarID();
  if (!calendarId) {
    throw new Error("Calendar ID is required.");
  }
  const session = await auth();
  if (!session?.accessToken) {
    throw new Error("Access token is required.");
  }
  oauth2Client.setCredentials({ access_token: session.accessToken });
  try {
    calendar.events.delete({ calendarId, eventId });
    revalidatePath("/osas/events");
  } catch (error) {
    console.log(error);
  }
}
