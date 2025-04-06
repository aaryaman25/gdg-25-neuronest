"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  format,
  eachDayOfInterval,
  startOfMonth,
  endOfMonth,
  addMonths,
  subMonths,
} from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const suggestedHabits: Record<string, string[]> = {
  "Feeling anxious or overwhelmed": ["Deep breathing", "Daily journaling", "5-min meditation"],
  "Mood swings": ["Track mood", "Regular sleep schedule", "Gratitude journaling"],
  "Difficulty focusing": ["Pomodoro sessions", "To-do list", "Avoid multitasking"],
  "Sleep issues": ["No screen before bed", "Sleep at same time", "Track sleep hours"],
  "Relationship struggles": ["Practice active listening", "Journal about interactions"],
  "Low self-esteem": ["Daily affirmation", "Celebrate small wins", "Avoid negative self-talk"],
  "Obsessive thoughts": ["Mindfulness break", "Note triggering patterns"],
  "Unexplained anger": ["Count to 10 technique", "Walk away + reflect"],
  "Feeling disconnected": ["1 social check-in per day", "Reflective journaling"],
  "Unusual behaviors": ["Track patterns", "Discuss with trusted person"],
  "Trauma flashbacks": ["Grounding technique", "Create safe space rituals"],
};

const moodOptions = {
  happy: "😊",
  neutral: "😐",
  sad: "😢",
  angry: "😠",
  tired: "😴",
};

