"use client";

import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";
import { useSearchParams } from "next/navigation";

const GEMINI_API_KEY = "AIzaSyDs65xqMPGHcBh4ymiIHCGz57327Y67fYk";

type Message = {
  role: string;
  text: string;
};

// Prompt suggestions per concern/symptom
const promptSuggestionsByConcern: Record<string, string[]> = {
  "Feeling anxious or overwhelmed": [
    "How can I manage feeling overwhelmed day-to-day?",
    "What's the difference between normal worry and anxiety?",
    "Can you suggest quick grounding techniques for anxiety?",
  ],
  "Mood swings": [
    "Why do my emotions change so quickly sometimes?",
    "How can I track patterns in my mood changes?",
    "Are mood swings always a sign of a mental health condition?",
  ],
  "Difficulty focusing": [
    "What causes difficulty concentrating?",
    "How can I improve my focus naturally?",
    "When should I be concerned about attention problems?",
  ],
  "Sleep issues": [
    "What habits can help improve sleep quality?",
    "How does poor sleep affect mental health?",
    "What's the connection between anxiety and insomnia?",
  ],
  "Relationship struggles": [
    "How can I communicate better with loved ones?",
    "Why do my relationships feel difficult lately?",
    "How do mental health struggles affect relationships?",
  ],
  "Low self-esteem": [
    "How can I build more self-confidence?",
    "Why do I always feel like I'm not good enough?",
    "What are small ways to practice self-compassion?",
  ],
  "Obsessive thoughts": [
    "Why do certain thoughts keep repeating in my mind?",
    "How can I stop fixating on worries?",
    "What's the difference between overthinking and obsessive thoughts?",
  ],
  "Unexplained anger": [
    "Why do I get irritated so easily?",
    "How can I manage sudden anger episodes?",
    "What might be triggering my anger reactions?",
  ],
  "Feeling disconnected": [
    "Why do I sometimes feel detached from myself or surroundings?",
    "How can I feel more present in my daily life?",
    "Is feeling disconnected related to mental health?",
  ],
  "Unusual behaviors": [
    "How can I understand changes in my behavior lately?",
    "When should I be concerned about behavioral changes?",
    "How can I explain my experiences to others?",
  ],
  "Trauma flashbacks": [
    "Why do certain memories feel so overwhelming?",
    "What are good coping strategies for difficult memories?",
    "How can I feel safer when triggered?",
  ],
};

// General prompts for anyone without specific concerns listed
const generalPrompts = [
  "What's the difference between feeling down and depression?",
  "How can I check in with my mental health regularly?",
  "What are signs I might benefit from professional support?",
  "How can I explain mental health struggles to friends/family?",
];

export default function UndiagnosedSupportiveChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const chatRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();

  // Get concerns from URL parameters or localStorage
  const [concerns, setConcerns] = useState<string[]>([]);
  const [name, setName] = useState("");

  useEffect(() => {
    // Try to get concerns from URL parameters first
    const concernParams = searchParams.get("concerns");
    const urlConcerns = concernParams ? concernParams.split(",") : [];
    
    // Then check localStorage as fallback
    const savedConcerns = localStorage.getItem("concerns");
    const localConcerns = savedConcerns ? savedConcerns.split(",") : [];
    
    // Combine and remove duplicates
    const allConcerns = [...new Set([...urlConcerns, ...localConcerns])];
    setConcerns(allConcerns);
    
    // Get user name if available
    const savedName = localStorage.getItem("name");
    if (savedName) setName(savedName);

    // Send initial prompt to AI
    const hiddenPrompt = `You are a warm, empathetic mental health companion for someone who hasn't been formally diagnosed with any condition. Your user is named ${savedName || "Friend"}. They are experiencing the following concerns: ${allConcerns.length > 0 ? allConcerns.join(", ") : "general mental wellbeing questions"}. 

Important guidelines:
1. Never diagnose the user or suggest specific diagnoses
2. Focus on validation, coping strategies, and well-being practices
3. Encourage professional help when appropriate
4. Be warm and conversational, not clinical
5. Keep responses concise (2-3 paragraphs max)

Please greet them warmly and create a supportive atmosphere where they feel comfortable discussing their concerns.`;

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
      })
      .catch(error => {
        console.error("Error fetching initial message:", error);
        setMessages([{ 
          role: "model", 
          text: `Hi ${savedName || "there"}! I'm here to chat about how you're feeling and offer support for your wellbeing journey. Feel free to share what's on your mind or ask me anything.` 
        }]);
      });
  }, [searchParams]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = { role: "user", text };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setShowSuggestions(false);
    setLoading(true);

    try {
      // Add a hidden context message for the AI
      const contextMessage = `Remember: This user hasn't been formally diagnosed with any mental health condition. Their reported concerns are: ${concerns.join(", ")}. Provide supportive, non-diagnostic responses focused on coping strategies, validation, and wellbeing. Suggest professional help when appropriate.`;
      
      const aiMessages = [
        { role: "user", parts: [{ text: contextMessage }] },
        ...updatedMessages.map((m) => ({
          role: m.role,
          parts: [{ text: m.text }],
        }))
      ];

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: aiMessages,
          }),
        }
      );

      const data = await response.json();
      const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;

      setMessages([...updatedMessages, { role: "model", text: reply || "Sorry, I couldn't understand that." }]);
    } catch (err) {
      setMessages([...updatedMessages, { role: "model", text: "Something went wrong. Try again later." }]);
    } finally {
      setLoading(false);
    }
  };

  const getPromptSuggestions = (): string[] => {
    if (concerns.length === 0) {
      return generalPrompts;
    }
    
    // Get suggestions for each concern the user has
    const suggestions = concerns.flatMap(concern => {
      return promptSuggestionsByConcern[concern] || [];
    });
    
    // Return unique suggestions (up to 4)
    return [...new Set(suggestions)].slice(0, 4);
  };

  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  return (
    <div className="min-h-screen bg-[#f9f9f3] p-6 flex flex-col items-center">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-xl p-6 space-y-4">
        <h2 className="text-2xl font-bold text-center mb-2">Supportive Chat 💬</h2>
        <p className="text-center text-sm text-gray-600 mb-4">
          A safe space to explore your feelings and find helpful strategies
        </p>

        <div
          ref={chatRef}
          className="space-y-3 max-h-[600px] overflow-y-auto border p-4 rounded-lg bg-purple-50"
        >
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-lg whitespace-pre-wrap ${
                msg.role === "user" 
                  ? "bg-blue-100 ml-12 text-right" 
                  : "bg-white mr-12 text-left shadow-sm"
              }`}
            >
              <ReactMarkdown>{msg.text}</ReactMarkdown>
            </div>
          ))}
          
          {loading && (
            <div className="bg-white p-3 rounded-lg mr-12 text-left shadow-sm animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          )}
        </div>

        {/* Prompt Suggestions */}
        {showSuggestions && messages.length < 2 && (
          <div className="flex flex-wrap gap-2">
            {getPromptSuggestions().map((suggestion, idx) => (
              <Button
                key={idx}
                variant="outline"
                onClick={() => sendMessage(suggestion)}
                className="text-sm bg-purple-50 hover:bg-purple-100"
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
            className="rounded-full"
          />
          <Button 
            onClick={() => sendMessage(input)} 
            disabled={loading}
            className="rounded-full bg-purple-600 hover:bg-purple-700"
          >
            {loading ? "..." : "Send"}
          </Button>
        </div>
        
        <p className="text-xs text-center text-gray-500 mt-2">
          This chat provides supportive guidance only and is not a substitute for professional mental health care.
        </p>
      </div>
    </div>
  );
}