"use client";
import { useState } from "react";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

export default function CommentSection({ slug }) {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="w-[90%] md:w-2/3 mt-10">
      <h2 className="text-xl font-semibold text-white mb-2">💬 Comments</h2>
      <CommentForm
        slug={slug}
        onCommentAdded={() => setRefreshKey((prev) => prev + 1)}
      />
      <CommentList slug={slug} key={refreshKey} />
    </div>
  );
}
