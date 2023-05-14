import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import { clerkClient } from "@clerk/nextjs";
import { prisma } from "@/lib/db";

const redis = Redis.fromEnv();
export async function POST(req: NextRequest) {
  const userCount = await clerkClient.users.getCount();
  const ratingCount = await prisma.rating.count();
  const itemCount = await prisma.item.count();
  const categoryCount = await prisma.category.count();

  const stats = [
    { id: 1, name: "Registered users", value: userCount },
    { id: 2, name: "Ratings made", value: ratingCount },
    { id: 3, name: "Items ready to be rated", value: itemCount },
    { id: 4, name: "Categories and counting", value: categoryCount },
  ];
  const response = await redis.set("stats", JSON.stringify(stats));
  return new NextResponse(JSON.stringify(response), {
    status: 200,
  });
}
