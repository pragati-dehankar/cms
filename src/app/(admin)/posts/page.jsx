import AdminAllPosts from "@/components/admin/admin-all-posts";
// import UserAccessDenied from "@/components/UserAccessDenied";
import UserAccessMessage from "@/components/UserAccessMessage";
import { authOptions } from "@/lib/auth";
import isAdmin from "@/utils/isAdmin";
import { getServerSession } from "next-auth";

export default async function AllPosts({ searchParams }) {
  const page = searchParams.page || 1;
  const category = searchParams.cat || null;
  const session = await getServerSession(authOptions);

  // If not logged in → show login prompt
  if (!session || !session.user) {
    return <UserAccessMessage message="Please log in to view all posts." />;
  }

  // If not admin → deny access
  const adminCheck = await isAdmin(session);
  if (!adminCheck) {
    return <UserAccessMessage message="This page is restricted to Admins only." />;
  }

  // If admin → show admin posts
  return <AdminAllPosts page={page} category={category} />;
}
