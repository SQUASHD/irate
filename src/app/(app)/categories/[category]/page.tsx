import Link from "next/link";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import AddItemButton from "@/app/(app)/categories/[category]/AddItem";

export const revalidate = 3600; // revalidate every hour
interface Props {
  params: {
    category: string;
  };
}

export default async function CategoryPage({ params: { category } }: Props) {
  const items = await prisma.item.findMany({
    where: {
      category: {
        slug: category,
      },
    },
    include: {
      images: true,
    },
  });

  if (items.length < 1 || !items) {
    notFound();
  }
  return (
    <>
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {/* @ts-expect-error */}
          <AddItemButton segmentSlug={`${category}`} />
          {items.map((item) => (
            <Link
              key={item.id}
              href={`/categories/${category}/${encodeURI(item.name)}`}
              className="group"
              prefetch={true}
            >
              <div className="h-48 w-full overflow-hidden rounded-lg bg-zinc-200">
                <img
                  src={
                    item.images[0]?.href ?? "https://via.placeholder.com/300"
                  }
                  alt={"Alt"}
                  className="h-full w-full object-cover object-center group-hover:opacity-75"
                />
              </div>
              <h3 className="mt-4 text-sm">{item.name}</h3>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
