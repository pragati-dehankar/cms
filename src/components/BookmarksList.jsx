"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function BookmarksList() {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("bookmarks") || "[]");
    setBookmarks(saved);
  }, []);

  return (
    <div className="flex flex-col gap-4 w-10/12 mx-auto pt-10">
      <h3 className="text-xl font-bold">Bookmarked Posts</h3>
      {bookmarks.length === 0 ? (
        <p>No Bookmarked Posts!</p>
      ) : (
        bookmarks.map((post, index) => (
          post.slug && post.title && (
            <Link
              key={index}
              className="flex items-center py-2 w-full mx-auto gap-5 bg-zinc-800/40 rounded px-3 hover:bg-zinc-800/20 transition-all duration-200 hover:scale-[1.03]"
              href={`/blog/${post.slug}`}
            >
              {post.thumbnail && (
                <Image
                  className="w-36 h-20 object-cover rounded"
                  src={post.thumbnail}
                  width={100}
                  height={60}
                  alt={post.title}
                />
              )}
              <div>
                <h3 className="text-gray-200 font-bold text-lg">{post.title}</h3>
                <p className="text-gray-400">{post.excerpt?.substring(0, 30)}...</p>
              </div>
            </Link>
          )
        ))
      )}
    </div>
  );
}
