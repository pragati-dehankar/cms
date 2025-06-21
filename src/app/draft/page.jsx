"use client";
import Editor from "@/components/Editor";

export default function Draft(){
    const savePost= async({title,slug, ogImage,content, excerpt, metaDescription,category, keywords,status})=>{
console.log(slug,'slug');
console.log(ogImage,'ogImage');
const res=await fetch('http://localhost:3000/api/v1/create',{
    method:"POST",
    headers:{
        'Content-Type':'application/json',
    },
    body:JSON.stringify({title,slug, ogImage,content, excerpt, metaDescription,category, keywords,status})
})
if(!res.ok){
    const error = await res.json();
    console.error("Post error:", error);
}
    }
    return <div className="p-8">
        <h1 className="font-bold text-2xl pb-3 ">Create a new Post</h1>
        <Editor onSave={savePost}/>
    </div>
}