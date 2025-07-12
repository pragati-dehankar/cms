"use client";

import { useEffect, useState } from "react";
import { isBookmarked, saveBookmark, removeBookmark } from "@/lib/localBookmarks";
import { Bookmark, BookmarkCheck } from "lucide-react";

export default function BookmarkButton({ post }) {
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    // Safe check for browser environment
    if (typeof window !== "undefined" && post?.slug) {
      setBookmarked(isBookmarked(post.slug));
    }
  }, [post?.slug]);

  const toggleBookmark = () => {
    if (!post?.slug) return;
    if (bookmarked) {
      removeBookmark(post.slug);
    } else {
      saveBookmark(post);
    }
    setBookmarked(!bookmarked);
  };

  return (
    <button
      onClick={toggleBookmark}
      className="flex items-center gap-1 text-sm text-white"
    >
      {bookmarked ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
      {bookmarked ? "Bookmarked" : "Bookmark"}
    </button>
  );
}
