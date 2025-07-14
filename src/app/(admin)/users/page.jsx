import AdminAllUsers from "@/components/admin/all-users";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import UserAccessDenied from "@/components/UserAccessDenied";

export default async function AllUsers() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    // Show login prompt
    return <UserAccessDenied message="🔒 You must be logged in to access this page." />;
  }

  // No admin check needed
  return <AdminAllUsers />;
}
