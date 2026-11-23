"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Dictionary } from "@/content/dictionaries";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
import { locales, type Locale } from "@/i18n";
import { Clock } from "./Clock";
import { useUi } from "./Providers";
import { Roll } from "./Roll";

/** Même page dans l'autre langue. */
function localizedPath(pathname: string, locale: Locale) {
  const rest = pathname.replace(/^\/(fr|en)(?=\/|$)/, "");
  return `/${locale}${rest}`;
}

export function TopBar({ lang, t }: { lang: Locale; t: Dictionary["nav"] }) {
  const pathname = usePathname();
  const { infoOpen, setInfoOpen } = useUi();
  const home = `/${lang}`;

  return (
    <header className="g top mt">
      <Link className="A brand" href={home}>
        {site.name}
      </Link>
      <nav className="B nav" aria-label="Navigation">
        <Link className="roll" href={`${home}#index`}>
          <Roll>{`${t.index} (${String(projects.length).padStart(2, "0")})`}</Roll>
        </Link>
        <button className="roll" type="button" aria-expanded={infoOpen} aria-controls="info" onClick={() => setInfoOpen(true)}>
          <Roll>{t.info}</Roll>
        </button>
        <Link className="roll" href={`${home}#contact`}>
          <Roll>{t.contact}</Roll>
        </Link>
        <span className="lang" role="group" aria-label={t.language}>
          {locales.map((locale, k) => (
            <span key={locale}>
              {k > 0 && <span className="dim">/ </span>}
              <Link href={localizedPath(pathname, locale)} hrefLang={locale} aria-current={locale === lang} scroll={false}>
                {locale.toUpperCase()}
              </Link>
            </span>
          ))}
        </span>
      </nav>
      <span className="C">
        <Clock />
      </span>
      <span className="D r">
        <span className="dot" aria-hidden="true" />
        {t.available}
      </span>
    </header>
  );
}
