import NavBar from "@/components/NavBar/NavBar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavBar />
      <main className="h-full py-24">{children}</main>
    </>
  );
}
