"use client";
import { toast } from "@/hooks/use-toast";
import { ShieldAlert } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
// import { toast } from "@/components/ui/use-toast";


export default function UserAccessMessage({
  message = "You do not have permission to view this page.",
}) {
  const { data: session } = useSession();
  const [isSent, setIsSent] = useState(false);

  const handleRequest = async () => {
    if (!session?.user?.email) {
      toast({
        title: "Login Required",
        description: "Please sign in to request admin access.",
        variant: "destructive",
      });
      return;
    }

    try {
      const res = await fetch("https://formsubmit.co/ajax/pragatid1122@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: session.user.name,
          email: session.user.email,
          message: `User ${session.user.name} (${session.user.email}) is requesting admin access.`,
        }),
      });

      const data = await res.json();
      if (data.success === "true") {
        setIsSent(true);
        toast({
          title: "Request Sent",
          description: "Your admin access request has been sent.",
        });
      } else {
        throw new Error("Failed to send request");
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to send admin access request.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center text-white px-4 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900">
      <ShieldAlert size={64} className="text-red-500 mb-6 animate-bounce" />
      <h2 className="text-4xl font-extrabold mb-3 tracking-tight text-red-400">Admins Only</h2>
      <p className="text-gray-300 max-w-md mb-6 text-lg">{message}</p>

      <div className="flex gap-4">
        <button
          onClick={handleRequest}
          className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded text-white font-semibold shadow transition"
          disabled={isSent}
        >
          {isSent ? "✅ Request Sent" : "📩 Request Admin Access"}
        </button>
      </div>
    </div>
  );
}
