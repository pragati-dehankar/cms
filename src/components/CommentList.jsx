"use client";
import { useEffect, useState } from "react";
import { getComments, deleteComment } from "@/lib/localComments";
import { useSession } from "next-auth/react";

export default function CommentList({ slug }) {
  const [comments, setComments] = useState([]);
  const { data: session } = useSession();

  useEffect(() => {
    setComments(getComments(slug));
  }, [slug]);

  const handleDelete = (createdAt) => {
    deleteComment(slug, createdAt);
    setComments(getComments(slug));
  };

  if (comments.length === 0)
    return <p className="text-gray-400">No comments yet.</p>;

  return (
    <ul className="mt-4 space-y-3">
      {comments.map((c) => (
        <li
          key={c.createdAt}
          className="bg-gray-700 p-3 rounded flex justify-between"
        >
          <div>
            <p className="text-white">{c.text}</p>
            <div className="flex justify-between mt-1 text-xs text-gray-400">
              <span>{new Date(c.createdAt).toLocaleString()}</span>
              <span className="italic">— {c.user}</span>
            </div>
          </div>
          {session?.user?.email === c.email && (
            <button
              onClick={() => handleDelete(c.createdAt)}
              className="text-red-400 text-xs hover:underline self-start"
            >
              Delete
            </button>
          )}
        </li>
      ))}
    </ul>
  );
}
