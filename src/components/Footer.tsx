import Link from "next/link";
import type { Dictionary } from "@/content/dictionaries";
import { site } from "@/content/site";
import type { Locale } from "@/i18n";
import { Roll } from "./Roll";

export function Footer({ lang, t }: { lang: Locale; t: Dictionary["footer"] }) {
  return (
    <footer className="g sh foot mt">
      <span className="A">
        © {new Date().getFullYear()} {site.name}
      </span>
      <span className="B">
        <Link className="roll dim" href={`/${lang}/legal`}>
          <Roll>{t.legal}</Roll>
        </Link>
      </span>
      <span className="C">{t.made}</span>
      <a className="D r end roll" href="#top">
        <Roll>{t.top}</Roll>
      </a>
    </footer>
  );
}
