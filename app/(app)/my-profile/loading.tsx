import { Skeleton } from "@/components/ui/skeleton";

export default async function Loading() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center justify-center px-4 pt-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="w-full">
          <h1 className="py-8 text-center text-4xl font-black tracking-tight lg:text-left">
            Recent Reviews
          </h1>
          <Skeleton className="flex h-48 w-full max-w-2xl flex-col" />
        </div>
        <div className="w-full">
          <h1 className="py-8 text-center text-4xl font-black tracking-tight lg:text-left">
            My Favourites
          </h1>
          <Skeleton className="flex h-48 w-full max-w-2xl flex-col" />
        </div>
      </div>
    </div>
  );
}
