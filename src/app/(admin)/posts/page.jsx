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

  if (!session || !session.user) {
    return <UserAccessDenied />;
  }

  const adminCheck = await isAdmin(session);
  if (!adminCheck) {
    return (
      <UserAllPosts page={page} category={category} user={session.user} />
    );
  }

  return <AdminAllPosts page={page} category={category} />;
}
