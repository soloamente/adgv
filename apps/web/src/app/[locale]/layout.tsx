import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { routing } from "../../../i18n/routing";
import Loader from "@/components/loader";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

async function LocaleProvider({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  return (
    <NextIntlClientProvider locale={locale}>{children}</NextIntlClientProvider>
  );
}

export default function LocaleLayout({ children, params }: Props) {
  return (
    <Suspense fallback={<Loader />}>
      <LocaleProvider params={params}>{children}</LocaleProvider>
    </Suspense>
  );
}
