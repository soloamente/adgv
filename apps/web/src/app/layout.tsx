import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Shippori_Mincho } from "next/font/google";
import localFont from "next/font/local";
import { Suspense } from "react";
import "../index.css";
import Providers from "@/components/providers";
import Header from "@/components/header";
import LocaleUpdater from "@/components/locale-updater";
import { routing } from "../../i18n/routing";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const Foss = localFont({
  variable: "--font-foss",
  src: [
    {
      path: "../../public/fonts/FOSSSERIF-REGULAR.woff2",
      weight: "400",
    },
  ],
  display: "swap",
  preload: true,
});

const shipporiMincho = Shippori_Mincho({
  variable: "--font-shippori-mincho",
  weight: "600",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "adgv",
  description: "adgv",
};

function getFont(locale: string) {
  if (locale === "ja") {
    return "font-shippori-mincho";
  }

  return "font-foss";
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Use default locale to avoid blocking route error
  // LocaleUpdater component will update lang and font based on actual route
  const locale = routing.defaultLocale;

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${inter.variable} ${shipporiMincho.variable} ${
          Foss.variable
        }  ${getFont(locale)}`}
      >
        <Suspense fallback={null}>
          <LocaleUpdater />
        </Suspense>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
