"use client";

import GridCard from "@/components/GridCard";

export default function Loading() {
  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <h2 className="sr-only">Categories</h2>

      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        <GridCard type="loading" />
      </div>
    </div>
  );
}
