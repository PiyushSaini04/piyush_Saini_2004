import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/providers/LenisProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

import { PageTransitionProvider } from "@/components/transitions/TransitionContext";

export const metadata: Metadata = {
  title: "Piyush Saini | Portfolio",
  description: "Personal portfolio of Piyush Saini",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geist.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-black text-gray-400 font-sans">
        <PageTransitionProvider>
          <LenisProvider>
            {children}
          </LenisProvider>
        </PageTransitionProvider>
      </body>
    </html>
  );
}
