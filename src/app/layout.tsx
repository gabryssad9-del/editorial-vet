import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "Domowy Weterynarz | Ciepło, Emocje, Opieka",
  description: "Zapewniamy najwyższą jakość opieki dla Twojego pupila w domowej, ciepłej atmosferze.",
};

import SmoothScroll from "@/components/SmoothScroll";
import { GlobalLoadingScreen } from "@/components/GlobalLoadingScreen";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body className={`${inter.variable} ${outfit.variable} antialiased selection:bg-accent selection:text-white relative`}>
        <GlobalLoadingScreen />
        <SmoothScroll>
          <div className="fixed inset-0 bg-background -z-20" />
          <div className="fixed inset-0 opacity-10 paw-pattern-bg -z-10" />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
