import AdminAllPosts from "@/components/admin/admin-all-posts";
import UserAllPosts from "@/components/admin/user-all-posts";
import UserAccessDenied from "@/components/UserAccessDenied";
import { authOptions } from "@/lib/auth";
import isAdmin from "@/utils/isAdmin";
import { getServerSession } from "next-auth";

export default async function AllPosts({ searchParams }) {
  const page = searchParams.page || 1;
  const category = searchParams.cat || null;
  const session = await getServerSession(authOptions);

  // If not logged in → show login prompt
  if (!session || !session.user) {
    return <UserAccessDenied message="Please log in to view all posts." />;
  }

  // If admin → show admin view
  const adminCheck = await isAdmin(session);
  if (adminCheck) {
    return <AdminAllPosts page={page} category={category} />;
  }

  // Otherwise → show user view
  return <UserAllPosts page={page} category={category} user={session.user} />;
}
