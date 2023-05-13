"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

type NavigationItem = {
  label: string;
  href: string;
};

export const navigation: NavigationItem[] = [
  { label: "Home", href: "/" },
  { label: "Categories", href: "/categories" },
];

export function ClientSideDesktopNav() {
  const pathname = usePathname();
  return (
    <>
      {navigation.map((item) => (
        <Link
          href={item.href}
          key={item.label}
          prefetch={true}
          className={`${
            (pathname.startsWith(item.href) && item.href !== "/") ||
            pathname === item.href
              ? "bg-zinc-800/60"
              : "hover:bg-zinc-800/60"
          } rounded-lg p-2 text-sm font-light`}
        >
          {item.label}
        </Link>
      ))}
    </>
  );
}

export function ClientSideMobileNav() {
  return (
    <div className="sm:hidden">
      <Menu as="div" className="relative inline-block text-left">
        <Menu.Button className="inline-flex w-full justify-center rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
          Menu
          <ChevronDownIcon
            className="-mr-1 ml-2 h-5 w-5 text-violet-200 hover:text-violet-100"
            aria-hidden="true"
          />
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="border-lg absolute mt-2 flex flex-col overflow-hidden rounded-lg">
            {navigation.map((item) => (
              <Menu.Item key={item.label}>
                <Link
                  href={item.href}
                  prefetch={true}
                  className="bg-black bg-opacity-20 p-2 px-4 hover:bg-opacity-30"
                >
                  {item.label}
                </Link>
              </Menu.Item>
            ))}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
