"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export default function SearchBar({ className }: { className?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()!;

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const handleSearch = (searchQuery: string) => {
    router.push(pathname + "?" + createQueryString("search", searchQuery));
  };

  return (
    <input
      type="text"
      className={`flex-1 rounded-md border-0 bg-transparent bg-white/5 py-1.5 text-white ring-1 ring-inset ring-white/10 placeholder:text-white/50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500 focus:ring-0 sm:text-sm sm:leading-6 ${className}`}
      onChange={(e) => handleSearch(e.target.value)}
      placeholder="Search..."
    />
  );
}
