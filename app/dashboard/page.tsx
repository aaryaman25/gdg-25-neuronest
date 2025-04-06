import Link from "next/link";

export default function Dashboard() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p className="text-gray-600">Choose an option below:</p>
      <div className="mt-4 space-y-2">
        <Link href="/dashboard/general-support" className="text-blue-500 hover:underline">
          General Support
        </Link>
        <Link href="/dashboard/detailed-guidance" className="text-blue-500 hover:underline">
          Detailed Guidance
        </Link>
        <Link href="/dashboard/community" className="text-blue-500 hover:underline">
          Community Support
        </Link>
      </div>
    </main>
  );
}
