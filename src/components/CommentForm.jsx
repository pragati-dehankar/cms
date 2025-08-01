"use client";
import { useState } from "react";
import { saveComment } from "@/lib/localComments";
import { useSession } from "next-auth/react";

export default function CommentForm({ slug, onCommentAdded }) {
  const [text, setText] = useState("");
  const { data: session } = useSession();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    const newComment = {
      text,
      createdAt: new Date().toISOString(),
      user: session?.user?.name || "Anonymous",
      email: session?.user?.email || null,
    };

    saveComment(slug, newComment);
    setText("");
    onCommentAdded();
  };

  return (
    <form onSubmit={handleSubmit} className="my-4">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write your comment..."
        className="w-full p-2 rounded bg-gray-800 text-white"
      />
      <button
        type="submit"
        className="mt-2 bg-blue-600 text-white px-4 py-1 rounded"
      >
        Post Comment
      </button>
    </form>
  );
}
