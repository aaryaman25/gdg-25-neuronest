"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function SchizophreniaPage() {
  const [showAdvice, setShowAdvice] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f5f5dc] p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-purple-600">Schizophrenia</h1>
        <p className="text-gray-700 mt-4">
          Schizophrenia can feel like a disconnect from reality, but with proper treatment and support, it’s possible to manage symptoms effectively.
        </p>
        <p className="mt-2 text-gray-600">Would you like some tips for managing schizophrenia?</p>

        {!showAdvice ? (
          <Button onClick={() => setShowAdvice(true)} className="mt-4 bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-lg">
            Yes, I'd like to try
          </Button>
        ) : (
          <div className="mt-4 space-y-3 text-gray-700">
            <p>📝 Keep track of any changes in mood, thoughts, or behavior.</p>
            <p>🏃‍♂️ Engage in daily activities to stay grounded in reality.</p>
            <p>🍎 Follow a healthy lifestyle with regular sleep and meals.</p>
            <p>🤝 Work with a mental health professional to ensure medication and therapy are effective.</p>
          </div>
        )}
      </div>
    </div>
  );
}
