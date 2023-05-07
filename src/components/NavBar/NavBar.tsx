import { IrateLogo } from "@/assets/icons";
import DevWarning from "@/components/NavBar/DevelopmentAlert";
import ClientSideNav from "@/components/NavBar/ClientSideNav";
import UserInfo from "@/components/NavBar/UserInfo";

export default function NavBar() {
  return (
    <>
      {/* @ts-expect-error */}
      <DevWarning />
      <div className="flex w-full items-center justify-center"></div>
      <nav className="from-zinc-1000 from-zinc-1000 absolute w-full bg-gradient-to-b from-zinc-900">
        <div className="mx-auto flex max-w-2xl justify-between px-4 py-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="flex items-center gap-8">
            <IrateLogo className="h-6" />
            <ClientSideNav />
          </div>
          <UserInfo />
        </div>
      </nav>
    </>
  );
}
