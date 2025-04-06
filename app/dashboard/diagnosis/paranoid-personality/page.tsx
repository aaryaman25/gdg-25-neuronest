"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function ParanoidPersonalityPage() {
  const [showAdvice, setShowAdvice] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f5f5dc] p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-purple-600">Paranoid Personality Disorder</h1>
        <p className="text-gray-700 mt-4">
          Paranoid Personality Disorder can make you feel distrustful or suspicious of others, but therapy and support can help you manage these feelings.
        </p>
        <p className="mt-2 text-gray-600">Would you like some tips for managing paranoia?</p>

        {!showAdvice ? (
          <Button onClick={() => setShowAdvice(true)} className="mt-4 bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-lg">
            Yes, I'd like to try
          </Button>
        ) : (
          <div className="mt-4 space-y-3 text-gray-700">
            <p>📝 Keep a journal to monitor your feelings and thoughts.</p>
            <p>🤝 Build trust gradually with those close to you.</p>
            <p>🍎 Focus on maintaining a routine to reduce anxiety.</p>
            <p>💬 Cognitive Behavioral Therapy (CBT) can help challenge negative thoughts.</p>
          </div>
        )}
      </div>
    </div>
  );
}
