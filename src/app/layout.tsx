import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "iRate",
  description:
    "Your one stop shop for rating Nespresso capsules. You're welcome, dad.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full bg-zinc-900 text-zinc-200`}>
        {children}
      </body>
    </html>
  );
}
