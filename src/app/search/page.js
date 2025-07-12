"use client";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [savedSearches, setSavedSearches] = useState([]);

  // Load saved searches from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("savedSearches") || "[]");
    setSavedSearches(stored);
  }, []);

  // Fetch posts from API
  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/v1/search?query=${encodeURIComponent(query)}`);
      if (!res.ok) {
        if (res.status === 404) {
          setError("No posts found for your search.");
          setResults([]);
          return;
        }
        setError("Something went wrong. Please try again.");
      } else {
        const foundPost = await res.json();
        setResults(foundPost);
        setError("");
      }
    } catch (error) {
      console.error("Search error:", error.message);
      setError("Search failed. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  // Debounce the search
  useEffect(() => {
    if (query) {
      const timer = setTimeout(() => fetchPosts(), 500);
      return () => clearTimeout(timer);
    }
  }, [query]);

  // Save search query to localStorage
  const saveSearch = () => {
    if (!query || savedSearches.includes(query)) return;
    const updated = [query, ...savedSearches];
    localStorage.setItem("savedSearches", JSON.stringify(updated));
    setSavedSearches(updated);
    toast({ title: "Search saved" });
  };

  // Reuse saved search
  const useSavedSearch = (q) => setQuery(q);

  // Delete saved search
  const deleteSearch = (q) => {
    const updated = savedSearches.filter((item) => item !== q);
    localStorage.setItem("savedSearches", JSON.stringify(updated));
    setSavedSearches(updated);
  };

  return (
    <section className="w-full min-h-screen flex flex-col gap-3 p-8">
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        type="text"
        placeholder="Search for a post"
      />

      <div className="flex gap-2 mt-2">
        <button
          className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
          onClick={saveSearch}
        >
          Save Search
        </button>
      </div>

      {savedSearches.length > 0 && (
        <div className="mt-4">
          <h3 className="text-gray-200 font-semibold mb-2">Saved Searches:</h3>
          <ul className="flex flex-wrap gap-2">
            {savedSearches.map((s, i) => (
              <li key={i} className="bg-gray-700 text-white px-3 py-1 rounded flex items-center gap-2">
                <button onClick={() => useSavedSearch(s)}>{s}</button>
                <span
                  onClick={() => deleteSearch(s)}
                  className="cursor-pointer text-red-400"
                >
                  ✕
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {loading && <p className="text-white mt-4">Loading...</p>}

      {query && (
        <ul className="flex flex-col gap-2 mt-4">
          {error ? (
            <div className="text-center text-white mt-10">
              <h2 className="text-2xl font-bold mb-2">🔍 No Results Found</h2>
              <p className="text-gray-400 mb-4">
                We couldn't find any blog posts matching "<span className="text-blue-400">{query}</span>"
              </p>
              <p className="text-sm text-gray-500">Try different keywords or check your spelling.</p>
              {/* Optional Image */}
              {/* <Image
                src="/no-results.png" // Add an image in your public folder
                alt="No results"
                width={200}
                height={200}
                className="mx-auto mb-4"
              /> */}
            </div>
          ) : (
            results.map((post) => (
              <li
                key={post.title}
                className="bg-gray-500/10 p-3 rounded hover:scale-[1.01] transition-all duration-200"
              >
                <Link href={`/blog/${post.slug}`}>
                  <h3 className="text-gray-100 text-lg font-bold">{post.title}</h3>
                  <p className="text-gray-300 text-sm">{post.excerpt?.substring(0, 30)}</p>
                  <div className="flex items-center gap-2 text-xs mt-3">
                    Written by:
                    {post.author?.image && (
                      <Image
                        src={post.author.image}
                        width={20}
                        height={20}
                        alt="Author"
                        className="rounded-full"
                      />
                    )}
                    <p className="text-gray-200">{post.author?.name}</p>
                  </div>
                </Link>
              </li>
            ))
          )}
        </ul>
      )}
    </section>
  );
}
