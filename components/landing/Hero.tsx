"use client";

import { useEffect, useState } from "react";

export function Hero() {
  const [heroText, setHeroText] = useState("OSAS");
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // Trigger fade-out
      setTimeout(() => {
        setHeroText((prevText) => (prevText === "OSAS" ? "GUIDANCE" : "OSAS")); // Switch text
        setFade(true); // Trigger fade-in
      }, 500); // Half second delay for fade-out before switching text
    }, 5000); // 8000 milliseconds = 8 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <section className="bg-red-950 text-white text-center py-20 flex-1">
      <h1
        className={`text-6xl md:text-9xl font-bold transition-opacity duration-500 ${
          fade ? "opacity-100" : "opacity-0"
        }`}
      >
        {heroText}
      </h1>
      <p className="text-lg md:text-2xl mt-4">
        Empowering Student Success and Well-being
      </p>
      <button className="mt-8 px-6 py-3 bg-white text-red-950 font-semibold rounded-lg shadow-lg hover:bg-gray-200">
        Get Started
      </button>
    </section>
  );
}
