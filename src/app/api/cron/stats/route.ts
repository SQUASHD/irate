import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import https from "https";
import { clerkClient } from "@clerk/nextjs";
import { prisma } from "@/lib/db";

const redis = Redis.fromEnv({
  agent: new https.Agent({ keepAlive: true }),
});

export const config = {
  runtime: "edge",
};

export default async function handler(req: NextRequest) {
  const cron = req.nextUrl.pathname.split("/")[3];
  console.log(cron);
  if (!cron) return new Response("No cron provided", { status: 400 });
  const response = await updateStats();
  return new NextResponse(JSON.stringify(response), {
    status: 200,
  });
}

async function updateStats() {
  const userCount = await getUserCount();
  const ratingCount = await getRatingCount();
  const itemCount = await getItemCount();
  const categoryCount = await getCategoryCount();

  const stats = [
    { id: 1, name: "Registered users", value: userCount },
    { id: 2, name: "Ratings made", value: ratingCount },
    { id: 3, name: "Items ready to be rated", value: itemCount },
    { id: 4, name: "Categories and counting", value: categoryCount },
  ];

  await redis.set("stats", JSON.stringify(stats));

  return stats;
}

async function getUserCount() {
  return clerkClient.users.getCount();
}

async function getRatingCount() {
  return prisma.rating.count();
}

async function getItemCount() {
  return prisma.item.count();
}

async function getCategoryCount() {
  return prisma.category.count();
}
