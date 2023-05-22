"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <html className="h-full">
      <body className="h-full">
        <div className="mx-auto h-full max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="flex h-full flex-col items-center justify-center">
            <h2 className="text-center text-xl font-thin">
              Something went wrong
            </h2>
            <h3 className="text-center text-4xl font-black">Oops!</h3>
            <p className="py-4">Error: {error.message}</p>
            <button
              onClick={() => reset()}
              className="rounded-md bg-amber-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-amber-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
