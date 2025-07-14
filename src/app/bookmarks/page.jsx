import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import UserAccessDenied from "@/components/UserAccessDenied";
import BookmarksList from "@/components/BookmarksList";

export default async function BookmarksPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return <UserAccessDenied message="Please sign in to view your bookmarks." />;
  }

  return (
    <section>
      <BookmarksList />
    </section>
  );
}
