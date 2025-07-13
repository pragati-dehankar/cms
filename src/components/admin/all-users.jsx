import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";

async function fetchAllusers() {
  const res = await prisma.user.findMany();
  return res;
}

export default async function AdminAllUsers() {
  const users = await fetchAllusers();

  return (
    <section className="p-8 flex flex-col gap-4">
      {users.map((user, index) => (
        <Link
          key={index}
          href={`/user/${user.username}`}
          className="flex gap-3 p-3 bg-gray-500/10"
        >
          <Image
            className="size-20"
            src={user.image || "/default-avatar.png"}
            width={50}
            height={50}
            alt={user.name || "User"}
          />
          <div className="space-y-1">
            <h2 className="font-bold ">{user.name}</h2>
            <p className="text-gray-300">{user.email}</p>
            <p className="text-xs text-gray-300">{user.username}</p>
          </div>
        </Link>
      ))}
    </section>
  );
}
