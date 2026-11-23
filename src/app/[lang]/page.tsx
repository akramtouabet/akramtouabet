import { ContactBlock } from "@/components/ContactBlock";
import { FitText } from "@/components/FitText";
import { Footer } from "@/components/Footer";
import { Loader } from "@/components/Loader";
import { ProjectIndex } from "@/components/ProjectIndex";
import { TopBar } from "@/components/TopBar";
import { getDictionary } from "@/content/dictionaries";
import { site } from "@/content/site";
import type { Locale } from "@/i18n";

const columns = ["A", "B dim", "C", "D r"];

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const lang = (await params).lang as Locale;
  const t = getDictionary(lang);

  return (
    <>
      <Loader name={site.name} role={t.loader} city={site.city} />
      <TopBar lang={lang} t={t.nav} />

      <main id="top">
        <section className="hero" aria-label={site.name}>
          <div className="g sh mt">
            {t.hero.map((item, k) => (
              <p key={item.label} className={columns[k]}>
                <span className="lb">{item.label}</span>
                {item.text}
              </p>
            ))}
          </div>
          <FitText as="h1" lines={site.name.split(" ")} heightRatio={0.64} scrollWeight rise />
        </section>

        <section className="about" aria-labelledby="about-title">
          <div className="g sh mt">
            <span className="A" id="about-title">
              <span className="lb">{t.about.label}</span>
              {site.name}
            </span>
            <span className="B dim">{t.about.subtitle}</span>
            <span className="D r">{t.about.place}</span>
          </div>
          <div className="g statement">
            <p>
              {t.about.lead} <span className="dim">{t.about.rest}</span>
            </p>
          </div>
          <div className="g facts mt">
            {t.about.facts.map((fact, k) => (
              <p key={fact.label} className={columns[k].replace(" dim", "")}>
                <span className="lb">{fact.label}</span>
                {fact.text}
              </p>
            ))}
          </div>
        </section>

        <ProjectIndex lang={lang} t={t.index} card={t.card} />

        <section className="skills" aria-labelledby="skills-title">
          <div className="g sh mt">
            <span className="A" id="skills-title">
              <span className="lb">{t.skills.label}</span>
              {t.skills.title}
            </span>
            <span className="B dim">{t.skills.toolsTitle}</span>
            <span className="C dim">{t.skills.methodTitle}</span>
            <span className="D r dim">{t.skills.alsoTitle}</span>
          </div>
          <div className="g lists mt">
            <ul className="A">
              {t.skills.services.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <ul className="B dim">
              {t.skills.tools.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <ol className="C">
              {t.skills.method.map((item, k) => (
                <li key={item}>
                  <span>{k + 1}</span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
            <ul className="D r dim">
              {t.skills.also.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section id="contact" className="contact" aria-labelledby="contact-title">
          <ContactBlock t={t.contact} />
          <Footer lang={lang} t={t.footer} />
        </section>
      </main>
    </>
  );
}
