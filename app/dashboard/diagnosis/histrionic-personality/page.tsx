"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function HistrionicPersonalityPage() {
  const [showAdvice, setShowAdvice] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f5f5dc] p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-purple-600">Histrionic Personality Disorder</h1>
        <p className="text-gray-700 mt-4">
          Histrionic Personality Disorder involves seeking attention, but learning healthy ways to engage with others can help maintain better relationships.
        </p>
        <p className="mt-2 text-gray-600">Would you like some advice on how to manage attention-seeking behaviors?</p>

        {!showAdvice ? (
          <Button onClick={() => setShowAdvice(true)} className="mt-4 bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-lg">
            Yes, I'd like to try
          </Button>
        ) : (
          <div className="mt-4 space-y-3 text-gray-700">
            <p>📝 Practice self-reflection to understand your emotions better.</p>
            <p>🤝 Work on building self-esteem that doesn't rely on external validation.</p>
            <p>🍎 Seek balance in social interactions to avoid emotional extremes.</p>
            <p>💬 Therapy can help develop more balanced self-expression.</p>
          </div>
        )}
      </div>
    </div>
  );
}
