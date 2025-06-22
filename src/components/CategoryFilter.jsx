
"use client"

import { useSearchParams } from "next/navigation"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CategoryFilter(){

    const router=useRouter();
    const searchParams=useSearchParams();
    const [category,setCategory]=useState(searchParams.get('cat') || '')

    const handleSubmit=(event)=>{
        event.preventDefault();
        const params=new URLSearchParams(searchParams.toString())
        params.set('cat',category)
        router.push(`/posts?${params.toString()}`)
    }

  return <form onSubmit={handleSubmit} className="flex gap-3">
    <Input type="text"
    className="w-[300px] "
    value={category}
    onChange={e=>setCategory(e.target.value)}
    placeholder="fiter by category"
    />
    <Button type="submit">Filter</Button>
  </form>
}