"use client";
import { useEffect, useState } from "react";
import { getComments, deleteComment } from "@/lib/localComments";

export default function CommentList({ slug }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    setComments(getComments(slug));
  }, [slug]);

  const handleDelete = (index) => {
    deleteComment(slug, index);
    setComments(getComments(slug));
  };

  if (comments.length === 0)
    return <p className="text-gray-400">No comments yet.</p>;

  return (
    <ul className="mt-4 space-y-3">
      {comments.map((c, i) => (
        <li key={i} className="bg-gray-700 p-3 rounded flex justify-between">
          <div>
            <p className="text-white">{c.text}</p>
            <span className="text-xs text-gray-400">
              {new Date(c.createdAt).toLocaleString()}
            </span>
          </div>
          <button
            onClick={() => handleDelete(i)}
            className="text-red-400 text-xs hover:underline"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
