import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <main className="h-screen flex">
      <Loader2 className="animate-spin m-auto" />
    </main>
  );
}
