"use client";
import { UserButton, useUser } from "@clerk/nextjs";

export default function UserInfo() {
  const user = useUser();
  return (
    <div className="flex items-center gap-2 text-sm font-light">
      {user.user?.firstName && <span>Hei, {user.user?.firstName}</span>}
      <UserButton />
    </div>
  );
}
