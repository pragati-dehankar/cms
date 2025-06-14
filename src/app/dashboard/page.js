import { getAuthSession } from "@/lib/auth"
import { notFound } from "next/navigation";

export default async function Dashboard(){
    const session=await getAuthSession();
    if(!session){
        return <section className="flex justify-center items-center w-full h-screen">
        Not Authenticated.
      </section>
    }
    return <section className="flex justify-center items-center w-full h-screen">
      Welcome back! ,{session.user.name}
    </section>
}