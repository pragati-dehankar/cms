"use client";
import Link from "next/link";
import { ShieldAlert } from "lucide-react";

export default function UserAccessDenied({ message = "You do not have permission to view this page." }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center text-white px-4 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900">
      <ShieldAlert size={64} className="text-red-500 mb-6 animate-bounce" />
      <h2 className="text-3xl font-bold mb-2">Restricted Access</h2>
      <p className="text-gray-400 max-w-md mb-6">
        {message}
      </p>
      <Link
        href="/sign-in"
        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-semibold transition duration-300"
      >
        🔑 Log In
      </Link>
    </div>
  );
}
