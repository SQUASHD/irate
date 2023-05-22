import { prisma } from "@/lib/db";
import AddItemButton from "@/components/AddItem";
import { Metadata } from "next";
import { toTitleCase } from "@/utils/stringUtils";
import { auth } from "@clerk/nextjs";
import ClientGrid from "@/components/ClientGrid";
import FilterBar from "@/components/FilterBar";

export const revalidate = 3600; // revalidate every hour
export interface CategoryProps {
  params: {
    category: string;
  };
}

async function getCategoryItems(category: string, userId: string) {
  try {
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
  } catch (e) {
    console.error(e);
  }
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
  if (!items) throw new Error("No items found");

  return (
    <>
      <FilterBar />
      <h2 className="sr-only">Items</h2>
      <ClientGrid items={items} userId={userId}>
        <AddItemButton segmentSlug={`${category}`} text={`Add new item`} />
      </ClientGrid>
    </>
  );
}
