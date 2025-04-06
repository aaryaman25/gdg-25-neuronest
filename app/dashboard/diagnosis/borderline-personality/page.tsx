"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function BPDPage() {
  const [showAdvice, setShowAdvice] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f5f5dc] p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-purple-600">Borderline Personality Disorder</h1>
        <p className="text-gray-700 mt-4">
          Borderline Personality Disorder (BPD) can feel like an emotional rollercoaster, but with the right tools, you can navigate through the highs and lows.
        </p>
        <p className="mt-2 text-gray-600">Would you like some advice on managing emotions in BPD?</p>

        {!showAdvice ? (
          <Button onClick={() => setShowAdvice(true)} className="mt-4 bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-lg">
            Yes, I'd like to try
          </Button>
        ) : (
          <div className="mt-4 space-y-3 text-gray-700">
            <p>📝 Practice mindfulness to stay present and reduce impulsive behaviors.</p>
            <p>💬 Engage in dialectical behavior therapy (DBT) to improve emotional regulation.</p>
            <p>🍎 Focus on maintaining a balanced and healthy lifestyle.</p>
            <p>🤝 Seek professional support to navigate challenges in relationships.</p>
          </div>
        )}
      </div>
    </div>
  );
}
