import type { Metadata } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Kiro Luxury Furniture - Custom Woodworking Excellence",
    template: "%s | Kiro Luxury Furniture"
  },
  description: "Discover exquisite custom luxury furniture crafted with passion and precision. From traditional to modern designs, each piece tells a unique story.",
  keywords: ["luxury furniture", "custom woodworking", "bespoke furniture", "Moroccan craftsmanship", "handmade furniture"],
  authors: [{ name: "Kiro Luxury Furniture" }],
  creator: "Kiro Luxury Furniture",
  publisher: "Kiro Luxury Furniture",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://kiro-luxury.com"),
  alternates: {
    canonical: "/",
    languages: {
      "en": "/en",
      "ar": "/ar",
      "fr": "/fr",
      "dz": "/dz",
    },
  },
  openGraph: {
    title: "Kiro Luxury Furniture - Custom Woodworking Excellence",
    description: "Discover exquisite custom luxury furniture crafted with passion and precision.",
    url: "https://kiro-luxury.com",
    siteName: "Kiro Luxury Furniture",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Kiro Luxury Furniture",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kiro Luxury Furniture",
    description: "Custom luxury furniture crafted with passion and precision.",
    images: ["/twitter-image.jpg"],
  },
};

export default async function RootLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
