import {  getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request){
    const session =await getAuthSession();
    if(!session || !session.user || !session.user.id ){
        return NextResponse.json({message:'unauthorized'},{status:401})
    }
    console.log("Session in POST /api/posts:", session);

    const body = await request.json();
const {title,slug, ogImage,content, excerpt, metaDescription,category, keywords,status}=body;
console.log(body);

if(!title || !content || !slug || !category || !session.user.id){
return NextResponse.json({message:"missing fields"},{status:400})
}
const statusOfPost=status || "DRAFT";

try{
let categoryCheck=await prisma.category.findUnique({
    where:{ slug:category}
})
if(!categoryCheck){
    categoryCheck=await prisma.category.create({
        data:{
            title:category.charAt(0).toUpperCase()+category.slice(1),
            slug:category
        }
    })
}
const post=await prisma.post.create({
    data:{
        title,
        content,
        slug,
        thumbnail:ogImage || null,
        desc:metaDescription || null,
        keywords:keywords||null,
        excerpt:excerpt||null,
        authorId:session.user.id,
        catSlug:categoryCheck.slug,
        status:statusOfPost
    }
})
return NextResponse.json(post,{status:201});
}catch(error){
    console.error("Post creation failed:", error.message, error.stack);
    return NextResponse.json({ message: error.message }, { status: 500 });

}
}