import { IrateLogo } from "@/assets/icons";

export const metadata = {
  title: "iRate",
  description:
    "Your one stop shop for rating Nespresso capsules. You're welcome, dad.",
};
export default function Home() {
  return (
    <main className="bg-zing-800 flex h-full w-screen flex-col items-center justify-center gap-2">
      <h1 className="sr-only">iRate</h1>
      <IrateLogo className="h-12" />
      <h2 className="">Coming Soon</h2>
    </main>
  );
}
