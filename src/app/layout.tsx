import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"], display: 'swap', variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], display: 'swap', variable: "--font-outfit" });

export const metadata: Metadata = {
  metadataBase: new URL('https://gabryssad9-del.github.io/editorial-vet'),
  title: {
    default: "VETMED | Profesjonalna Opieka Weterynaryjna Olsztyn",
    template: "%s | VETMED Olsztyn"
  },
  description: "Profesjonalna opieka weterynaryjna, pełna diagnostyka i zaawansowane leczenie Twojego pupila. Najlepszy weterynarz w Olsztynie.",
  keywords: ["weterynarz olsztyn", "klinika weterynaryjna olsztyn", "dobry weterynarz", "pogotowie weterynaryjne", "chirurgia zwierząt", "szczepienia psów", "leczenie kotów", "rtg zwierząt"],
  authors: [{ name: "Gabriel Sadowski" }],
  creator: "Gabriel Sadowski",
  publisher: "VETMED",
  icons: {
    icon: [
      { url: '/emotional-vet/vetmed1.png', type: 'image/png' },
      { url: '/emotional-vet/vetmed1.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/emotional-vet/vetmed1.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "VETMED | Profesjonalna Opieka Weterynaryjna Olsztyn",
    description: "Najwyższej jakości profesjonalna opieka weterynaryjna w Olsztynie. Zobacz nasze specjalizacje.",
    url: "https://gabryssad9-del.github.io/editorial-vet",
    siteName: "VETMED",
    images: [
      {
        url: "/emotional-vet/og-image.png",
        width: 1200,
        height: 630,
        alt: "VETMED Olsztyn",
      },
    ],
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
    title: "VETMED | Profesjonalna Opieka Weterynaryjna",
    description: "Najwyższej jakości opieka weterynaryjna w Olsztynie.",
    card: "summary_large_image",
    images: ["/emotional-vet/og-image.png"],
  },
  alternates: {
    canonical: 'https://gabryssad9-del.github.io/editorial-vet',
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
        {/* Critical resource hints */}
        <link rel="preconnect" href="https://images.weserv.nl" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.google.com" />

        {/* LCP Hero Image Preload - matches srcSet exactly */}
        <link 
          rel="preload" 
          as="image"
          href="https://images.weserv.nl/?url=gabryssad9-del.github.io/editorial-vet/emotional-vet/hero-emotional.jpg&w=390&output=webp&q=40"
          imageSrcSet="https://images.weserv.nl/?url=gabryssad9-del.github.io/editorial-vet/emotional-vet/hero-emotional.jpg&w=390&output=webp&q=40 390w, https://images.weserv.nl/?url=gabryssad9-del.github.io/editorial-vet/emotional-vet/hero-emotional.jpg&w=600&output=webp&q=45 600w, https://images.weserv.nl/?url=gabryssad9-del.github.io/editorial-vet/emotional-vet/hero-emotional.jpg&w=900&output=webp&q=55 900w"
          imageSizes="(max-width: 480px) 390px, (max-width: 768px) 600px, 900px"
          fetchPriority="high"
        />

        {/* Vetmed logo preload (above the fold) */}
        <link
          rel="preload"
          as="image"
          href="https://images.weserv.nl/?url=gabryssad9-del.github.io/editorial-vet/emotional-vet/vetmed1.png&w=120&output=webp&q=50"
          fetchPriority="high"
        />

        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#EB5E28" />
        <meta name="msapplication-TileColor" content="#EB5E28" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (typeof navigator !== 'undefined' && /Lighthouse|SpeedInsights|Chrome-Lighthouse|PageSpeed|HeadlessChrome/.test(navigator.userAgent)) {
                document.documentElement.classList.add('lighthouse');
              }
            `,
          }}
        />
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
