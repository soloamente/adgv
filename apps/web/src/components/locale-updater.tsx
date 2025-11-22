"use client";

import { useEffect } from "react";
import { routing } from "../../i18n/routing";

function getFont(locale: string) {
  if (locale === "ja") {
    return "font-shippori-mincho";
  }
  return "font-foss";
}

function updateLocale() {
  if (typeof window === "undefined") return;

  // Extract locale from window.location.pathname (e.g., /en/... or /ja/...)
  const fullPathname = window.location.pathname;
  const localeMatch = fullPathname.match(/^\/([^\/]+)/);
  const locale =
    localeMatch &&
    routing.locales.includes(localeMatch[1] as (typeof routing.locales)[number])
      ? localeMatch[1]
      : routing.defaultLocale;

  // Update HTML lang attribute
  if (document.documentElement) {
    document.documentElement.lang = locale;
  }

  // Update body font class
  if (document.body) {
    const body = document.body;
    // Remove existing font classes
    body.classList.remove("font-shippori-mincho", "font-foss");
    // Add the correct font class
    body.classList.add(getFont(locale));
  }
}

export default function LocaleUpdater() {
  useEffect(() => {
    // Update on mount
    updateLocale();

    // Listen to popstate for browser back/forward
    const handlePopState = () => {
      setTimeout(updateLocale, 0);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  return null;
}

