import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import { clerkClient } from "@clerk/nextjs";
import { getCategoryCount, getItemCount, getRatingCount } from "@/server/db";

const redis = Redis.fromEnv();
export async function GET() {
  try {
    const userCount = await clerkClient.users.getCount();
    const ratingCount = await getRatingCount();
    const itemCount = await getItemCount();
    const categoryCount = await getCategoryCount();

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
  } catch (e) {
    console.error(e);
    return new NextResponse(JSON.stringify(e), {
      status: 500,
    });
  }
}
