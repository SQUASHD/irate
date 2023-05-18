import Link from "next/link";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import AddItemButton from "@/app/categories/[category]/AddItem";

export const revalidate = 3600; // revalidate every hour

async function getCategories() {
  return prisma.category.findMany({
    include: {
      image: true,
    },
  });
}

export const metadata = {
  title: "Categories | iRate",
  description:
    "All the categories you would ever possibly want to rate when it comes to Nespresso vertuo coffee capsules",
};

export default async function CategoriesPage() {
  const categories = await getCategories();

  if (!categories) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <h2 className="sr-only">Categories</h2>

      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {/* @ts-expect-error */}
        <AddItemButton segmentSlug={""} />
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/categories/${category.slug}`}
            className="group"
            prefetch={true}
          >
            <div className="h-48 w-full overflow-hidden rounded-lg bg-zinc-200">
              <img
                src={category.image.href}
                alt={category.image.alt ?? "Bilde av kategori"}
                className="h-full w-full object-cover object-center group-hover:opacity-75"
              />
            </div>
            <h3 className="mt-4 text-sm">{category.name}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
}
