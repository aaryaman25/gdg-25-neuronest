"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function PTSDPage() {
  const [showAdvice, setShowAdvice] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f5f5dc] p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-purple-600">Post-Traumatic Stress Disorder (PTSD)</h1>
        <p className="text-gray-700 mt-4">
          PTSD can be a heavy burden to carry, but with the right support, healing is possible. You don't have to face it alone.
        </p>
        <p className="mt-2 text-gray-600">Would you like some tips for managing PTSD?</p>

        {!showAdvice ? (
          <Button onClick={() => setShowAdvice(true)} className="mt-4 bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-lg">
            Yes, I'd like to try
          </Button>
        ) : (
          <div className="mt-4 space-y-3 text-gray-700">
            <p>📝 Engage in grounding exercises to stay present.</p>
            <p>⏳ Practice relaxation techniques like deep breathing.</p>
            <p>🍎 Keep a consistent sleep routine to avoid nightmares.</p>
            <p>🤝 Reach out to a therapist for trauma-focused therapy.</p>
          </div>
        )}
      </div>
    </div>
  );
}
