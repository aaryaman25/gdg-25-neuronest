"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function SchizoaffectivePage() {
  const [showAdvice, setShowAdvice] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f5f5dc] p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-purple-600">Schizoaffective Disorder</h1>
        <p className="text-gray-700 mt-4">
          Schizoaffective Disorder can involve symptoms of both schizophrenia and mood disorders, but with the right treatment, it is manageable.
        </p>
        <p className="mt-2 text-gray-600">Would you like some advice for managing symptoms of schizoaffective disorder?</p>

        {!showAdvice ? (
          <Button onClick={() => setShowAdvice(true)} className="mt-4 bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-lg">
            Yes, I'd like to try
          </Button>
        ) : (
          <div className="mt-4 space-y-3 text-gray-700">
            <p>📝 Keep a log of symptoms and treatment progress.</p>
            <p>🍎 Follow a healthy routine to manage both mood and cognitive symptoms.</p>
            <p>🤝 Build a strong support system, including healthcare providers.</p>
            <p>💬 Seek therapy and consider medication to stabilize symptoms.</p>
          </div>
        )}
      </div>
    </div>
  );
}
