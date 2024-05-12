import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NextTopLoader from "nextjs-toploader"
import { Providers } from "./provider";
import { Header } from "./header";
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PeerPedia",
  description: "Open peer-to-peer knowledge sharing platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body className={inter.className}>

          <Providers>
            <NextTopLoader/>
            <Header />
            {children}
          </Providers>

    <Toaster />
        </body>
      </html>
    </>
  );
}
