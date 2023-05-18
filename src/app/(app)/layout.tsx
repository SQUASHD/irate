import NavBar from "@/components/NavBar/NavBar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavBar />
      <main className="h-full pb-24 pt-32">{children}</main>
    </>
  );
}
