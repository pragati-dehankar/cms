"use client";
import Link from "next/link";
import { ShieldAlert } from "lucide-react";

export default function UserAccessDenied() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center text-white px-4">
      <ShieldAlert size={48} className="text-red-500 mb-4" />
      <h2 className="text-2xl font-bold mb-2">Access Denied</h2>
      <p className="text-gray-300 mb-6">
        You do not have permission to view this page.
      </p>
      <Link
        href="/"
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white transition"
      >
        Go to Homepage
      </Link>
    </div>
  );
}
