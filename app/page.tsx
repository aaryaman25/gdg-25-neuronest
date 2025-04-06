import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-4xl font-bold mb-4">NeuroNest</h1>
      <p className="text-gray-600 mb-6">Your AI-powered journey starts here.</p>
      <Link
        href="/start"
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
      >
        Get Started
      </Link>
    </main>
  );
}
