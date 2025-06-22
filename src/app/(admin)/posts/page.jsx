import AdminAllPosts from "@/components/admin/admin-all-posts";
import { authOptions } from "@/lib/auth"
import isAdmin from "@/utils/isAdmin";
import { getServerSession } from "next-auth"

export default async function AllPosts({searchParams}){
    const page =searchParams.page || 1;
    const category=searchParams.cat || null;
    const session=getServerSession(authOptions);

    const  adminCheck=isAdmin(session);
    if(!adminCheck){
        return <div> Not accessible</div>
    }

   return  <div>
        <AdminAllPosts page={page} category={category} />
    </div>
}