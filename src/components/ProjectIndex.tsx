"use client";

import { useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/content/dictionaries";
import { projectYear, projects } from "@/content/projects";
import type { Locale } from "@/i18n";
import { TransitionLink } from "./TransitionLink";
import { useFinePointer } from "./useFinePointer";

const pad = (n: number) => String(n).padStart(2, "0");

export function ProjectIndex({ lang, t, card }: { lang: Locale; t: Dictionary["index"]; card: Dictionary["card"] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const fine = useFinePointer();
  const current = active === null ? null : projects[active];

  // la page passe en clair tant que l'index occupe le centre de l'écran
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => document.body.classList.toggle("light", entry.isIntersecting),
      { rootMargin: "-48% 0px -48% 0px" },
    );
    observer.observe(section);
    return () => {
      observer.disconnect();
      document.body.classList.remove("light");
    };
  }, []);

  // la fiche suit le curseur avec un léger retard
  useEffect(() => {
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let sx = x;
    let sy = y;
    let frame = 0;
    const move = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;
    };
    const loop = () => {
      sx += (x - sx) * 0.12;
      sy += (y - sy) * 0.12;
      const el = cardRef.current;
      if (el) {
        const half = el.offsetHeight / 2;
        let left = sx + 160;
        if (left + 130 > window.innerWidth - 16) left = sx - 160;
        el.style.left = `${left}px`;
        el.style.top = `${Math.min(window.innerHeight - half - 16, Math.max(half + 16, sy))}px`;
      }
      frame = requestAnimationFrame(loop);
    };
    window.addEventListener("pointermove", move, { passive: true });
    frame = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section ref={sectionRef} id="index" className={`index ${active !== null ? "active" : ""}`} aria-labelledby="index-title">
      <div className="g sh mt">
        <span className="h1">
          <span className="lb">{t.label}</span>
          {t.number}
        </span>
        <span className="h2" id="index-title">
          {t.title} ({pad(projects.length)})
        </span>
        <span className="C dim">{t.sectorCity}</span>
        <span className="D r dim">{t.year}</span>
      </div>
      <ul onMouseLeave={() => setActive(null)}>
        {projects.map((project, i) => (
          <li key={project.slug} className={`row ${active === i ? "on" : ""}`}>
            <TransitionLink
              className="row-link"
              href={`/${lang}/work/${project.slug}`}
              color={project.colors.bg}
              data-cursor={t.cursor}
              onMouseEnter={() => fine && setActive(i)}
              onFocus={() => setActive(i)}
              onBlur={() => setActive(null)}
            >
              <span className="no mt">{pad(i + 1)}</span>
              <span className="nm">{project.name}</span>
              <span className="mt ct">
                {project.kind[lang]}, {project.city}
              </span>
              <span className="mt yr">{projectYear(project, lang)}</span>
            </TransitionLink>
          </li>
        ))}
      </ul>

      <div ref={cardRef} className={`card mt ${current && fine ? "on" : ""}`} aria-hidden="true">
        {current && (
          <>
            <span className="lb">{card.label}</span>
            {pad((active ?? 0) + 1)}
            <div className="name">{current.name}</div>
            <dl>
              <dt>{card.sector}</dt>
              <dd>{current.sector[lang]}</dd>
              <dt>{card.city}</dt>
              <dd>{current.city}</dd>
              <dt>{card.done}</dt>
              <dd>{current.summary[lang]}</dd>
              <dt>{card.tools}</dt>
              <dd>{current.tools}</dd>
              <dt>{card.year}</dt>
              <dd>{projectYear(current, lang)}</dd>
            </dl>
          </>
        )}
      </div>
    </section>
  );
}
