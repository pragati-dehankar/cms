// /app/api/v1/get/[slug]/route.js
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const post = await prisma.post.findUnique({
      where: {
        slug: params.slug,
        status: "PUBLISHED",
      },
      include: {
        author: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    });

    if (!post) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    return NextResponse.json(post); // ✅ no need to stringify or manually set headers
  } catch (error) {
    console.error("Fetch blog error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
