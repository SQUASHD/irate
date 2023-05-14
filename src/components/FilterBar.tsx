"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon, FunnelIcon } from "@heroicons/react/20/solid";
import SearchBar from "@/components/SearchBar";

const filters = {
  rated: [
    { value: "", label: "All", checked: false },
    { value: "true", label: "Rated", checked: false },
    { value: "false", label: "Unrated", checked: false },
  ],
};
export default function FilterBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()!;

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-2 py-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
      <SearchBar className="lg:col-span-2 xl:col-span-3" />
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className="flex w-full justify-between rounded-lg bg-black/20 px-4 py-2 text-left text-sm font-medium hover:bg-black/30 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
              <div className="flex items-center gap-1">
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
                <span>Filters</span>
              </div>
              <ChevronUpIcon
                className={`${
                  open ? "rotate-180 transform" : "rotate-0 transform"
                } h-5 w-5`}
              />
            </Disclosure.Button>
            <Disclosure.Panel
              unmount={false}
              className="col-span-full px-4 pb-2 pt-4 text-sm"
            >
              <fieldset>
                <legend className="block font-medium">Rating Status</legend>
                <div className="space-y-4 pt-4">
                  {filters.rated.map((option, optionIdx) => (
                    <div
                      key={option.value}
                      className="flex items-center text-base sm:text-sm"
                    >
                      <input
                        id={`rated-${optionIdx}`}
                        name="rated[]"
                        defaultValue={option.value}
                        type="radio"
                        className="h-4 w-4 flex-shrink-0 rounded border-gray-300 focus:ring-amber-500"
                        defaultChecked={option.checked}
                        checked={option.value === searchParams.get("rated")}
                        onChange={() => {
                          router.push(
                            `${pathname}?${createQueryString(
                              "rated",
                              option.value
                            )}`
                          );
                        }}
                      />
                      <label
                        htmlFor={`rated-${optionIdx}`}
                        className="ml-3 min-w-0 flex-1"
                      >
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              </fieldset>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
}