export default function NotDiagnosedDashboard() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const concernParams = searchParams.get("concerns");
  const concerns = concernParams ? concernParams.split(",") : [];

  const [view, setView] = useState<"suggestions" | "tracking" | "journal" | "chat">("suggestions");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [completedHabits, setCompletedHabits] = useState<Record<string, string[]>>({});
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [customHabits, setCustomHabits] = useState<string[]>([]);
  const [newHabit, setNewHabit] = useState("");
  
  // Mood and journal state
  const [moodLog, setMoodLog] = useState<Record<string, string>>({});
  const [journalLog, setJournalLog] = useState<Record<string, string>>({});
  const [selectedMood, setSelectedMood] = useState<string>("");
  const [journalEntry, setJournalEntry] = useState<string>("");

  useEffect(() => {
    // Load all saved data from localStorage
    const savedHabits = localStorage.getItem("habit-tracker-v2");
    const savedCustom = localStorage.getItem("custom-habits");
    const savedMood = localStorage.getItem("mood-log");
    const savedJournal = localStorage.getItem("journal-log");

    if (savedHabits) setCompletedHabits(JSON.parse(savedHabits));
    if (savedCustom) setCustomHabits(JSON.parse(savedCustom));
    if (savedMood) setMoodLog(JSON.parse(savedMood));
    if (savedJournal) setJournalLog(JSON.parse(savedJournal));
  }, []);

  // Save all data to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("habit-tracker-v2", JSON.stringify(completedHabits));
  }, [completedHabits]);

  useEffect(() => {
    localStorage.setItem("custom-habits", JSON.stringify(customHabits));
  }, [customHabits]);

  useEffect(() => {
    localStorage.setItem("mood-log", JSON.stringify(moodLog));
  }, [moodLog]);

  useEffect(() => {
    localStorage.setItem("journal-log", JSON.stringify(journalLog));
  }, [journalLog]);

  const handleToggleHabit = (habit: string) => {
    if (!selectedDate) return;
    const habitsForDate = completedHabits[selectedDate] || [];
    const updated = habitsForDate.includes(habit)
      ? habitsForDate.filter((h) => h !== habit)
      : [...habitsForDate, habit];
    setCompletedHabits({ ...completedHabits, [selectedDate]: updated });
  };

  const handleAddHabit = () => {
    if (newHabit.trim() === "") return;
    setCustomHabits((prev) => [...prev, newHabit.trim()]);
    setNewHabit("");
  };

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood);
    if (selectedDate) {
      setMoodLog((prev) => ({ ...prev, [selectedDate]: mood }));
    }
  };

  const handleJournalSave = () => {
    if (selectedDate) {
      setJournalLog((prev) => ({ ...prev, [selectedDate]: journalEntry }));
    }
  };

  const allHabits = [
    ...concerns.flatMap((c) => suggestedHabits[c.trim()] ?? []),
    ...customHabits
  ];
  const uniqueHabits = Array.from(new Set(allHabits));
  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  return (
    <div className="min-h-screen bg-[#f9f9f3] p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-center mb-6">Your Wellness Space 🌿</h1>

      {/* 🌐 Tabs */}
      <div className="flex gap-4 mb-6">
        <Button
          variant={view === "suggestions" ? "default" : "outline"}
          onClick={() => setView("suggestions")}
        >
          Suggestions
        </Button>
        <Button
          variant={view === "tracking" ? "default" : "outline"}
          onClick={() => setView("tracking")}
        >
          Habit Tracking
        </Button>
        <Button
          variant={view === "journal" ? "default" : "outline"}
          onClick={() => setView("journal")}
        >
          Mood & Journal
        </Button>
        <Button
          variant={view === "chat" ? "default" : "outline"}
          onClick={() => setView("chat")}
        >
          Chat
        </Button>
      </div>

      {/* 🧠 Suggestions View */}
      {view === "suggestions" && (
        <>
          {concerns.map((concern) => (
            <Card key={concern} className="mb-4 w-full max-w-md shadow-lg">
              <CardContent className="p-4">
                <h2 className="text-xl font-semibold mb-2">{concern}</h2>
                {(suggestedHabits[concern.trim()] ?? ["Reflect and journal about this."]).map(
                  (habit, index) => (
                    <div key={index} className="flex items-center space-x-2 mb-2">
                      <span className="text-base">📝 {habit}</span>
                    </div>
                  )
                )}
              </CardContent>
            </Card>
          ))}
        </>
      )}

      {/* 📅 Habit Tracking View */}
      {view === "tracking" && (
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-4 text-center">Habit Tracking 📅</h2>
          <div className="flex justify-between items-center mb-4">
            <Button variant="outline" onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>
              ← Previous
            </Button>
            <h3 className="text-lg font-semibold">{format(currentMonth, "MMMM yyyy")}</h3>
            <Button variant="outline" onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>
              Next →
            </Button>
          </div>

          {/* Custom Habit Input */}
          <div className="flex gap-2 mb-4 w-full">
            <Input
              placeholder="Add a custom habit..."
              value={newHabit}
              onChange={(e) => setNewHabit(e.target.value)}
            />
            <Button onClick={handleAddHabit}>Add</Button>
          </div>

          <div className="grid grid-cols-7 gap-2">
            {daysInMonth.map((day) => {
              const dayStr = format(day, "yyyy-MM-dd");
              const doneCount = completedHabits[dayStr]?.length || 0;
              const mood = moodLog[dayStr];

              return (
                <Dialog key={dayStr}>
                  <DialogTrigger asChild>
                    <button
                      onClick={() => {
                        setSelectedDate(dayStr);
                        setSelectedMood(mood || "");
                        setJournalEntry(journalLog[dayStr] || "");
                      }}
                      className="bg-white rounded-lg shadow text-center p-2 hover:bg-purple-100 transition text-sm"
                    >
                      <div>{format(day, "d")}</div>
                      {mood && <div className="text-lg">{moodOptions[mood as keyof typeof moodOptions]}</div>}
                      <div className="text-xs text-gray-500">{doneCount} done</div>
                    </button>
                  </DialogTrigger>

                  <DialogContent>
                    <h2 className="text-lg font-semibold mb-4 text-purple-700">
                      Habits for {format(day, "PPP")}
                    </h2>

                    {/* Mood Selection */}
                    <div className="mb-4">
                      <p className="text-sm font-medium mb-2">How was your mood?</p>
                      <div className="flex gap-3">
                        {Object.entries(moodOptions).map(([key, emoji]) => (
                          <button
                            key={key}
                            onClick={() => handleMoodSelect(key)}
                            className={`text-2xl ${selectedMood === key ? "ring-2 ring-purple-500 rounded-full" : ""}`}
                          >
                            {emoji}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Habit Checkboxes */}
                    {uniqueHabits.length === 0 ? (
                      <p>No habits found for your concerns.</p>
                    ) : (
                      <div className="space-y-3">
                        {uniqueHabits.map((habit) => (
                          <div key={habit} className="flex items-center space-x-3">
                            <Checkbox
                              checked={completedHabits[dayStr]?.includes(habit)}
                              onCheckedChange={() => handleToggleHabit(habit)}
                            />
                            <Label className="text-sm">{habit}</Label>
                          </div>
                        ))}
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
              );
            })}
          </div>
        </div>
      )}

      {/* 📝 Mood & Journal View */}
      {view === "journal" && (
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-4 text-center">Mood & Journal 📝</h2>
          <div className="flex justify-between items-center mb-4">
            <Button variant="outline" onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>
              ← Previous
            </Button>
            <h3 className="text-lg font-semibold">{format(currentMonth, "MMMM yyyy")}</h3>
            <Button variant="outline" onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>
              Next →
            </Button>
          </div>

          <div className="grid grid-cols-7 gap-2">
            {daysInMonth.map((day) => {
              const dayStr = format(day, "yyyy-MM-dd");
              const mood = moodLog[dayStr];
              const journal = journalLog[dayStr] || "";

              return (
                <Dialog key={dayStr}>
                  <DialogTrigger asChild>
                    <button
                      onClick={() => {
                        setSelectedDate(dayStr);
                        setSelectedMood(mood || "");
                        setJournalEntry(journal);
                      }}
                      className="bg-white rounded-lg shadow text-center p-2 hover:bg-yellow-100 transition text-sm"
                    >
                      <div>{format(day, "d")}</div>
                      {mood && <div className="text-lg">{moodOptions[mood as keyof typeof moodOptions]}</div>}
                      {journal && <div className="text-xs">📔</div>}
                    </button>
                  </DialogTrigger>

                  <DialogContent>
                    <h2 className="text-lg font-semibold mb-4 text-purple-700">
                      {format(day, "PPP")}
                    </h2>

                    <p className="text-sm font-medium mb-2">Mood</p>
                    <div className="flex gap-3 mb-4">
                      {Object.entries(moodOptions).map(([key, emoji]) => (
                        <button
                          key={key}
                          onClick={() => handleMoodSelect(key)}
                          className={`text-2xl ${selectedMood === key ? "ring-2 ring-purple-500 rounded-full" : ""}`}
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>

                    <p className="text-sm font-medium mb-1">Journal Entry</p>
                    <Textarea
                      rows={5}
                      value={journalEntry}
                      onChange={(e) => setJournalEntry(e.target.value)}
                      className="mb-3"
                      placeholder="Write about your thoughts, feelings, or experiences today..."
                    />
                    <Button onClick={handleJournalSave}>Save Journal</Button>
                  </DialogContent>
                </Dialog>
              );
            })}
          </div>
        </div>
      )}

      {/* 💬 Chat View */}
      {view === "chat" && (
        <Card className="w-full max-w-md mt-6 shadow-lg">
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold mb-3">Need to talk?</h2>
            <p className="mb-3">
              Open the AI-powered chat below if you want to reflect, ask questions, or talk to someone without judgment. 💬
            </p>
            <Button
              className="w-full bg-blue-500 hover:bg-blue-600 text-white"
              onClick={() => router.push("/chat2")}
            >
              Open Chat
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}