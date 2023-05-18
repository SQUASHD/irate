"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function AddItemSkeleton() {
  return (
    <div className="flex min-h-full w-full flex-col items-center pb-16 pt-24">
      <div className="text-center leading-tight text-transparent">
        <h2 className="text-base">Add a new item</h2>
        <p className="text-sm font-light">
          Still in alpha 🐞 please be patient!
        </p>
      </div>
      <div className="space-y-12">
        <div className="pb-12">
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-2">
              <p className="block text-sm font-medium leading-6 text-transparent">
                Placeholder
              </p>
              <div className="mt-2">
                <Skeleton className="h-10 w-60" />
              </div>
            </div>

            <div className="sm:col-span-2">
              <p className="block text-sm font-medium leading-6 text-transparent">
                Placeholder
              </p>
              <div className="mt-2">
                <Skeleton className="h-10 w-60" />
              </div>
            </div>
            <div className="sm:col-span-2">
              <p className="block text-sm font-medium leading-6 text-transparent">
                Placeholder
              </p>
              <div className="mt-2">
                <Skeleton className="h-10 w-60" />
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="description"
                className="block text-sm font-medium leading-6 text-transparent"
              >
                Description
              </label>
              <div className="mt-2">
                <Skeleton className="block h-36 w-full" />
              </div>
            </div>
            <div className="col-span-full">
              <p className="block text-sm font-medium leading-6 text-transparent">
                Placeholder
              </p>
              <div className="mt-2">
                <Skeleton className="block h-10 w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
