"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function OCDPage() {
  const [showAdvice, setShowAdvice] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f5f5dc] p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-purple-600">Obsessive-Compulsive Disorder (OCD)</h1>
        <p className="text-gray-700 mt-4">
          OCD can create overwhelming thoughts and urges, but you're not alone. Help is available, and relief is possible.
        </p>
        <p className="mt-2 text-gray-600">Would you like some tips for managing OCD symptoms?</p>

        {!showAdvice ? (
          <Button onClick={() => setShowAdvice(true)} className="mt-4 bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-lg">
            Yes, I'd like to try
          </Button>
        ) : (
          <div className="mt-4 space-y-3 text-gray-700">
            <p>📝 Practice mindfulness to manage intrusive thoughts.</p>
            <p>⏳ Gradually expose yourself to triggering situations to reduce compulsive behaviors.</p>
            <p>🍎 Maintain a balanced lifestyle with healthy routines.</p>
            <p>🤝 Consider therapy, such as Cognitive Behavioral Therapy (CBT).</p>
          </div>
        )}
      </div>
    </div>
  );
}
