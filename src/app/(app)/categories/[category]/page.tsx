import Link from "next/link";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import AddItemButton from "@/app/(app)/categories/[category]/AddItem";
import { Metadata } from "next";
import { toTitleCase } from "@/utils/formatString";
import FilterBar from "@/components/FilterBar";
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
  console.log(userId);

  const items = await getCategoryItems({ params: { category } });
  const sanitizedItems = sanitizeItems(items, userId);
  if (items.length < 1 || !items) {
    notFound();
  }

  return (
    <>
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <FilterBar />
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {/* @ts-expect-error */}
          <AddItemButton segmentSlug={`${category}`} />
          <Filter items={sanitizedItems} userId={userId} />
        </div>
      </div>
    </>
  );
}
