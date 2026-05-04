import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"], display: 'swap', variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], display: 'swap', variable: "--font-outfit" });

export const metadata: Metadata = {
  metadataBase: new URL('https://vetmed-olsztyn.pl'), // Zakładana domena produkcyjna
  title: {
    default: "VETMED | Nowoczesna Klinika Weterynaryjna Olsztyn",
    template: "%s | VETMED Olsztyn"
  },
  description: "Całodobowa opieka, pełna diagnostyka i bezstresowe leczenie Twojego pupila. Najlepszy weterynarz w Olsztynie. Sprawdź nasze opinie i umów wizytę.",
  keywords: ["weterynarz olsztyn", "klinika weterynaryjna olsztyn", "dobry weterynarz", "pogotowie weterynaryjne", "chirurgia zwierząt", "szczepienia psów", "leczenie kotów", "rtg zwierząt"],
  authors: [{ name: "Gabriel Sadowski" }],
  creator: "Gabriel Sadowski",
  publisher: "VETMED",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "VETMED | Nowoczesna Klinika Weterynaryjna Olsztyn",
    description: "Całodobowa opieka, pełna diagnostyka i bezstresowe leczenie Twojego pupila. Zobacz, dlaczego ufają nam tysiące pacjentów.",
    url: "https://vetmed-olsztyn.pl",
    siteName: "VETMED",
    locale: "pl_PL",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: "VETMED | Nowoczesna Klinika Weterynaryjna",
    card: "summary_large_image",
  },
  alternates: {
    canonical: 'https://vetmed-olsztyn.pl',
  },
};

import SmoothScroll from "@/components/SmoothScroll";
import { MotionProvider } from "@/components/MotionProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "VeterinaryCare",
    "name": "VETMED",
    "image": "https://vetmed-olsztyn.pl/editorial-vet/emotional-vet/vetmed1.png",
    "@id": "https://vetmed-olsztyn.pl",
    "url": "https://vetmed-olsztyn.pl",
    "telephone": "+48519619141",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "ul. Pana Tadeusza 6",
      "addressLocality": "Olsztyn",
      "postalCode": "10-001",
      "addressCountry": "PL"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "08:00",
      "closes": "18:00"
    }
  };

  return (
    <html lang="pl">
      <head>
        <link rel="preconnect" href="https://images.weserv.nl" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://images.weserv.nl" />
        
        {/* Simple Preload for LCP Image - most common mobile/desktop size */}
        <link 
          rel="preload" 
          href="https://images.weserv.nl/?url=gabryssad9-del.github.io/editorial-vet/emotional-vet/hero-emotional.jpg&w=1000&output=webp&q=80" 
          as="image" 
          fetchPriority="high"
        />

        <link 
          rel="preload" 
          as="image" 
          href="https://images.weserv.nl/?url=gabryssad9-del.github.io/editorial-vet/emotional-vet/hero-emotional.jpg&w=450&output=webp&q=50"
          imageSrcSet="https://images.weserv.nl/?url=gabryssad9-del.github.io/editorial-vet/emotional-vet/hero-emotional.jpg&w=450&output=webp&q=50 450w"
          imageSizes="(max-width: 640px) 450px"
          fetchPriority="high"
        />

        <link rel="preconnect" href="https://images.weserv.nl" />
        <link rel="dns-prefetch" href="https://images.weserv.nl" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#FE4520" />
      </head>
      <body className={`${inter.variable} ${outfit.variable} antialiased selection:bg-accent selection:text-white relative`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <MotionProvider>
          <SmoothScroll>
            <div className="fixed inset-0 bg-background -z-20" />
            <div className="fixed inset-0 opacity-10 paw-pattern-bg -z-10" />
            {children}
          </SmoothScroll>
        </MotionProvider>
      </body>
    </html>
  );
}
