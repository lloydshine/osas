"use client";

import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { setCalendarID } from "@/actions/event.action";

export function CalendarIDForm({ defaultID }: { defaultID: string | null }) {
  const [id, setID] = useState(defaultID || "");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      await setCalendarID(id);
      console.log("Submitted id:", id);
    } catch (error) {
      console.error("Error submitting id:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="font-bold text-primary mb-2">Calendar ID</h1>
      <div className="flex gap-2">
        <Input
          type="text"
          value={id}
          onChange={(e) => setID(e.target.value)}
          placeholder="Enter calendar ID"
          disabled={loading}
        />
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </Button>
      </div>
    </form>
  );
}
