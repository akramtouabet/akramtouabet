"use client";

import { useEffect, useState } from "react";
import { useLang } from "./LanguageProvider";
import MobileMenu from "./MobileMenu";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";

const NAV = [
  { id: "home", key: "home" },
  { id: "skills", key: "skills" },
  { id: "portfolio", key: "portfolio" },
  { id: "clients", key: "clients" },
  { id: "contact", key: "contact" },
  { id: "visualizer", key: "visualizer" },
];

export default function Header() {
  const { lang, setLang, t } = useLang();
  const [active, setActive] = useState("home");

  // Mise à jour active section (ancienne logique fullpage conservée)
  // ✅ Détection automatique de la page courante
useEffect(() => {
  if (window.location.pathname === "/visualizer") {
    setActive("visualizer");
  }
}, []);

  useEffect(() => {
  const container = document.querySelector("#fullpage");
  if (!container) return;

  const sections = Array.from(container.querySelectorAll("section"));

  const onScroll = () => {
    const scrollTop = (container as HTMLElement).scrollTop;
    const viewportHeight = window.innerHeight;

    // Trouve la section la plus proche du centre de l’écran
    let current = "home";
    let minDiff = Infinity;

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      const diff = Math.abs(rect.top + rect.height / 2 - viewportHeight / 2);
      if (diff < minDiff) {
        minDiff = diff;
        current = section.id;
      }
    });

    if (current !== active) {
      setActive(current);
      window.history.replaceState(null, "", `#${current}`); // ✅ met à jour l’URL sans reload
    }
  };

  container.addEventListener("scroll", onScroll);
  return () => container.removeEventListener("scroll", onScroll);
}, [active]);


  // 🔥 Fonction scroll fluide vers section
  const handleScrollTo = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const container = document.querySelector("#fullpage");
    const target = document.querySelector(`#${id}`);
    if (container && target) {
      target.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, "", `#${id}`);
      setActive(id);
    }
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="mx-auto max-w-5xl flex items-center justify-between px-4 py-4">
        {/* Single switch FR | EN */}
        <button
          onClick={() => setLang(lang === "fr" ? "en" : "fr")}
          className="text-xs tracking-wide rounded-full px-2 py-1 border border-white/10 hover:border-white/30 transition"
          aria-label="Switch language"
        >
          <span className={clsx(lang === "fr" ? "text-white" : "text-gray-500")}>FR</span>
          <span className="mx-1 text-gray-600">|</span>
          <span className={clsx(lang === "en" ? "text-white" : "text-gray-500")}>EN</span>
        </button>

        {/* Desktop nav with animated labels */}
        <nav className="hidden md:flex items-center gap-6 bg-black/40 backdrop-blur rounded-full px-4 py-2 border border-line overflow-hidden">
          {NAV.map((item) => (
            <a
              key={item.id}
              href={item.id === "visualizer" ? "/visualizer" : `#${item.id}`}
              onClick={(e) => {
  e.preventDefault();

  if (item.id === "visualizer") {
    // 🔥 Cas particulier → vraie redirection
    window.location.href = "/visualizer";
    return;
  }

  // Cas normal : scroll fluide ou redirection vers la home
  if (window.location.pathname === "/") {
    handleScrollTo(e, item.id);
  } else {
    window.location.href = `/#${item.id}`;
  }
}}
              className={clsx(
                "text-sm px-2 py-1 rounded transition",
                active === item.id
                  ? " text-white"
                  : "text-gray-300 hover:text-white"
              )}
            >
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={`${item.id}-${lang}`}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.15 }}
                >
                  {t.nav[item.key as keyof typeof t.nav]}
                </motion.span>
              </AnimatePresence>
            </a>
          ))}
        </nav>

        {/* Mobile menu */}
        <div className="md:hidden">
          <MobileMenu active={active} />
        </div>
      </div>
    </header>
  );
}
