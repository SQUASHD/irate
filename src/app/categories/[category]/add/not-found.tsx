import Link from "next/link";

export default function CategoryNotFound() {
  return (
    <div className="flex min-h-full w-full flex-col items-center pb-16 pt-24">
      <div className="text-center leading-tight">
        <h2 className="text-lg">Category doesn&apos;t exist</h2>
        <p className="mt-2 text-base font-light">
          You&apos;re attempting to add an item to a category that doesn&apos;t
          exist.
        </p>
        <p className="mt-2 text-base font-light">
          Please check the URL and try again.
        </p>
        <p className="mt-2 text-base font-light">
          Alternatively, you can{" "}
          <Link
            href={"/categories/add"}
            className="group relative inline-block text-amber-400"
          >
            create a new category.
            <span className="relative bottom-1 block h-[1px] max-w-0 bg-current transition-all duration-500 group-hover:max-w-full"></span>
          </Link>
        </p>
      </div>
    </div>
  );
}
