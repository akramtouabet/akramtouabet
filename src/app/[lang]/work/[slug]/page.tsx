import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import { FitText } from "@/components/FitText";
import { Roll } from "@/components/Roll";
import { TransitionLink } from "@/components/TransitionLink";
import { getDictionary } from "@/content/dictionaries";
import { getProject, projects } from "@/content/projects";
import { site } from "@/content/site";
import { locales, type Locale } from "@/i18n";

type Props = { params: Promise<{ lang: string; slug: string }> };

const pad = (n: number) => String(n).padStart(2, "0");
const INK = "#0d0d0d";

export function generateStaticParams() {
  return locales.flatMap((lang) => projects.map((p) => ({ lang, slug: p.slug })));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.name,
    description: project.text[lang as Locale],
    alternates: {
      canonical: `/${lang}/work/${slug}`,
      languages: { fr: `/fr/work/${slug}`, en: `/en/work/${slug}` },
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { lang: rawLang, slug } = await params;
  const lang = rawLang as Locale;
  const project = getProject(slug);
  if (!project) notFound();

  const t = getDictionary(lang).project;
  const index = projects.indexOf(project);
  const next = projects[(index + 1) % projects.length];
  const theme = { "--pbg": project.colors.bg, "--pfg": project.colors.fg } as CSSProperties;

  return (
    <main className="project" style={theme}>
      <div className="g ptop mt">
        <TransitionLink className="A roll" href={`/${lang}#index`} color={INK}>
          <Roll>{t.back}</Roll>
        </TransitionLink>
        <span className="B brand">{site.name}</span>
        <span className="C">
          {t.count} {pad(index + 1)} / {pad(projects.length)}
        </span>
        <TransitionLink className="D r end roll" href={`/${lang}/work/${next.slug}`} color={next.colors.bg}>
          <Roll>{t.next}</Roll>
        </TransitionLink>
      </div>

      <div className="pword">
        <FitText as="h1" lines={[project.name]} heightRatio={0.34} rise />
      </div>

      <div className="g sh mt pmeta">
        <span className="A">
          <span className="lb">{t.sector}</span>
          {project.sector[lang]}
        </span>
        <span className="B">
          <span className="lb">{t.city}</span>
          {project.city}
        </span>
        <span className="C">
          <span className="lb">{t.year}</span>
          {project.year}
        </span>
        <span className="D r">
          <span className="lb">{t.status}</span>
          {project.status[lang]}
        </span>
      </div>

      <div className="g pbody">
        <span className="A mt">
          <span className="lb">{t.brief}</span>
          {t.briefTitle}
        </span>
        <div className="ptext">
          <p>{project.text[lang]}</p>
          {project.url && (
            <p className="plink mt">
              <a className="roll" href={project.url} target="_blank" rel="noopener noreferrer">
                <Roll>{t.visit}</Roll>
              </a>
            </p>
          )}
        </div>
      </div>

      <div className="g sh mt pdone">
        <span className="A">
          <span className="lb">{t.done}</span>
          {t.doneTitle}
        </span>
        <ul className="B">
          {project.delivered[lang].map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <span className="C">
          <span className="lb">{t.tools}</span>
        </span>
        <span className="D r">{project.tools}</span>
      </div>

      <TransitionLink className="pnext" href={`/${lang}/work/${next.slug}`} color={next.colors.bg} data-cursor={t.cursor}>
        <span className="mt">
          <span className="lb">{t.nextLabel}</span>
          {t.nextTitle}
        </span>
        <span className="pnw">
          <FitText lines={[next.name]} mode="size" />
        </span>
      </TransitionLink>
    </main>
  );
}
