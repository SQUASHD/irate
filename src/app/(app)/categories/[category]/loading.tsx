"use client";

import GridCard from "@/components/GridCard";
import FilterBar from "@/components/FilterBar";

export default function LoadingPage() {
  return (
    <>
      <FilterBar />
      <h2 className="sr-only">Categories</h2>

      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        <GridCard type="loading" />
      </div>
    </>
  );
}
