"use client";
import { useSelectedLayoutSegments } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function BreadCrumb() {
  const segments = useSelectedLayoutSegments();

  const compoundedSegments = segments.map((segment, index) => {
    return decodeURI(segments.slice(0, index + 1).join("/"));
  });

  return (
    <nav className="mx-auto flex max-w-2xl items-center justify-between px-4 font-medium sm:px-6 lg:max-w-7xl lg:px-8">
      <ul className="flex flex-wrap items-center text-sm uppercase sm:text-base">
        {segments.length > 0 ? (
          <li>
            <Link
              href="/"
              className={cn(
                "group relative inline-block text-zinc-100 transition duration-300",
                "after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-full after:max-w-full after:bg-current after:opacity-0 after:transition-all hover:after:bottom-0 hover:after:opacity-100"
              )}
            >
              Home
            </Link>
          </li>
        ) : null}
        {segments.map((segment, index) => (
          <li
            key={index}
            className="text-zinc-200 before:mx-1 before:text-white before:content-['›']"
          >
            {index < segments.length - 1 ? (
              <Link
                href={`${compoundedSegments[index]}`}
                className={cn(
                  "group relative inline-block transition duration-300",
                  "after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-full after:max-w-full after:bg-current after:opacity-0 after:transition-all hover:after:bottom-0 hover:after:opacity-100"
                )}
              >
                {decodeURI(segment).replace("-", " ")}
              </Link>
            ) : (
              <span className="text-amber-400">
                {decodeURI(segment).replace("-", " ")}
              </span>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
