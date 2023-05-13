import { auth } from "@clerk/nextjs/server";
import { env } from "@/env.mjs";
import { SVGProps } from "@/assets/icons";
import React from "react";
import Link from "next/link";

function PlusIcon(props: SVGProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      fill="currentColor"
      {...props}
    >
      <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" />
    </svg>
  );
}

interface AddItemButtonProps {
  segmentSlug: string;
}

export default async function AddItemButton({
  segmentSlug,
}: AddItemButtonProps) {
  const { userId } = auth();

  if (userId !== env.CLERK_ADMIN_ID) {
    return null;
  }
  return (
    <Link href={`/categories/${segmentSlug}/add`} className="group">
      <div className="group flex h-48 w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-zinc-200">
        <PlusIcon className="h-full p-8 text-zinc-400 group-hover:text-zinc-500" />
      </div>
      <h3 className="mt-4 text-sm">Add new item</h3>
    </Link>
  );
}
