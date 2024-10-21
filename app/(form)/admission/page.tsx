"use client";

import { AdmissionForm } from "@/components/forms/AdmissionForm";
import { useSearchParams } from "next/navigation";

export default function AdmissionPage() {
  const searchParams = useSearchParams();

  const admissionNo = searchParams.get("no");
  if (admissionNo !== "1" && admissionNo !== "2") return null;
  return (
    <main className="min-h-screen flex justify-center items-center">
      <div className="rounded-lg p-20 w-full md:w-[60%] bg-white drop-shadow-md">
        <h1 className="text-primary text-3xl font-bold mb-10">
          Admission Form
        </h1>
        <AdmissionForm admissionNo={admissionNo} />
      </div>
    </main>
  );
}
