import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "VetCare | Profesjonalna Klinika Weterynaryjna",
  description: "Zadbamy o zdrowie i szczęście Twojego pupila. Nowoczesna diagnostyka i troskliwy zespół lekarzy.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body className={`${inter.variable} ${outfit.variable} antialiased`}>
        <div className="paw-pattern min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
