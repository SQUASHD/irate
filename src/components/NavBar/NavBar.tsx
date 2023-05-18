import { IrateLogo } from "@/assets/icons";
import UserInfo from "@/components/NavBar/UserInfo";
import { ClientSideDesktopNav } from "@/components/NavBar/ClientSideNav";
import BreadCrumb from "@/components/NavBar/BreadCrumb";
import Link from "next/link";

export default function NavBar() {
  return (
    <header className="absolute w-full">
      <nav className="w-full bg-gradient-to-b from-zinc-900">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="flex items-center gap-8">
            <Link href={"/"}>
              <IrateLogo className="h-6" />
              <span className="sr-only">Home</span>
            </Link>
            <div className="hidden gap-2 sm:flex">
              <ClientSideDesktopNav />
            </div>
          </div>
          <UserInfo />
        </div>
      </nav>
      <BreadCrumb />
    </header>
  );
}
