import AdminAllUsers from "@/components/admin/all-users";
import { authOptions } from "@/lib/auth";
import isAdmin from "@/utils/isAdmin";
import { getServerSession } from "next-auth";
import UserAccessDenied from "@/components/UserAccessDenied";

export default async function AllUsers() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    // Show login prompt
    return <UserAccessDenied message="🔒 You must be logged in to access this page." />;
  }

  const adminCheck = await isAdmin(session);

  if (!adminCheck) {
    // Show permission error
    return <UserAccessDenied message="🚫 This section is for admins only." />;
  }

  return <AdminAllUsers />;
}
