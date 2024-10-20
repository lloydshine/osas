"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import Image from "next/image"; // Import the Image component from Next.js
import { useState } from "react";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true); // Set loading state
    await signIn("google");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Image
        src="/logo.png" // Path to your logo in the public folder
        alt="OIMS Logo"
        width={150} // Set the width of the logo
        height={150} // Set the height of the logo
        className="mb-8" // Add margin bottom for spacing
      />
      <h1 className="text-2xl font-bold mb-4">Welcome to OIMS</h1>
      <Button onClick={handleLogin} disabled={loading}>
        {loading ? "Signing in..." : "Login with Google"}
      </Button>
    </div>
  );
}
