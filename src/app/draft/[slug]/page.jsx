"use client";
import Editor from "@/components/Editor";
import { toast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";

export default function EditPreviousDraft({ params }) {
  const { slug } = params;
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/v1/update/${slug}`);
        if (!res.ok) {
          const msg = res.status === 403
            ? "You are not allowed to edit this post."
            : "Unable to load the post.";
          toast({ title: "Uh oh!", description: msg });
          return;
        }
        const response = await res.json();
        setPost(response);
      } catch (err) {
        toast({ title: "Error", description: "Something went wrong." });
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [slug]);

  const savePost = async ({
    title,
    ogImage,
    content,
    excerpt,
    metaDescription,
    keywords,
    status,
  }) => {
    const res = await fetch(`http://localhost:3000/api/v1/update/${slug}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        slug,
        ogImage,
        content,
        excerpt,
        metaDescription,
        keywords,
        status,
      }),
    });

    if (!res.ok) {
      const error = await res.json();
      console.error("Post error:", error);
      toast({ title: "Update failed", description: error.message });
    } else {
      toast({ title: "Success", description: "Post updated!" });
      // optional: refresh the editor state
      window.location.reload(); // or refetch post
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (!post) return <p className="text-center">Post not found.</p>;

  return (
    <div className="p-8">
      <h1 className="font-bold text-2xl pb-3">Edit Post</h1>
      <Editor onSave={savePost} initialData={post} />
    </div>
  );
}
