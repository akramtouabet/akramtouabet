"use client";

import Lenis from "lenis";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";

type Ui = {
  infoOpen: boolean;
  setInfoOpen: (open: boolean) => void;
  /** Navigue derrière un rideau de la couleur de la page d'arrivée. */
  go: (href: string, color: string) => void;
};

const UiContext = createContext<Ui | null>(null);

export function useUi() {
  const ui = useContext(UiContext);
  if (!ui) throw new Error("useUi doit être utilisé dans <Providers>");
  return ui;
}

const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function Providers({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const lenis = useRef<Lenis | null>(null);
  const [infoOpen, setInfoOpen] = useState(false);
  const [curtain, setCurtain] = useState<{ phase: "idle" | "cover" | "reveal"; color: string }>({ phase: "idle", color: "#0d0d0d" });

  // défilement fluide
  useEffect(() => {
    if (reducedMotion()) return;
    lenis.current = new Lenis({ autoRaf: true, anchors: true, lerp: 0.1 });
    return () => {
      lenis.current?.destroy();
      lenis.current = null;
    };
  }, []);

  // le panneau Info bloque le défilement
  useEffect(() => {
    document.body.classList.toggle("locked", infoOpen);
    if (infoOpen) lenis.current?.stop();
    else lenis.current?.start();
  }, [infoOpen]);

  // à chaque page : prête si aucun chargement n'est affiché, filets qui se tracent à l'entrée
  useEffect(() => {
    if (!document.querySelector(".loader")) document.body.classList.add("ready");
    const observer = new IntersectionObserver((entries) =>
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          observer.unobserve(entry.target);
        }
      }),
    );
    document.querySelectorAll(".sh").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  // rideau : se lève une fois la nouvelle page affichée
  useEffect(() => {
    if (curtain.phase !== "cover") return;
    const reveal = window.setTimeout(() => setCurtain((c) => ({ ...c, phase: "reveal" })), 120);
    return () => window.clearTimeout(reveal);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- déclenché par l'arrivée sur la nouvelle page
  }, [pathname]);
  useEffect(() => {
    if (curtain.phase !== "reveal") return;
    const idle = window.setTimeout(() => setCurtain((c) => ({ ...c, phase: "idle" })), 820);
    return () => window.clearTimeout(idle);
  }, [curtain.phase]);

  const go = useCallback(
    (href: string, color: string) => {
      setInfoOpen(false);
      if (reducedMotion()) {
        router.push(href);
        return;
      }
      setCurtain({ phase: "cover", color });
      window.setTimeout(() => router.push(href), 720);
      // garde-fou : si la page ne change pas, le rideau se lève quand même
      window.setTimeout(() => setCurtain((c) => (c.phase === "cover" ? { ...c, phase: "reveal" } : c)), 2600);
    },
    [router],
  );

  const ui = useMemo(() => ({ infoOpen, setInfoOpen, go }), [infoOpen, go]);

  return (
    <UiContext.Provider value={ui}>
      {children}
      <div
        className={`curtain ${curtain.phase === "idle" ? "" : curtain.phase}`}
        style={{ background: curtain.color }}
        aria-hidden="true"
      />
    </UiContext.Provider>
  );
}
