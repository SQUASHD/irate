import { notFound } from "next/navigation";
import { create } from "../../../_actions/item";
import { prisma } from "@/lib/db";
import { CancelButton } from "@/components/ui/ClientSideButtons";

type AddItemParams = {
  params: {
    category: string;
  };
};

const getCategoryName = async (slug: string) => {
  return prisma.category.findFirst({
    where: {
      slug: slug,
    },
    select: {
      name: true,
      slug: true,
    },
  });
};

export default async function AddItemPage({ params }: AddItemParams) {
  const category = await getCategoryName(params.category);
  if (!category) notFound();

  return (
    <div className="flex min-h-full w-full flex-col items-center pb-16 pt-24">
      <div className="text-center leading-tight">
        <h2 className="text-base">Add a new item</h2>
        <p className="text-sm font-light">
          Still in alpha 🐞 please be patient!
        </p>
      </div>
      <form action={create}>
        <div className="space-y-12">
          <div className="border-b border-white/10 pb-12">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-2">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Item Name
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-amber-500">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      required={true}
                      minLength={5}
                      className="ml-1 flex-1 border-0 bg-transparent py-1.5 pl-1 text-white focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="My favourite thing"
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="categoryName"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Category
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-amber-500">
                    <input
                      type="text"
                      name="categoryName"
                      id="categoryName"
                      disabled={true}
                      defaultValue={category.name}
                      required={true}
                      minLength={5}
                      className="ml-1 flex-1 border-0 bg-transparent py-1.5 pl-1 text-white focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="My favourite thing"
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Description
                </label>
                <div className="mt-2">
                  <textarea
                    id="description"
                    name="description"
                    rows={3}
                    required={true}
                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-amber-500 sm:text-sm sm:leading-6"
                    defaultValue={""}
                  />
                </div>
              </div>
              <div className="col-span-full">
                <label
                  htmlFor="imageHref"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Image URL{" "}
                  <span className="text-zinc-400">
                    – preferably transparent background
                  </span>
                </label>
                <div className="mt-2">
                  <input
                    type="url"
                    name="imageHref"
                    id="imageHref"
                    required={true}
                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-amber-500 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <CancelButton />
          <button
            type="submit"
            className="rounded-md bg-amber-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-amber-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
          >
            Save
          </button>
        </div>
        <input type="hidden" name="categorySlug" value={category.slug} />
      </form>
    </div>
  );
}
