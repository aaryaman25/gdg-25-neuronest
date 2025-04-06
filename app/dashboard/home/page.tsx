"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function DashboardHome() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const folder = searchParams.get("condition") || "general";

  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#f5f5dc] flex flex-col items-center justify-center p-6 space-y-6">
      <h1 className="text-2xl font-bold text-center">
        Welcome back, {name} 👋
      </h1>
      <p className="text-center text-gray-700 max-w-md">
        Based on what you shared, here are a few things that might help you today.
      </p>

      <div className="grid grid-cols-1 gap-4 w-full max-w-md">
        <Button
          onClick={() => router.push(`/diagnosis/${folder}`)}
          className="bg-blue-500 hover:bg-blue-600 w-full"
        >
          🧠 Advice & Coping Strategies
        </Button>

        <Button
          onClick={() => router.push("/mood-tracker")}
          className="bg-pink-500 hover:bg-pink-600 w-full"
        >
          📈 Mood Tracker
        </Button>

        <Button
          onClick={() => router.push("/habit-tracker")}
          className="bg-green-500 hover:bg-green-600 w-full"
        >
          🔁 Habit Tracker
        </Button>
      </div>
    </div>
  );
}
