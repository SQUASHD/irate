import { prisma } from "@/lib/db";
import AddItemButton from "@/app/(app)/categories/[category]/AddItem";
import { Metadata } from "next";
import { toTitleCase } from "@/utils/formatString";
import { auth } from "@clerk/nextjs";
import ClientGrid from "@/components/ClientGrid";

export const revalidate = 3600; // revalidate every hour
export interface CategoryProps {
  params: {
    category: string;
  };
}

async function getCategoryItems(category: string, userId: string) {
  return prisma.item.findMany({
    where: {
      category: {
        slug: category,
      },
    },
    include: {
      images: true,
      ratings: {
        where: {
          userId: userId,
        },
        select: {
          rating: true,
        },
      },
      favourites: {
        where: {
          userId: userId,
        },
        select: {
          favourited: true,
        },
      },
    },
  });
}
export async function generateMetadata({
  params: { category },
}: CategoryProps): Promise<Metadata> {
  const formattedString = toTitleCase(category.replace("-", " "));
  return { title: formattedString };
}

export default async function CategoryPage({
  params: { category },
}: CategoryProps) {
  const { userId } = auth();
  if (!userId) return null;

  const items = await getCategoryItems(category, userId);
  console.log(items);
  if (items.length < 1 || !items) {
    return (
      <>
        <div className="flex w-full flex-col items-center justify-center gap-8 py-24">
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-5xl font-black tracking-tight">Sorry</h1>
            <h2>No items found in that category</h2>
          </div>
          <p>
            A feature to allow you to add items to this category is coming soon!
          </p>
        </div>
        <h2 className="sr-only">Items</h2>
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {/* @ts-expect-error */}
          <AddItemButton segmentSlug={`${category}`} />
        </div>
      </>
    );
  }

  return (
    <>
      <h2 className="sr-only">Items</h2>
      <ClientGrid items={items} userId={userId}>
        {/* @ts-expect-error */}
        <AddItemButton segmentSlug={`${category}`} />
      </ClientGrid>
    </>
  );
}
