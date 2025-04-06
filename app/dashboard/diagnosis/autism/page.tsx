"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function ASDPage() {
  const [showAdvice, setShowAdvice] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f5f5dc] p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-purple-600">Autism Spectrum Disorder (ASD)</h1>
        <p className="text-gray-700 mt-4">
          Autism Spectrum Disorder presents unique challenges, but with the right support, individuals can thrive in their own way.
        </p>
        <p className="mt-2 text-gray-600">Would you like some tips for managing daily challenges?</p>

        {!showAdvice ? (
          <Button onClick={() => setShowAdvice(true)} className="mt-4 bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-lg">
            Yes, I'd like to try
          </Button>
        ) : (
          <div className="mt-4 space-y-3 text-gray-700">
            <p>📝 Establish clear routines and predictability in your day.</p>
            <p>🧩 Focus on strengths and interests to foster motivation.</p>
            <p>🍎 Encourage sensory-friendly activities to stay comfortable.</p>
            <p>🤝 Seek support from specialized therapists or autism support groups.</p>
          </div>
        )}
      </div>
    </div>
  );
}
