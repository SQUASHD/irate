"use client";
import { UserButton, useUser } from "@clerk/nextjs";
import { ClientSideMobileNav } from "./ClientSideNav";

export default function UserInfo() {
  const user = useUser();
  return (
    <div className="flex items-center gap-2 text-sm font-light">
      <ClientSideMobileNav />
      {user.user?.firstName && (
        <span className="hidden sm:block">Hei, {user.user?.firstName}</span>
      )}
      <UserButton />
    </div>
  );
}
