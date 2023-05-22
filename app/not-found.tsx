import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <main className="grid h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="mt-4 text-xl font-light tracking-tight text-zinc-100">
            Page not found
          </p>
          <h1 className="mb-6 text-8xl font-bold tracking-tight text-zinc-200">
            404
          </h1>
          <p className="mt-6 text-base leading-7 text-zinc-400">
            Sorry, but the page you were looking for doesn&apos;t exist.
          </p>
          <div className="mt-10 flex items-center justify-center">
            <Link
              href="/"
              className="rounded-md bg-amber-400 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm transition ease-out hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
            >
              Back to home
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
