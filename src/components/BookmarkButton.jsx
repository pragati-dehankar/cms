"use client";

import { useEffect, useState } from "react";
import { isBookmarked, saveBookmark, removeBookmark } from "@/lib/localBookmarks";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { useSession } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export default function BookmarkButton({ post }) {
  const [bookmarked, setBookmarked] = useState(false);
  const { data: session } = useSession();
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    setBookmarked(isBookmarked(post.slug));
  }, [post.slug]);

  const toggleBookmark = () => {
    if (!session?.user) {
      toast({
        title: "Login Required",
        description: "Please sign in to bookmark this post.",
        variant: "destructive",
      });
      router.push("/sign-in");
      return;
    }

    if (bookmarked) {
      removeBookmark(post.slug);
      toast({
        title: "Bookmark Removed",
        description: `"${post.title}" removed from bookmarks.`,
      });
    } else {
      saveBookmark(post);
      toast({
        title: "Bookmarked",
        description: `"${post.title}" added to your bookmarks.`,
      });
    }

    setBookmarked(!bookmarked);
  };

  return (
    <button onClick={toggleBookmark} className="flex items-center gap-1 text-sm text-white">
      {bookmarked ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
      {bookmarked ? "Bookmarked" : "Bookmark"}
    </button>
  );
}
