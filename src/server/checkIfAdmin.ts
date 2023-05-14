"use server";

import { auth } from "@clerk/nextjs/server";
import { env } from "@/env.mjs";
import { notFound } from "next/navigation";

export default async function checkIfAdmin() {
  const { userId } = auth();

  if (userId !== env.CLERK_ADMIN_ID) {
    notFound();
  }
}
