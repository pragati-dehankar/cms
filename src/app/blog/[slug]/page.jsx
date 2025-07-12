import dateFormat from "@/utils/dateFormat";
import { Calendar } from "lucide-react";
import Image from "next/image";
import "../../../styles/blog.css";
import { notFound } from "next/navigation";
import Link from "next/link";
import dynamic from "next/dynamic";

const BookmarkButton = dynamic(() => import("@/components/BookmarkButton"), { ssr: false });
const CommentSection = dynamic(() => import("@/components/CommentSection"), { ssr: false });

const fetchSingleBlog = async (slug) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/get/${slug}`,
    { next: { tags: [slug] } },
    { cache: "no-store" }
  );
  if (res.status === 404) {
    notFound();
  }
  const data = await res.json();
  return data;
};

export async function generateMetaData({ params }) {
  const res = await fetchSingleBlog(params.slug);
  return {
    title: res.title,
    description: res.excerpt,
    openGraph: {
      images: [`${process.env.NEXT_PUBLIC_API_URL}/api/og?title=${res.title}`],
    },
  };
}

export default async function SingleBlog({ params }) {
  const { slug } = params;
  const post = await fetchSingleBlog(slug);

  return (
    <section>
      <div className="flex items-center flex-col gap-4 ">
        {post.thumbnail && (
          <Image
            className="rounded border w-[90%] md:w-[700px]"
            src={post.thumbnail}
            width={500}
            height={250}
            alt={post.title}
          />
        )}

        <h1 className="text-2xl sm:text-4xl font-bold">{post.title}</h1>
        {post && <BookmarkButton post={post} />}


        <div className="meta-of-a-blog space-y-2 ">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex gap-2 items-center ">
              <Calendar className="text-gray-400 size-4" />
              <p className="text-gray-400 text-xs">
                Created on: {dateFormat(post.createdAt)}
              </p>
            </div>
            <Link
              className="flex items-center gap-2"
              href={`/user/${post.authorId}`}
            >
              <Image
                className="rounded-full"
                src={post.author.image}
                width={20}
                height={20}
                alt={post.author.name}
              />
              <p className="text-xs text-gray-400">{post.author.name}</p>
            </Link>
          </div>

          <div className="text-xs flex items-center gap-2">
            <p>Category:</p>
            <p className="badge border border-gray-700 w-fit px-2 py-1 rounded bg-gray-600/30">
              {post.catSlug}
            </p>
          </div>
          


          {post?.keywords && (
            <div className="text-sm flex items-center gap-2">
              <p>Tags:</p>
              {post.keywords.split(",").map((tag, index) => (
                <p
                  key={`${tag}_${index}`}
                  className="badge border border-gray-700 w-fit px-[2px] py-[4px] text-sm rounded bg-gray-600/30"
                >
                  {tag}
                </p>
              ))}
            </div>
          )}
        </div>

        <div
          className="blogContent text-sm w-[90%] md:w-2/3 text-gray-300"
          dangerouslySetInnerHTML={{ __html: post.content || "" }}
        />

<CommentSection slug={post.slug} />
      </div>
    </section>
  );
}
