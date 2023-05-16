"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { StarIcon } from "@/assets/icons";
export default function ItemPageSkeleton() {
  return (
    <div className="mx-auto max-w-2xl px-4 pt-4 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
      {/* Product details */}
      <div className="lg:max-w-lg lg:self-end">
        <div className="mt-4">
          <div className="text-3xl font-bold tracking-tight sm:text-4xl">
            <Skeleton className="w-80 text-transparent">Capsule</Skeleton>
          </div>
        </div>

        <section aria-labelledby="information-heading" className="mt-4">
          <div className="flex items-center">
            <h2 className="sr-only">Reviews</h2>
            <div className="flex items-center">
              <div>
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className="h-5 w-5 flex-shrink-0 animate-pulse text-zinc-200/80"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
        </section>
      </div>

      <div className="mt-10 h-48 w-full lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
        <div className="h-full w-full rounded-lg">
          <Skeleton className="h-full w-full" />
        </div>
      </div>
    </div>
  );
}
