import AdminAllUsers from "@/components/admin/all-users";
import { authOptions } from "@/lib/auth";
import isAdmin from "@/utils/isAdmin";
import { getServerSession } from "next-auth";
import UserAccessDenied from "@/components/UserAccessDenied";

export default async function AllUsers() {
  const session = await getServerSession(authOptions);

  // If not logged in
  if (!session || !session.user) {
    return <UserAccessDenied message="You are not authenticated!" />;
  }

  // If not admin
  const adminCheck = await isAdmin(session);
  if (!adminCheck) {
    return <UserAccessDenied message="You are not authorized to view this page." />;
  }

  // If admin
  return <AdminAllUsers />;
}
