
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

return <div className="w-full sm:w-1/2 md:w-1/5 p-4 rounded-lg mx-4 bg-zinc-800 flex flex-col items-center gap-4">
<Anvil className="size-12 text-gray-300" />
<p className="text-center text-sm text-gray-200">
  {origin=='signup'?"Welcome, by continuing with Sign in  , you\`ll be a bloger":"Welcome back"}
</p>
<button
  className="flex items-center gap-2 bg-gray-800/50 py-2 rounded 
font-bold text-lg px-10 hover:bg-gray-500/40 transition-colors duration-200 "
  onClick={onSignIn}
>
  <Icons.GoogleLogo className="size-7" />{" "}
  {loading ? "Loading..." : origin==='signup'?'Sign up':'"Sign In"'}
</button>
{origin ==="signup"?
<p className="text-sm text-gray-400 text-center">Already having an account<Link className="underline" href="/sign-in">Sign Up</Link></p>
:
<p className="text-sm text-gray-400 ">New to CMS?<Link className="underline" href="/sign-up">Sign Up</Link></p>
}
</div>
}