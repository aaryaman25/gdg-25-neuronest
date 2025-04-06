"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";
import { PhoneCall } from "lucide-react";

// DSM-5 Diagnosis Options
const dsm5Conditions = [
  "Anxiety Disorders",
  "Major Depressive Disorder",
  "Bipolar Disorder",
  "ADHD (Attention-Deficit/Hyperactivity Disorder)",
  "Obsessive-Compulsive Disorder (OCD)",
  "Post-Traumatic Stress Disorder (PTSD)",
  "Autism Spectrum Disorder (ASD)",
  "Schizophrenia",
  "Borderline Personality Disorder",
  "Eating Disorders (Anorexia, Bulimia, Binge-Eating)",
  "Dissociative Disorders",
  "Paranoid Personality Disorder",
  "Antisocial Personality Disorder",
  "Histrionic Personality Disorder",
  "Narcissistic Personality Disorder",
  "Schizoaffective Disorder",
  "Other",
];

// Concerns if user is not diagnosed
const concernsList = [
  "Mood swings",
  "Feeling anxious or overwhelmed",
  "Difficulty focusing",
  "Sleep issues",
  "Relationship struggles",
  "Low self-esteem",
  "Obsessive thoughts",
  "Unexplained anger",
  "Feeling disconnected",
  "Unusual behaviors",
  "Trauma flashbacks",
];

// Folder slugs for each condition
const conditionFolderMapping = {
  "Anxiety Disorders": "anxiety",
  "Major Depressive Disorder": "major-depressive",
  "Bipolar Disorder": "bipolar",
  "ADHD (Attention-Deficit/Hyperactivity Disorder)": "adhd",
  "Obsessive-Compulsive Disorder (OCD)": "ocd",
  "Post-Traumatic Stress Disorder (PTSD)": "ptsd",
  "Autism Spectrum Disorder (ASD)": "autism",
  "Schizophrenia": "schizophrenia",
  "Borderline Personality Disorder": "borderline-personality",
  "Eating Disorders (Anorexia, Bulimia, Binge-Eating)": "eating-disorders",
  "Dissociative Disorders": "dissociative",
  "Paranoid Personality Disorder": "paranoid-personality",
  "Antisocial Personality Disorder": "antisocial-personality",
  "Histrionic Personality Disorder": "histrionic-personality",
  "Narcissistic Personality Disorder": "narcissistic-personality",
  "Schizoaffective Disorder": "schizoaffective",
  "Other": "other",
};

