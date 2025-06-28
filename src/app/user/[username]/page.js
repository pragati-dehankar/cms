import getSingleUser from "@/app/actions/getSingleUser";
import dateFormat from "@/utils/dateFormat";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function  SingleUser({params}){
    const {username}=params;
    const user=await getSingleUser(username);
    if(!user) notFound();
    
    return <>
    <UserProfile user={user}/>
    <UserPost posts={user.posts}/>
    </>
}

const UserProfile=({user})=>{
   return <div className="text-center flex  flex-col items-center">
<Image className="rounded-full border-2 border-[greenyellow]" src={user.image} width={80} height={80} alt={user.name}/>
<h1 className="text-xl font-bold ">{user.name}</h1>
<p className="text-gray-300"> @{user.username} </p>
<p className="text-gray-400 text-sm">Joined on :{dateFormat(user.createdAt)}</p>
   </div>
}
const UserPost=({posts=[]})=>{
    
return <div className="flex flex-col gap-4 w-10/12 mx-auto pt-10">
    <h3 className="text-xl font-bold ">User Posts</h3>
   {posts.length===0 ? 
 (  <p>No Posts found!</p>)
   :
   (
    posts.map((post,index)=>{
    return <Link
    className="flex items-center py-2 w-full mx-auto  gap-5 bg-zinc-800/40 rounded px-3 hover:bg-zinc-800/20 transition-all duration-200 hover:scale-[1.03]"
    href={`/blog/${post.slug}`}>
        <Image className="w-36 h-20" src={post.thumbnail} width={100} height={60}/>
        <div>
        <h3 className="text-gray-200 font-bold text-lg ">{post.title}</h3>
        <p className="text-gray-400 ">{post.excerpt.substring(0,30)}...</p>
        </div>

    </Link>
   })
)
   }
</div>
}