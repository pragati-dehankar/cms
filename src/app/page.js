"use client";

import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Layers, Pencil, Zap } from "lucide-react";
import Link from "next/link";
// other imports...

export default function Landing() {
  const { data: session } = useSession();

  return (
    <main className="w-full">
      {/* Your landing page JSX here */}
      <section className="flex  w-full justify-center  h-[50vh] sm:h-[70vh]">
        <div className="flex flex-col justify-center items-center gap-4 text-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tighter  sm:text-4xl md:text-5xl mb-2 lg:text-6xl">
              Manage your content with Ease
            </h1>
            <p className="text-gray-400 max-w-[700px] mx-auto">
              Streamline your content workflow, publish with confidence.
            </p>
          </div>
          <div className="flex gap-3">
            {session?.user ? (
              <Link
                href="/dashboard"
                className="bg-gray-200 text-black px-4 py-1 rounded hover:bg-gray-300 transition-all duration-200 delay-100"
              >
                Go to Dashboard
              </Link>
            ) : (
              <Link
                href="/sign-in"
                className="bg-gray-200 text-black px-4 py-1 rounded hover:bg-gray-300 transition-all duration-200 delay-100"
              >
                Try it out!
              </Link>
            )}
            <Button variant={"outline"}>Learn More</Button>
          </div>
        </div>
      </section>
      {/* Other sections */}
    </main>
  );
}