export default function Onboarding() {
  const [name, setName] = useState("");
  const [age, setAge] = useState<number | null>(null);
  const [diagnosed, setDiagnosed] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [concerns, setConcerns] = useState<string[]>([]);
  const [step, setStep] = useState(1);
  const [showHelplineInfo, setShowHelplineInfo] = useState(false);
  const router = useRouter();

  // Load saved data
  useEffect(() => {
    const savedName = localStorage.getItem("name");
    const savedAge = localStorage.getItem("age");
    const savedDiagnosed = localStorage.getItem("diagnosed");
    const savedDiagnosis = localStorage.getItem("diagnosis");
    const savedConcerns = localStorage.getItem("concerns");

    if (savedName) setName(savedName);
    if (savedAge) setAge(Number(savedAge));
    if (savedDiagnosed) setDiagnosed(savedDiagnosed);
    if (savedDiagnosis) setDiagnosis(savedDiagnosis);
    if (savedConcerns) setConcerns(savedConcerns.split(","));
  }, []);

  // Save on change
  useEffect(() => {
    localStorage.setItem("name", name);
  }, [name]);

  useEffect(() => {
    if (age !== null) localStorage.setItem("age", age.toString());
  }, [age]);

  useEffect(() => {
    localStorage.setItem("diagnosed", diagnosed);
  }, [diagnosed]);

  useEffect(() => {
    localStorage.setItem("diagnosis", diagnosis);
  }, [diagnosis]);

  useEffect(() => {
    localStorage.setItem("concerns", concerns.join(","));
  }, [concerns]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f5f5dc] p-6 relative">
      {/* Main Form Card */}
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-sm text-center transition-all duration-300 hover:scale-105">
        
        {/* Step 1 */}
        {step === 1 && (
          <div className="space-y-5 animate-fade-in">
            <Label htmlFor="name" className="text-lg font-semibold">
              Enter your name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && name && setStep(2)}
              className="border rounded-lg p-2 w-full"
              placeholder="Type your name..."
              autoFocus
            />
            <Button
              onClick={() => name && setStep(2)}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition"
            >
              Next
            </Button>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div className="space-y-5 animate-fade-in">
            <h2 className="text-xl font-semibold">Hello, {name}! 👋</h2>
            <Label htmlFor="age" className="text-lg font-semibold">
              Select your age
            </Label>
            <Select onValueChange={(value) => setAge(Number(value))} defaultValue={age?.toString()}>
              <SelectTrigger className="border rounded-lg p-2 w-full">
                <SelectValue placeholder="Choose your age" />
              </SelectTrigger>
              <SelectContent>
                {[...Array(100)].map((_, i) => (
                  <SelectItem key={i + 1} value={(i + 1).toString()}>
                    {i + 1}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              onClick={() => age && setStep(3)}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition"
            >
              Next
            </Button>
          </div>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <div className="space-y-5 animate-fade-in">
            <h2 className="text-xl font-semibold">Almost there, {name}!</h2>
            <Label className="text-lg font-semibold">
              Have you been diagnosed with anything?
            </Label>
            <Select onValueChange={setDiagnosed} defaultValue={diagnosed}>
              <SelectTrigger className="border rounded-lg p-2 w-full">
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Yes">Yes, I have a diagnosis</SelectItem>
                <SelectItem value="No">No, but I have concerns</SelectItem>
              </SelectContent>
            </Select>
            {diagnosed && (
              <Button
                onClick={() => setStep(4)}
                className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg transition"
              >
                Next
              </Button>
            )}
          </div>
        )}

        {/* Step 4: Diagnosed */}
        {step === 4 && diagnosed === "Yes" && (
          <div className="space-y-5 animate-fade-in">
            <Label className="text-lg font-semibold">
              What is your diagnosis?
            </Label>
            <Select onValueChange={setDiagnosis} defaultValue={diagnosis}>
              <SelectTrigger className="border rounded-lg p-2 w-full">
                <SelectValue placeholder="Select your diagnosis" />
              </SelectTrigger>
              <SelectContent>
                {dsm5Conditions.map((condition, index) => (
                  <SelectItem key={index} value={condition}>
                    {condition}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              onClick={() => {
                if (diagnosis && diagnosis in conditionFolderMapping) {
                  const folderName = conditionFolderMapping[diagnosis as keyof typeof conditionFolderMapping];
                  router.push(`/dashboard/diagnosis/${folderName}`);
                }
              }}
              className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg transition"
            >
              Continue
            </Button>
          </div>
        )}

        {/* Step 4: Concerns */}
        {step === 4 && diagnosed === "No" && (
          <div className="space-y-5 animate-fade-in text-left">
            <Label className="text-lg font-semibold block text-center">
              What are your main concerns?
            </Label>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {concernsList.map((concern) => (
                <div key={concern} className="flex items-center space-x-2">
                  <Checkbox
                    checked={concerns.includes(concern)}
                    onCheckedChange={(checked) =>
                      setConcerns((prev) =>
                        checked ? [...prev, concern] : prev.filter((c) => c !== concern)
                      )
                    }
                  />
                  <Label>{concern}</Label>
                </div>
              ))}
            </div>
            <Button
              onClick={() => {
                if (concerns.length > 0) {
                  router.push(`/dashboard/not-diagnosed?concerns=${concerns.join(",")}`);
                }
              }}
              className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg transition"
              disabled={concerns.length === 0}
            >
              Continue
            </Button>
          </div>
        )}
      </div>

      {/* Helpline Card - Fixed in right corner */}
      <div className="fixed bottom-6 right-6">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
          <div 
            onClick={() => setShowHelplineInfo(true)}
            className="bg-red-500 text-white px-4 py-3 flex items-center gap-2 cursor-pointer hover:bg-red-600 transition-colors"
          >
            <PhoneCall size={18} />
            <span className="font-medium">Crisis Helpline</span>
          </div>
        </div>
      </div>

      {/* Helpline Information Modal */}
{showHelplineInfo && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-lg p-6 max-w-md w-full">
      <h2 className="text-xl font-bold mb-4">Crisis Support Resources</h2>
      <div className="space-y-4">
        {/* USA Helplines */}
        <div>
          <h3 className="font-semibold">National Suicide Prevention Lifeline (USA)</h3>
          <p>24/7 support for people in distress</p>
          <a href="tel:988" className="text-blue-600 font-bold">988</a>
        </div>
        <div>
          <h3 className="font-semibold">Crisis Text Line (USA & Canada)</h3>
          <p>Text HOME to 741741</p>
        </div>
        <div>
          <h3 className="font-semibold">SAMHSA National Helpline (USA)</h3>
          <p>Treatment referral service (24/7)</p>
          <a href="tel:1-800-662-4357" className="text-blue-600 font-bold">1-800-662-HELP (4357)</a>
        </div>

        {/* UK & Ireland Helplines */}
        <div>
          <h3 className="font-semibold">Samaritans (UK & Ireland)</h3>
          <p>24/7 support for people in distress</p>
          <a href="tel:116123" className="text-blue-600 font-bold">116 123</a>
        </div>

        {/* Australian Helplines */}
        <div>
          <h3 className="font-semibold">Lifeline (Australia)</h3>
          <p>24/7 support for people in distress</p>
          <a href="tel:131114" className="text-blue-600 font-bold">13 11 14</a>
        </div>

        {/* Indian Helplines */}
        <div>
          <h3 className="font-semibold">AASRA (India)</h3>
          <p>24/7 support for people in distress</p>
          <a href="tel:91-9820466726" className="text-blue-600 font-bold">022-2772 6771</a>
        </div>
        <div>
          <h3 className="font-semibold">Sneha (India)</h3>
          <p>24/7 mental health support</p>
          <a href="tel:044-2464 0050​" className="text-blue-600 font-bold">022-2772 6771</a>
        </div>
        <div>
          <h3 className="font-semibold">Befrienders India</h3>
          <p>24/7 suicide prevention helpline</p>
          <a href="tel:04424640050" className="text-blue-600 font-bold">044-2464 0050</a>
        </div>
        <div>
          <h3 className="font-semibold">Kiran (India)</h3>
          <p>Government mental health support</p>
          <a href="tel:18005990019" className="text-blue-600 font-bold">1800-599-0019</a>
        </div>
      </div>
      <Button 
        onClick={() => setShowHelplineInfo(false)}
        className="w-full mt-6 bg-blue-500 hover:bg-blue-600 text-white"
      >
        Close
      </Button>
    </div>
  </div>
)}
    </div>
  );
}