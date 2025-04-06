"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function EatingDisorderPage() {
  const [showAdvice, setShowAdvice] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f5f5dc] p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-purple-600">Eating Disorders</h1>
        <p className="text-gray-700 mt-4">
          Eating disorders can affect physical and emotional health, but recovery is possible with the right help and support.
        </p>
        <p className="mt-2 text-gray-600">Would you like some advice for managing eating disorders?</p>

        {!showAdvice ? (
          <Button onClick={() => setShowAdvice(true)} className="mt-4 bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-lg">
            Yes, I'd like to try
          </Button>
        ) : (
          <div className="mt-4 space-y-3 text-gray-700">
            <p>📝 Keep a food journal to monitor eating habits and emotions.</p>
            <p>🍎 Focus on eating balanced meals and maintaining a healthy relationship with food.</p>
            <p>🤝 Seek support from a therapist or nutritionist for guidance and recovery.</p>
            <p>💬 Practice positive self-talk to overcome body image concerns.</p>
          </div>
        )}
      </div>
    </div>
  );
}
