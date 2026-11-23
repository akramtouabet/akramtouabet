import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { TopBar } from "@/components/TopBar";
import { getDictionary } from "@/content/dictionaries";
import { site } from "@/content/site";
import type { Locale } from "@/i18n";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: getDictionary(lang as Locale).legal.title,
    alternates: { canonical: `/${lang}/legal`, languages: { fr: "/fr/legal", en: "/en/legal" } },
  };
}

export default async function LegalPage({ params }: Props) {
  const lang = (await params).lang as Locale;
  const t = getDictionary(lang);
  const l = t.legal;

  return (
    <>
      <TopBar lang={lang} t={t.nav} />
      <main id="top" className="plain">
        <div className="g sh mt">
          <h1 className="A mt">
            <span className="lb">{l.label}</span>
            {l.title}
          </h1>
        </div>
        <div className="g body">
          <dl>
            <dt>{l.publisher}</dt>
            <dd>{l.publisherText}</dd>
            {site.siret && (
              <>
                <dt>{l.siret}</dt>
                <dd>{site.siret}</dd>
              </>
            )}
            <dt>{l.contact}</dt>
            <dd>{site.email}</dd>
            <dt>{l.host}</dt>
            <dd>
              {site.host.name}, {site.host.address}
            </dd>
            <dt>{l.data}</dt>
            <dd>{l.dataText}</dd>
          </dl>
        </div>
        <Footer lang={lang} t={t.footer} />
      </main>
    </>
  );
}
