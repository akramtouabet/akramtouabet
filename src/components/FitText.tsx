"use client";

import { useEffect, useRef, type CSSProperties } from "react";

type Props = {
  lines: string[];
  as?: "h1" | "h2" | "p" | "span";
  /**
   * « axis » : la taille remplit la ligne la plus longue, puis chaque ligne élargit sa chasse
   * (axe wdth d'Archivo) jusqu'à remplir exactement la largeur.
   * « size » : seule la taille s'ajuste.
   */
  mode?: "axis" | "size";
  /** Hauteur maximale de l'ensemble des lignes, en fraction de la hauteur de l'écran. */
  heightRatio?: number;
  /** Le mot s'allège et glisse en quittant le premier écran. */
  scrollWeight?: boolean;
  /** Les lettres montent une à une à l'apparition. */
  rise?: boolean;
  className?: string;
};

const MIN_WIDTH = 62;
const MAX_WIDTH = 125;
const LINE_HEIGHT = 0.74;

function textWidth(node: HTMLElement) {
  const range = document.createRange();
  range.selectNodeContents(node);
  return range.getBoundingClientRect().width || 1;
}

export function FitText({ lines, as = "span", mode = "axis", heightRatio, scrollWeight = false, rise = false, className }: Props) {
  const ref = useRef<HTMLHeadingElement & HTMLParagraphElement & HTMLSpanElement>(null);
  const key = lines.join("|");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const lineEls = Array.from(el.querySelectorAll<HTMLElement>(".fit-line"));
    let widths = lineEls.map(() => MIN_WIDTH);
    let weight = 800;
    let lastWidth = 0;

    const apply = () =>
      lineEls.forEach((line, k) => {
        line.style.fontVariationSettings = `"wdth" ${widths[k]}, "wght" ${weight}`;
      });

    const fit = (force = false) => {
      const available = el.clientWidth;
      if (!available || (!force && available === lastWidth)) return;
      lastWidth = available;

      lineEls.forEach((line) => (line.style.fontVariationSettings = `"wdth" ${MIN_WIDTH}, "wght" 800`));
      el.style.fontSize = "100px";
      const widest = Math.max(...lineEls.map(textWidth));
      const byWidth = (100 * available) / widest;
      const byHeight = heightRatio ? (window.innerHeight * heightRatio) / (LINE_HEIGHT * lineEls.length) : Infinity;
      el.style.fontSize = `${Math.floor(Math.min(byWidth, byHeight))}px`;

      widths = lineEls.map((line) => {
        if (mode !== "axis") return MIN_WIDTH;
        let lo = MIN_WIDTH;
        let hi = MAX_WIDTH;
        for (let step = 0; step < 14; step++) {
          const mid = (lo + hi) / 2;
          line.style.fontVariationSettings = `"wdth" ${mid}, "wght" 800`;
          if (textWidth(line) > available) hi = mid;
          else lo = mid;
        }
        return lo;
      });
      apply();
    };

    const onScroll = () => {
      const progress = Math.min(1, Math.max(0, window.scrollY / window.innerHeight));
      weight = Math.round(800 - progress * 600);
      el.style.translate = `0 ${progress * 16}vh`;
      apply();
    };

    fit(true);
    document.fonts?.ready.then(() => fit(true));
    const observer = new ResizeObserver(() => fit());
    observer.observe(el);
    if (scrollWeight) {
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
    }
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [key, mode, heightRatio, scrollWeight]);

  let index = 0;
  const children = lines.map((line, k) => (
    <span key={k} className="fit-line" aria-hidden="true">
      {Array.from(line).map((char, j) =>
        char === " " ? (
          <span key={j} className="sp" />
        ) : (
          <span key={j} className="c" style={{ "--i": index++ } as CSSProperties}>
            {char}
          </span>
        ),
      )}
    </span>
  ));

  const Tag = as;
  return (
    <Tag ref={ref} className={["fit", rise && "rise", className].filter(Boolean).join(" ")} aria-label={lines.join(" ")}>
      {children}
    </Tag>
  );
}
