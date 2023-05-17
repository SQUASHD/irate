import { auth } from "@clerk/nextjs";
import { prisma } from "@/lib/db";
import Link from "next/link";
import StarReviews from "@/components/StarReviews";
import { ExternalLinkIcon } from "lucide-react";

export const revalidate = 10;
const getUserRatings = async (userId: string) => {
  return prisma.rating.findMany({
    where: {
      userId: userId,
    },
    include: {
      item: {
        select: {
          name: true,
          category: {
            select: {
              name: true,
              slug: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 10,
  });
};

const getUserFavourites = async (userId: string) => {
  return prisma.favourite.findMany({
    where: {
      userId: userId,
      favourited: true,
    },
    include: {
      item: {
        select: {
          name: true,
          category: {
            select: {
              name: true,
              slug: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 10,
  });
};

export default async function PersonalPage() {
  const { userId } = auth();
  const info = await getUserRatings(userId!);
  const favs = await getUserFavourites(userId!);
  console.log(favs);

  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center justify-center px-4 pt-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div>
          <h1 className="py-8 text-center text-4xl font-black tracking-tight lg:text-left">
            Recent Reviews
          </h1>
          <ul className="flex max-w-2xl flex-col gap-y-8">
            {info.map((item) => (
              <li key={item.id} className="flex items-center gap-8">
                <div className="items-left group relative flex max-w-lg flex-col gap-2 rounded-lg bg-black/20 p-4 hover:bg-black/40">
                  <div className="flex gap-1">
                    <StarReviews rating={item.rating} />
                  </div>
                  <div className="text-base font-semibold">
                    <Link
                      href={`/categories/${item.item.category.slug}/${encodeURI(
                        item.item.name
                      )}`}
                      className="absolute inset-0"
                    >
                      <span className="sr-only">{item.item.name}</span>
                    </Link>
                    <div className="flex items-center">
                      <span>{item.item.name}</span>{" "}
                      <ExternalLinkIcon className="inline h-4 group-hover:text-amber-400" />
                    </div>
                    <div className="text-sm font-thin">
                      {item.item.category.name}
                    </div>
                  </div>
                </div>
                <div className="max-w-sm">
                  <p className="relative font-thin italic before:absolute before:-left-6 before:text-4xl before:font-black before:text-amber-300 before:opacity-80 before:content-['“'] after:absolute after:text-4xl after:font-black after:text-amber-300 after:opacity-80 after:content-['“']">
                    {item.comment}
                  </p>
                  <p className="relative mt-1 text-xs font-semibold">
                    {item.createdAt.toLocaleDateString("no-NO")}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h1 className="py-8 text-center text-4xl font-black tracking-tight lg:text-left">
            My Favourites
          </h1>
          <ul className="flex max-w-2xl flex-col gap-y-8">
            {favs.map((fav) => (
              <li key={fav.id} className="flex items-center gap-8">
                <div className="items-left group relative flex max-w-lg flex-col gap-2 rounded-lg bg-black/20 p-4 hover:bg-black/40">
                  <div className="text-base font-semibold">
                    <Link
                      href={`/categories/${fav.item.category.slug}/${encodeURI(
                        fav.item.name
                      )}`}
                      className="absolute inset-0"
                    >
                      <span className="sr-only">{fav.item.name}</span>
                    </Link>
                    <div className="flex items-center">
                      <span>{fav.item.name}</span>{" "}
                      <ExternalLinkIcon className="inline h-4 group-hover:text-amber-400" />
                    </div>
                    <div className="text-sm font-thin">
                      {fav.item.category.name}
                    </div>
                  </div>
                </div>
                <div className="max-w-sm">
                  <p className="relative mt-1 text-xs font-semibold">
                    {fav.createdAt.toLocaleDateString("no-NO")}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
