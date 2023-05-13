import "./globals.css";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import NavBar from "@/components/NavBar/NavBar";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className="h-full">
        <body className={`${inter.className} h-full bg-zinc-900 text-zinc-200`}>
          <NavBar />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
