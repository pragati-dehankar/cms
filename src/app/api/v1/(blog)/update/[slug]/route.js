// /app/api/v1/update/[slug]/route.js
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import isAdmin from "@/utils/isAdmin";
import { getServerSession } from "next-auth/next";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const { slug } = params;
  const body = await request.json();
  const {
    title,
    ogImage,
    content,
    excerpt,
    metaDescription,
    category,
    keywords,
    status,
  } = body;

  const session = await getServerSession(authOptions);
  if (!session || !session.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const admin = await isAdmin(session);

  const existingPost = await prisma.post.findUnique({
    where: { slug },
    select: { authorId: true },
  });

  if (!existingPost) {
    return NextResponse.json({ message: "Post not found" }, { status: 404 });
  }

  const isAuthor = existingPost.authorId === session.user.id;
  if (!admin && !isAuthor) {
    return NextResponse.json({ message: "Not authorized" }, { status: 403 });
  }

  try {
    const updatedPost = await prisma.post.update({
      where: { slug },
      data: {
        title,
        content,
        thumbnail: ogImage || null,
        desc: metaDescription || null,
        keywords: keywords || null,
        excerpt: excerpt || null,
        status: status || "DRAFT",
      },
    });

    revalidateTag(slug);
    return NextResponse.json(updatedPost, { status: 200 });
  } catch (error) {
    console.error("Update failed:", error);
    return NextResponse.json(
      { message: "Failed to update post" },
      { status: 500 }
    );
  }
}

export async function GET(request, { params }) {
  const { slug } = params;
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const admin = await isAdmin(session);

  const post = await prisma.post.findUnique({ where: { slug } });

  if (!post) {
    return NextResponse.json({ message: "Post not found" }, { status: 404 });
  }

  const isAuthor = post.authorId === session.user.id;
  if (!admin && !isAuthor) {
    return NextResponse.json(
      { message: "You are not allowed to edit post" },
      { status: 403 }
    );
  }

  return NextResponse.json(post, { status: 200 });
}
