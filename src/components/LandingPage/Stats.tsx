import { clerkClient } from "@clerk/nextjs";
import { prisma } from "@/lib/db";

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

async function getStats() {
  const userCount = await getUserCount();
  const ratingCount = await getRatingCount();
  const itemCount = await getItemCount();
  const categoryCount = await getCategoryCount();
  return [
    { id: 1, name: "Registered users", value: userCount },
    { id: 2, name: "Ratings made", value: ratingCount },
    { id: 3, name: "Items ready for rating", value: itemCount },
    { id: 4, name: "Categories to rate", value: categoryCount },
  ];
}
export default async function Stats() {
  const stats = await getStats();
  return (
    <div className="py-8">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="mx-auto flex max-w-xs flex-col gap-y-4"
            >
              <dt className="text-base leading-7 text-zinc-400">{stat.name}</dt>
              <dd className="order-first text-3xl font-semibold tracking-tight text-zinc-100 sm:text-5xl">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
