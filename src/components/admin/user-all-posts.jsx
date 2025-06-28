import getAllBlogs from "@/app/actions/getBlogs";
import EditableBlogCards from "./EditableBlogCards";
import Pagination from "../pagination";
import { config } from "@/static/config";
import CategoryFilter from "../CategoryFilter";
import {getUserBlogs} from "@/app/actions/getBlogs"

export default async function UserAllPosts({page=1,category,user}){

    const {posts,count}=await getUserBlogs({page,category,userId:user.id});

    return (
        <section className="p-8 flex flex-col gap-4">
            <h2>Manage All blogs</h2>
            <CategoryFilter/>
            {posts.map(post=>{
                return <EditableBlogCards post={post} key={post.id} />
            })}
            <Pagination 
            className="fixed bottom-10 left-1/2 -translate-x-1/2 "
            currPage={page}
            totalItems={count}
            perPage={config.perPage}
            />
        </section>
    )
}