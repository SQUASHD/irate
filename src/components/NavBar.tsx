"use client";
import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";
import { IrateLogo } from "@/assets/icons";
import { usePathname } from "next/navigation";

type NavigationItem = {
  label: string;
  href: string;
};

const navigation: NavigationItem[] = [
  { label: "Home", href: "/" },
  { label: "Categories", href: "/category" },
];

export default function NavBar() {
  const pathname = usePathname();
  const user = useUser();
  return (
    <nav className="from-zinc-1000 from-zinc-1000 w-full bg-gradient-to-b from-zinc-900">
      <div className="mx-auto flex max-w-2xl justify-between px-4 py-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="flex items-center gap-8">
          <IrateLogo className="h-6" />
          <div className="flex gap-4">
            {navigation.map((item) => (
              <Link
                href={item.href}
                key={item.label}
                className={`${
                  pathname === item.href
                    ? "bg-zinc-800/60"
                    : "hover:bg-zinc-800/60"
                } rounded-lg p-2 text-sm font-light`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm font-light">
          {user.user?.firstName && <span>Hei, {user.user?.firstName}</span>}
          <UserButton />
        </div>
      </div>
    </nav>
  );
}
