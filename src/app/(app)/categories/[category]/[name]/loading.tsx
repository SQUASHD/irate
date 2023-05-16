"use client";

import GridCard from "@/components/GridCard";

export default function LoadingPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 pt-16 sm:px-6 sm:pt-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
      <GridCard type="loading" />
    </div>
  );
}
