"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { createEvent, updateEvent } from "@/actions/event.action";
import { useState } from "react";

// Helper function to format ISO string to 'YYYY-MM-DDTHH:MM'
const formatDateTime = (isoString: string) => {
  const date = new Date(isoString);
  const offsetDate = new Date(
    date.getTime() - date.getTimezoneOffset() * 60000
  );
  return offsetDate.toISOString().slice(0, 16);
};

// Define validation schema using Zod
export const eventFormSchema = z.object({
  id: z.string().optional(), // id is optional for creating a new event
  summary: z.string().min(2, "Event summary is required"),
  location: z.string().optional(),
  start: z.object({
    dateTime: z.string().min(1, "Start date and time are required"),
    timeZone: z.string().default("UTC"),
  }),
  end: z.object({
    dateTime: z.string().min(1, "End date and time are required"),
    timeZone: z.string().default("UTC"),
  }),
  colorId: z.string().min(1, "Color is required"),
});

export type EventFormData = z.infer<typeof eventFormSchema>;

interface EventFormProps {
  defaultValues?: z.infer<typeof eventFormSchema>; // For editing, pass in default values
}

export function EventForm({ defaultValues }: EventFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: defaultValues || {
      summary: "",
      location: "",
      start: { dateTime: "", timeZone: "UTC" },
      end: { dateTime: "", timeZone: "UTC" },
      colorId: "",
    },
  });

  async function onSubmit(values: z.infer<typeof eventFormSchema>) {
    try {
      setLoading(true);
      if (values.id) {
        await updateEvent(values.id, values)
          .then(() => {
            router.push("/osas/events");
          })
          .catch((error) => console.error("Failed to update event:", error));
      } else {
        createEvent(values)
          .then(() => {
            router.push("/osas/events");
          })
          .catch((error) => console.error("Failed to create event:", error));
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="summary"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Event Summary</FormLabel>
              <FormControl>
                <Input placeholder="Event summary" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Location Field */}
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder="Location" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Start DateTime Field */}
        <FormField
          control={form.control}
          name="start.dateTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start Date and Time</FormLabel>
              <FormControl>
                <Input
                  type="datetime-local"
                  placeholder="Start DateTime"
                  {...field}
                  value={field.value != "" ? formatDateTime(field.value) : ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* End DateTime Field */}
        <FormField
          control={form.control}
          name="end.dateTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>End Date and Time</FormLabel>
              <FormControl>
                <Input
                  type="datetime-local"
                  placeholder="End DateTime"
                  {...field}
                  value={field.value != "" ? formatDateTime(field.value) : ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Color Field */}
        <FormField
          control={form.control}
          name="colorId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Event Color</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select colorId" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="10">CCS</SelectItem>
                  <SelectItem value="6">CAS</SelectItem>
                  <SelectItem value="4">CED</SelectItem>
                  <SelectItem value="9">COE</SelectItem>
                  <SelectItem value="8">COC</SelectItem>
                  <SelectItem value="11">SPC</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={loading}>
          {defaultValues?.id ? "Update Event" : "Create Event"}
        </Button>
      </form>
    </Form>
  );
}
