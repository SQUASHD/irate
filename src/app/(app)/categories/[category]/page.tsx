import { prisma } from "@/lib/db";
import AddItemButton from "@/app/(app)/categories/[category]/AddItem";
import { Metadata } from "next";
import { toTitleCase } from "@/utils/formatString";
import { Image, Item } from "@prisma/client";
import { auth } from "@clerk/nextjs";
import { Filter } from "@/components/Filter";

export const revalidate = 3600; // revalidate every hour
interface Props {
  params: {
    category: string;
  };
}
function sanitizeItems(
  items: (Item & {
    ratings: { userId: string; rating: number }[];
    images: Image[];
  })[],
  userId: string
) {
  return items.map((item) => {
    return {
      ...item,
      ratings: item.ratings.filter((rating) => {
        return rating.userId === userId;
      }),
    };
  });
}

async function getCategoryItems({ params: { category } }: Props) {
  return prisma.item.findMany({
    where: {
      category: {
        slug: category,
      },
    },
    include: {
      images: true,
      ratings: {
        select: {
          rating: true,
          userId: true,
        },
      },
    },
  });
}
export async function generateMetadata({
  params: { category },
}: Props): Promise<Metadata> {
  const formattedString = toTitleCase(category.replace("-", " "));
  return { title: formattedString };
}

export default async function CategoryPage({ params: { category } }: Props) {
  const { userId } = auth();
  if (!userId) return null;

  const items = await getCategoryItems({ params: { category } });
  const sanitizedItems = sanitizeItems(items, userId);
  console.log(sanitizedItems);
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
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {/* @ts-expect-error */}
        <AddItemButton segmentSlug={`${category}`} />
        <Filter items={sanitizedItems} userId={userId} />
      </div>
    </>
  );
}
