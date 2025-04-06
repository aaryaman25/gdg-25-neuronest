"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function NarcissisticPersonalityPage() {
  const [showAdvice, setShowAdvice] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f5f5dc] p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-purple-600">Narcissistic Personality Disorder</h1>
        <p className="text-gray-700 mt-4">
          Narcissistic Personality Disorder often involves a need for admiration, but therapy can help build healthier relationships and self-esteem.
        </p>
        <p className="mt-2 text-gray-600">Would you like some advice for managing narcissistic traits?</p>

        {!showAdvice ? (
          <Button onClick={() => setShowAdvice(true)} className="mt-4 bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-lg">
            Yes, I'd like to try
          </Button>
        ) : (
          <div className="mt-4 space-y-3 text-gray-700">
            <p>📝 Practice gratitude and self-compassion exercises.</p>
            <p>🤝 Focus on building meaningful, authentic relationships.</p>
            <p>🍎 Practice humility and reflect on the feelings of others.</p>
            <p>💬 Therapy can help address underlying insecurities and enhance self-awareness.</p>
          </div>
        )}
      </div>
    </div>
  );
}
