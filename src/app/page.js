"use client";

import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Layers, Pencil, Zap } from "lucide-react";
import Link from "next/link";

export default function Landing() {
  const { data: session, status } = useSession();

  return (
    <main className="w-full">
      {/* HERO SECTION */}
      <section className="flex w-full justify-center h-[50vh] sm:h-[70vh]">
        <div className="flex flex-col justify-center items-center gap-4 text-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-2 lg:text-6xl">
              Manage your content with Ease
            </h1>
            <p className="text-gray-400 max-w-[700px] mx-auto">
              Streamline your content workflow, publish with confidence.
            </p>
          </div>
          <div className="flex gap-3">
            {/* Only render once status is loaded */}
            {status === "loading" ? null : session?.user ? (
              <Link
                href="/dashboard"
                className="bg-gray-200 text-black px-4 py-1 rounded hover:bg-gray-300 transition-all duration-200 delay-100"
              >
                Explore and Create
              </Link>
            ) : (
              <Link
                href="/sign-in"
                className="bg-gray-200 text-black px-4 py-1 rounded hover:bg-gray-300 transition-all duration-200 delay-100"
              >
                Try it out!
              </Link>
            )}
            <Button
              variant="outline"
              onClick={() => {
                const el = document.getElementById("features");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section
        id="features"
        className="h-screen min-h-screen sm:min-h-[80vh] bg-gray-600/10 w-full flex justify-center items-center px-4"
      >
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-3">
          <span className="flex flex-col items-center gap-2">
            <Pencil size={50} />
            <h3 className="text-xl font-bold text-gray-100">
              Intuitive Editor
            </h3>
            <p className="text-gray-400 text-center w-[70%]">
              Create and edit content with user friendly interface
            </p>
          </span>
          <span className="flex flex-col items-center gap-2">
            <Layers size={50} />
            <h3 className="text-xl font-bold text-gray-100">Flexible Tools</h3>
            <p className="text-gray-400 text-center w-[70%]">
              Organize and structure your content with rich tools
            </p>
          </span>
          <span className="flex flex-col items-center gap-2">
            <Zap size={50} />
            <h3 className="text-xl font-bold text-gray-100">Blazing Fast</h3>
            <p className="text-gray-400 text-center w-[70%]">
              Experience lightning-fast performance and publishing
            </p>
          </span>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="h-[60vh] sm:h-[50vh] w-full flex justify-center items-start flex-col">
        <div className="max-w-[50%] mx-auto space-y-3">
          <h4 className="font-bold text-2xl">
            Ready to transform your content journey?
          </h4>
          <p className="text-sm text-gray-400">
            Join thousands of content creators like you.
          </p>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter your email"
              className="bg-zinc-800 focus:outline-none rounded-md px-2 py-2 text-sm text-gray-400"
            />
            <Button variant="outline">Submit</Button>
          </div>
        </div>
      </section>
    </main>
  );
}
