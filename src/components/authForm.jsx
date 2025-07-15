
import { Icons } from "@/components/Icons";
import { Anvil } from "lucide-react";
import { signIn } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import Link from "next/link";

export default function AuthForm({origin}){
    const { toast } = useToast();
  const [loading, setLoading] = useState(false);
    const onSignIn = async () => {
        try {
          setLoading(true);
          await signIn("google");
        } catch (error) {
          console.error(error.message);
          toast({
            variant: "destructive",
            title: "Oh oh!",
            description: "Failed to sign in",
          });
        } finally {
          setLoading(false);
        }
      };

      return (
        <div className="w-full sm:w-[280px] md:w-[300px] bg-zinc-800 rounded-lg p-6 shadow-lg flex flex-col items-center gap-4 text-white">
          <Anvil className="size-10 text-gray-300" />
          <p className="text-center text-sm text-gray-300">
            {origin === "signup"
              ? "Welcome! Sign up with Google to start your journey as a blogger."
              : "Welcome back"}
          </p>
          <button
            className="flex items-center gap-3 bg-gray-700 px-6 py-2 rounded-md text-white text-base font-medium hover:bg-gray-600 transition-all duration-200"
            onClick={onSignIn}
          >
            <Icons.GoogleLogo className="size-6" />
            {loading ? "Loading..." : origin === "signup" ? "Sign up" : 'Sign In'}
          </button>
      
          {origin === "signup" ? (
            <p className="text-sm text-gray-400 text-center">
              Already have an account?{" "}
              <Link className="underline text-blue-400" href="/sign-in">
                Sign In
              </Link>
            </p>
          ) : (
            <p className="text-sm text-gray-400 text-center">
              New to PostCraft?{" "}
              <Link className="underline text-blue-400" href="/sign-up">
                Sign Up
              </Link>
            </p>
          )}
        </div>
      );
    }      