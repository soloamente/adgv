import { Suspense } from "react"

import { hasLocale, NextIntlClientProvider } from "next-intl"
import { setRequestLocale } from "next-intl/server"
import { notFound } from "next/navigation"

import { ReactLenis } from "lenis/react"

import Loader from "@/components/loader"

import { routing } from "../../../i18n/routing"

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

async function LocaleProvider({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  // Enable static rendering
  setRequestLocale(locale)

  return <NextIntlClientProvider locale={locale}>{children}</NextIntlClientProvider>
}

export default function LocaleLayout({ children, params }: Props) {
  return (
    <Suspense fallback={<Loader />}>
      <LocaleProvider params={params}>
        <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
          {children}
        </ReactLenis>
      </LocaleProvider>
    </Suspense>
  )
}
