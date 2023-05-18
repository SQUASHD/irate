import checkIfAdmin from "@/server/checkIfAdmin";
import { createCategory } from "@/app/_actions/category";

export default async function AddCategoryPage() {
  await checkIfAdmin();
  return (
    <div className="flex min-h-full w-full flex-col items-center pb-16 pt-24">
      <div className="text-center leading-tight">
        <h2 className="text-base">Create a new category!</h2>
      </div>
      <form action={createCategory}>
        <div className="space-y-12">
          <div className="border-b border-white/10 pb-12">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-2">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Category name
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-amber-500">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      required={true}
                      minLength={5}
                      maxLength={50}
                      className="ml-1 flex-1 border-0 bg-transparent py-1.5 pl-1 text-white focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="New category name"
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
                    maxLength={500}
                    minLength={10}
                    required={true}
                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-amber-500 sm:text-sm sm:leading-6"
                    placeholder={"Some descriptive text about the category"}
                  />
                </div>
              </div>
              <div className="col-span-full">
                <label
                  htmlFor="slug"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Slug{" "}
                  <span className="text-zinc-400">
                    – the URL to find items in the category
                  </span>
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="slug"
                    id="slug"
                    required={true}
                    minLength={5}
                    maxLength={25}
                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-amber-500 sm:text-sm sm:leading-6"
                    placeholder="new-category"
                  />
                </div>
              </div>
              <div className="col-span-full">
                <label
                  htmlFor="imageURL"
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
                    name="imageURL"
                    id="imageURL"
                    required={true}
                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-amber-500 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-white"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-amber-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-amber-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
