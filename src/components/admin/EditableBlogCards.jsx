"use client";
import dateFormat from "@/utils/dateFormat";
import { Trash } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export default function EditableBlogCards({post}){
    const router=useRouter()
    const [currentStatus,setCurrentStatus]=useState(post.status);

    const handleDel=async(id)=>{
        const res=await fetch(`http://localhost:3000/api/v1/delete/${post.id}`,{
            method:"DELETE",
            headers:{
                'Content-Type':"application/json"
            },
        })
        if(res.ok){
            setCurrentStatus("DELETE");
            router.refresh();
        }
    }
    const handleConvertToDraft=async(id)=>{
      const res=await fetch(`http://localhost:3000/api/v1/state`,{
        method:'PATCH',
        headers:{
            'Content-Type':"application/json"
        },
        body:JSON.stringify({id,status:"DRAFT"})
      })
      if(res.ok){
        setCurrentStatus("DRAFT")
        router.refresh();
      }
    }
    const publishBlog=async(id)=>{
        const res=await fetch(`http://localhost:3000/api/v1/state`,{
            method:'PATCH',
            headers:{
                'Content-Type':"application/json"
            },
            body:JSON.stringify({id,status:"PUBLISHED"})
          })
          if(res.ok){
            setCurrentStatus("PUBLISHED")
            router.refresh();
          }
    }
    return <div className="flex ">
        <div className="bg-gray-600/20 p-3 gap-3 sm:justify-between rounded-lg w-full flex flex-col sm:flex-row md:flex-row">
        <div>
        <h2 className="font-bold text-lg"> {post.title}</h2>
        <p className="text-sm text-gray-300"> {post.excerpt.substring(0,15)}...</p>
        <span className="text-xs text-gray-400">{dateFormat(post.createdAt)}</span>
        </div>
        <div className="flex gap-2 items-center space-x-2">
          {currentStatus==="PUBLISHED" ? <Button onClick={()=>handleConvertToDraft(post.id)} variant="outline">convert to Draft</Button>:<Button onClick={()=>publishBlog(post.id)}>Publish</Button>}
          <Button onClick={()=>router.push(`/draft/${post.slug}`)} variant="outline">Edit</Button> 
       
          {currentStatus==="PUBLISHED" && <Button onClick={()=>router.push(`/blog/${post.slug}`)}>View</Button>}
          <Trash onClick={()=>handleDel(post.id)} className="size-5 text-gray-400" />
        </div>
        </div>
       </div>
}