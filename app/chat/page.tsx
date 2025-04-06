"use client";

import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";

const GEMINI_API_KEY = "AIzaSyDs65xqMPGHcBh4ymiIHCGz57327Y67fYk";

type Message = {
  role: string;
  text: string;
};

// Prompt suggestions per diagnosis
const promptSuggestionsByDiagnosis: Record<string, string[]> = {
  "Obsessive-Compulsive Disorder (OCD)": [
    "How can I manage compulsive behaviors?",
    "Are intrusive thoughts common with OCD?",
    "Can therapy help me control rituals?",
  ],
  "Major Depressive Disorder": [
    "How can I feel motivated again?",
    "Is it normal to feel tired all the time?",
    "How does depression affect thinking?",
  ],
  "Anxiety Disorders": [
    "Why do I feel anxious all the time?",
    "Tips to calm down during a panic attack?",
    "How does anxiety affect sleep?",
  ],
  Other: [
    "Can you help me understand my diagnosis?",
    "What are common symptoms people experience?",
  ],
};

// Prompt suggestions per concern
const promptSuggestionsByConcern: Record<string, string[]> = {
  "Mood swings": [
    "Why do I have sudden mood changes?",
    "Is this related to any disorder?",
  ],
  "Feeling anxious or overwhelmed": [
    "How can I manage feeling overwhelmed?",
    "When does anxiety become a problem?",
  ],
  "Difficulty focusing": [
    "Why do I lose focus so easily?",
    "Could this be ADHD?",
  ],
  "Sleep issues": [
    "Why can’t I sleep well?",
    "How is sleep connected to mental health?",
  ],
};

export default function SupportiveChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const chatRef = useRef<HTMLDivElement>(null);

  const [diagnosis, setDiagnosis] = useState("");
  const [concerns, setConcerns] = useState<string[]>([]);
  const [name, setName] = useState("");

  useEffect(() => {
    const savedDiagnosis = localStorage.getItem("diagnosis");
    const savedConcerns = localStorage.getItem("concerns");
    const savedName = localStorage.getItem("name");

    if (savedDiagnosis) setDiagnosis(savedDiagnosis);
    if (savedConcerns) setConcerns(savedConcerns.split(","));
    if (savedName) setName(savedName);

    const hiddenPrompt = `You are a warm, empathetic mental health companion. Your user is named ${savedName || "Friend"}. ${
      savedDiagnosis
        ? `They have been diagnosed with ${savedDiagnosis}.`
        : `They are experiencing symptoms such as: ${savedConcerns || "none"}.`
    } Please greet them with warmth and set a supportive tone.`;

    fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: hiddenPrompt }],
            },
          ],
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (reply) {
          setMessages([{ role: "model", text: reply }]);
        }
      });
  }, []);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = { role: "user", text };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setShowSuggestions(false);
    setLoading(true);

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: updatedMessages.map((m) => ({
              role: m.role,
              parts: [{ text: m.text }],
            })),
          }),
        }
      );

      const data = await response.json();
      const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;

      setMessages([...updatedMessages, { role: "model", text: reply || "Sorry, I couldn’t understand that." }]);
    } catch (err) {
      setMessages([...updatedMessages, { role: "model", text: "Something went wrong. Try again later." }]);
    } finally {
      setLoading(false);
    }
  };

  const getPromptSuggestions = (): string[] => {
    if (diagnosis) {
      return promptSuggestionsByDiagnosis[diagnosis] || promptSuggestionsByDiagnosis["Other"];
    } else {
      const suggestions = concerns.flatMap((c) => promptSuggestionsByConcern[c] || []);
      return [...new Set(suggestions)].slice(0, 4);
    }
  };

  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  return (
    <div className="min-h-screen bg-[#f5f5dc] p-6 flex flex-col items-center">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-xl p-6 space-y-4">
        <h2 className="text-2xl font-bold text-purple-600">Supportive Chat</h2>

        <div
          ref={chatRef}
          className="space-y-3 max-h-[800px] overflow-y-auto border p-4 rounded bg-purple-50"
        >
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`p-2 rounded-md whitespace-pre-wrap ${
                msg.role === "user" ? "bg-blue-100 text-right" : "bg-gray-100 text-left"
              }`}
            >
              <ReactMarkdown>{msg.text}</ReactMarkdown>
            </div>
          ))}
        </div>

        {/* Prompt Suggestions */}
        {showSuggestions && (
          <div className="flex flex-wrap gap-2">
            {getPromptSuggestions().map((suggestion, idx) => (
              <Button
                key={idx}
                variant="outline"
                onClick={() => sendMessage(suggestion)}
                className="text-sm"
              >
                {suggestion}
              </Button>
            ))}
          </div>
        )}

        {/* Input Field */}
        <div className="flex gap-2">
          <Input
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
          />
          <Button onClick={() => sendMessage(input)} disabled={loading}>
            {loading ? "..." : "Send"}
          </Button>
        </div>
      </div>
    </div>
  );
}
