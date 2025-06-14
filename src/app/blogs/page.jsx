import Link from "next/link";
import Image from "next/image";

const blogConfig = [
  {
    title: "react vs next.js",
    excerpt: "next js is ultimate framewrok for react.......",
    image: "/thumbnails/rVn.jpeg",
    url: "/demo-slug",
  },
  {
    title: "Dreams to be remote dev",
    excerpt: "get the bestest frontend job.......",
    image: "/thumbnails/rVn.jpeg",
    url: "/demo-slug",
  },
  {
    title: "become mern stack dev",
    excerpt: "want to become a mern stack dev.......",
    image: "/thumbnails/rVn.jpeg",
    url: "/demo-slug",
  },
];

export default function Blogs() {
  return (
    // <Image src='/thumbnails/ai-v-human.webp' width={300} height={150}/>
    <section className="grid gap-4 grid-cols-2 md:grid-cols-3">
      {blogConfig.map((blog, index) => {
        return (
          <BlogCard
            title={blog.title}
            excerpt={blog.excerpt}
            image={blog.image}
            url={blog.url}
          />
        );
      })}
    </section>
  );
}

const BlogCard = ({ title, excerpt, image, url }) => {
  return (
    <div className="bg-gray-600/20 rounded-lg border flex flex-col p-1 gap-1 hover:scale-[1.02] transition-all delay-200 duration-300">
      <Image
        className="w-full rounded-md"
        src={image}
        width={300}
        height={150}
        alt={title}
      />
      <h2 className="text-xl font-bold text-gray-200 ">{title}</h2>
      <p className="text-sm text-gray-400">{excerpt}</p>
      <Link
        href={`/blog/${url}`}
        className="bg-zinc-600/70 px-3 rounded w-fit text-xs"
      >
        Read More
      </Link>
    </div>
  );
};
