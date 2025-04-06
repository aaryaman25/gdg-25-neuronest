"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function BipolarPage() {
  const [showAdvice, setShowAdvice] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f5f5dc] p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-purple-600">Bipolar Disorder</h1>
        <p className="text-gray-700 mt-4">
          Bipolar disorder can feel like a constant battle between highs and lows, but you are not alone. Your feelings are valid, and there is hope.
        </p>
        <p className="mt-2 text-gray-600">Would you like some tips to manage your emotions more effectively?</p>

        {!showAdvice ? (
          <Button onClick={() => setShowAdvice(true)} className="mt-4 bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-lg">
            Yes, I'd like to try
          </Button>
        ) : (
          <div className="mt-4 space-y-3 text-gray-700">
            <p>📝 Keep a mood journal to track emotional patterns.</p>
            <p>⏳ Stick to a routine to create stability in daily life.</p>
            <p>🍎 Maintain a balanced diet and sleep schedule.</p>
            <p>🤝 Reach out to a support system, whether friends, family, or a professional.</p>
          </div>
        )}
      </div>
    </div>
  );
}
