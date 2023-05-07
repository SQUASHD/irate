"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavigationItem = {
  label: string;
  href: string;
};

const navigation: NavigationItem[] = [
  { label: "Home", href: "/" },
  { label: "Categories", href: "/category" },
];

export default function ClientSideNav() {
  const pathname = usePathname();
  return (
    <div className="flex gap-4">
      {navigation.map((item) => (
        <Link
          href={item.href}
          key={item.label}
          className={`${
            pathname === item.href ? "bg-zinc-800/60" : "hover:bg-zinc-800/60"
          } rounded-lg p-2 text-sm font-light`}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}
