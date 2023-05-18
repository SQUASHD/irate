import { createNespressoItem } from "@/app/(app)/categories/nespresso-capsules/_actions/actions";

export default async function AddNespressoPage() {
  return (
    <div className="flex min-h-full w-full flex-col items-center pb-16 pt-24">
      <div className="text-center leading-tight">
        <h2 className="text-base">
          Currently only supports vertuo capsule types
        </h2>
      </div>
      <form action={createNespressoItem}>
        <div className="space-y-12">
          <div className="border-b border-white/10 pb-12">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-2">
                <label
                  htmlFor="capsuleName"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Capsule Name
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-amber-500">
                    <input
                      type="text"
                      name="capsuleName"
                      id="capsuleName"
                      required={true}
                      minLength={5}
                      className="ml-1 flex-1 border-0 bg-transparent py-1.5 pl-1 text-white focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Double Espresso Scuro"
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

          <div className="border-b border-white/10 pb-12">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="cupSize"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Cup Size
                </label>
                <div className="mt-2">
                  <select
                    id="cupSize"
                    name="cupSize"
                    required={true}
                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-amber-500 sm:text-sm sm:leading-6 [&_*]:text-black"
                  >
                    <option>Espresso (40ml)</option>
                    <option>Double Espresso (80ml)</option>
                    <option>Gran Lungo (150ml)</option>
                    <option>Coffee (230ml)</option>
                  </select>
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="intensity"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Intensity
                </label>
                <div className="mt-2">
                  <input
                    id="intensity"
                    name="intensity"
                    type="number"
                    min="2"
                    max="12"
                    required={true}
                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-amber-500 sm:text-sm sm:leading-6 [&_*]:text-black"
                  ></input>
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="tagLine"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Tag line
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="tagLine"
                    id="tagLine"
                    required={true}
                    minLength={5}
                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-amber-500 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="aromaticNotes"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Aromatic notes
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="aromaticNotes"
                    id="aromaticNotes"
                    minLength={5}
                    required={true}
                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-amber-500 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="bitterness"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Bitterness
                </label>
                <div className="mt-2">
                  <select
                    id="bitterness"
                    name="bitterness"
                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-amber-500 sm:text-sm sm:leading-6 [&_*]:text-black"
                  >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </select>
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="acidity"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Acidity
                </label>
                <div className="mt-2">
                  <select
                    id="acidity"
                    name="acidity"
                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-amber-500 sm:text-sm sm:leading-6 [&_*]:text-black"
                  >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </select>
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="roast"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Roast level
                </label>
                <div className="mt-2">
                  <select
                    id="roast"
                    name="roast"
                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-amber-500 sm:text-sm sm:leading-6 [&_*]:text-black"
                  >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </select>
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="body"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Body
                </label>
                <div className="mt-2">
                  <select
                    id="body"
                    name="body"
                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-amber-500 sm:text-sm sm:leading-6 [&_*]:text-black"
                  >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </select>
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
