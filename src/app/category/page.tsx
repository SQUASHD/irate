import Link from "next/link";
import { prisma } from "@/lib/db";

async function getCategories() {
  return prisma.category.findMany();
}

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className="group"
            >
              <div className="aspect-h-1 aspect-w-1 xl:aspect-h-8 xl:aspect-w-7 w-full overflow-hidden rounded-lg bg-zinc-200">
                <img
                  src={category.image}
                  alt="Alt to come"
                  className="h-full w-full object-cover object-center group-hover:opacity-75"
                />
              </div>
              <h3 className="mt-4 text-sm">{category.name}</h3>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
