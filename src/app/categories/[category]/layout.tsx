import FilterBar from "@/components/FilterBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <FilterBar />
      {children}
    </div>
  );
}
