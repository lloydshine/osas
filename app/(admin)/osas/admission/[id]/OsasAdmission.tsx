"use client";

import { updateAdmissionStatus } from "@/actions/admission.action";
import { AdmissionForm } from "@/components/forms/AdmissionForm";
import { StatusBadge } from "@/components/StatusBadge";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { Admission } from "@/lib/globals";
import { Status } from "@prisma/client";
import { useState } from "react";

export default function OsasAdmission({ admission }: { admission: Admission }) {
  const [status, setStatus] = useState<Status>(admission.status);
  const [loading, setLoading] = useState(false);

  const normalizedAdmission = {
    ...admission,
    middleName: admission.middleName || "", // Convert null to an empty string for form compatibility
  };

  const handleStatusChange = async (newStatus: Status) => {
    setLoading(true);
    try {
      setStatus(newStatus);
      await updateAdmissionStatus(admission.id, newStatus);
      toast({
        title: "Status Updated",
        description: `The status has been updated to ${newStatus}.`,
      });
    } catch (error) {
      console.error("Failed to update status:", error);
      toast({
        title: "Error",
        description:
          "There was an error updating the status. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="p-10">
      <section className="p-10 bg-white drop-shadow-lg rounded-lg">
        <div className="my-6 flex items-center gap-4">
          <h1 className="text-2xl font-semibold">Admission</h1>
          <StatusBadge status={status} />
        </div>
        <div className="my-6">
          <Label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700"
          >
            Admission Status
          </Label>
          <Select
            onValueChange={handleStatusChange}
            value={status}
            disabled={loading}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={Status.Approved}>Approved</SelectItem>
              <SelectItem value={Status.Denied}>Denied</SelectItem>
              <SelectItem value={Status.Pending}>Pending</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <AdmissionForm admissionNo="2" defaultValues={normalizedAdmission} />
      </section>
    </main>
  );
}
