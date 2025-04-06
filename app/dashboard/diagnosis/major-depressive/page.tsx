"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  format,
  eachDayOfInterval,
  startOfMonth,
  endOfMonth,
  addMonths,
  subMonths,
} from "date-fns";

const defaultHabits = [
  "🛌 Get out of bed by a set time",
  "🧼 Take a shower or wash your face",
  "🌤 Get sunlight or fresh air",
  "🍽 Eat at least one nourishing meal",
  "📖 Do something that made you feel okay today",
];

const depressionAdvice = [
  "Be gentle with yourself — it's okay to have low days.",
  "Break tasks into tiny steps, even if it’s just brushing your teeth.",
  "Avoid isolation — try to connect with at least one person.",
  "You don’t have to be productive to have worth.",
];

const moodOptions = {
  hopeful: "🌤",
  neutral: "😐",
  low: "🌧",
  anxious: "😰",
  exhausted: "😴",
};

export default function DepressionSupportPage() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [completedHabits, setCompletedHabits] = useState<Record<string, string[]>>({});
  const [customHabits, setCustomHabits] = useState<string[]>([]);
  const [moodLog, setMoodLog] = useState<Record<string, string>>({});
  const [journalLog, setJournalLog] = useState<Record<string, string>>({});
  const [view, setView] = useState<"advice" | "habits" | "mood">("advice");
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [newHabit, setNewHabit] = useState("");
  const [selectedMood, setSelectedMood] = useState<string>("");
  const [journalEntry, setJournalEntry] = useState<string>("");

  useEffect(() => {
    const savedLog = localStorage.getItem("depressionHabitLog");
    const savedCustom = localStorage.getItem("depressionCustomHabits");
    const savedMood = localStorage.getItem("depressionMoodLog");
    const savedJournal = localStorage.getItem("depressionJournalLog");

    if (savedLog) setCompletedHabits(JSON.parse(savedLog));
    if (savedCustom) setCustomHabits(JSON.parse(savedCustom));
    if (savedMood) setMoodLog(JSON.parse(savedMood));
    if (savedJournal) setJournalLog(JSON.parse(savedJournal));
  }, []);

  useEffect(() => {
    localStorage.setItem("depressionHabitLog", JSON.stringify(completedHabits));
  }, [completedHabits]);

  useEffect(() => {
    localStorage.setItem("depressionCustomHabits", JSON.stringify(customHabits));
  }, [customHabits]);

  useEffect(() => {
    localStorage.setItem("depressionMoodLog", JSON.stringify(moodLog));
  }, [moodLog]);

  useEffect(() => {
    localStorage.setItem("depressionJournalLog", JSON.stringify(journalLog));
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
    if (selectedDate) {
      setMoodLog((prev) => ({ ...prev, [selectedDate]: mood }));
    }
  };

  const handleJournalSave = () => {
    if (selectedDate) {
      setJournalLog((prev) => ({ ...prev, [selectedDate]: journalEntry }));
    }
  };

  const allHabits = [...defaultHabits, ...customHabits];
  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  return (
    <div className="min-h-screen bg-[#fef9f5] p-6 flex flex-col items-center">
      <h1 className="text-2xl font-bold text-blue-700 mb-2">Depression Support</h1>

      <div className="mb-6 space-x-4">
        <Button variant={view === "advice" ? "default" : "outline"} onClick={() => setView("advice")}>Advice</Button>
        <Button variant={view === "habits" ? "default" : "outline"} onClick={() => setView("habits")}>Habits</Button>
        <Button variant={view === "mood" ? "default" : "outline"} onClick={() => setView("mood")}>Mood & Journal</Button>
        <Button variant="outline" onClick={() => router.push("/chat")}>Chat</Button>
      </div>

      {view === "advice" && (
        <div className="max-w-xl space-y-4">
          {depressionAdvice.map((tip, i) => (
            <div key={i} className="bg-white shadow p-4 rounded-lg text-gray-700">{tip}</div>
          ))}
        </div>
      )}

      {view === "habits" && (
        <>
          <div className="flex justify-between items-center w-full max-w-md mb-4">
            <Button variant="outline" onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>← Previous</Button>
            <h2 className="text-lg font-semibold">{format(currentMonth, "MMMM yyyy")}</h2>
            <Button variant="outline" onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>Next →</Button>
          </div>

          <div className="flex gap-2 mb-4 w-full max-w-md">
            <Input
              placeholder="Add a self-care habit..."
              value={newHabit}
              onChange={(e) => setNewHabit(e.target.value)}
            />
            <Button onClick={handleAddHabit}>Add</Button>
          </div>

          <div className="grid grid-cols-7 gap-2 max-w-md">
            {daysInMonth.map((day) => {
              const dayStr = format(day, "yyyy-MM-dd");
              const mood = moodLog[dayStr];
              const doneCount = completedHabits[dayStr]?.length || 0;

              return (
                <Dialog key={dayStr}>
                  <DialogTrigger asChild>
                    <button
                      onClick={() => {
                        setSelectedDate(dayStr);
                        setSelectedMood(mood || "");
                      }}
                      className="bg-white rounded-lg shadow text-center p-2 hover:bg-blue-100 transition text-sm"
                    >
                      <div>{format(day, "d")}</div>
                      {mood && <div className="text-lg">{moodOptions[mood as keyof typeof moodOptions]}</div>}
                      <div className="text-xs text-gray-500">{doneCount} done</div>
                    </button>
                  </DialogTrigger>

                  <DialogContent>
                    <h2 className="text-lg font-semibold mb-4 text-blue-700">
                      {format(day, "PPP")}
                    </h2>

                    <div className="mb-4">
                      <p className="text-sm font-medium mb-2">How was your mood?</p>
                      <div className="flex gap-3">
                        {Object.entries(moodOptions).map(([key, emoji]) => (
                          <button
                            key={key}
                            onClick={() => handleMoodSelect(key)}
                            className={`text-2xl ${selectedMood === key ? "ring-2 ring-blue-500 rounded-full" : ""}`}
                          >
                            {emoji}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      {allHabits.map((habit) => (
                        <div key={habit} className="flex items-center space-x-3">
                          <Checkbox
                            checked={completedHabits[dayStr]?.includes(habit)}
                            onCheckedChange={() => handleToggleHabit(habit)}
                          />
                          <Label className="text-sm">{habit}</Label>
                        </div>
                      ))}
                    </div>
                  </DialogContent>
                </Dialog>
              );
            })}
          </div>
        </>
      )}

      {view === "mood" && (
        <div className="grid grid-cols-7 gap-2 max-w-md">
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
                  </button>
                </DialogTrigger>

                <DialogContent>
                  <h2 className="text-lg font-semibold mb-4 text-blue-700">
                    {format(day, "PPP")}
                  </h2>

                  <p className="text-sm font-medium mb-2">Mood</p>
                  <div className="flex gap-3 mb-4">
                    {Object.entries(moodOptions).map(([key, emoji]) => (
                      <button
                        key={key}
                        onClick={() => handleMoodSelect(key)}
                        className={`text-2xl ${selectedMood === key ? "ring-2 ring-blue-500 rounded-full" : ""}`}
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
                  />
                  <Button onClick={handleJournalSave}>Save</Button>
                </DialogContent>
              </Dialog>
            );
          })}
        </div>
      )}
    </div>
  );
}
