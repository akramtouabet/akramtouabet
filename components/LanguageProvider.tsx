"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import fr from "@/locales/fr.json";
import en from "@/locales/en.json";

type Dict = typeof en;
type Lang = "fr" | "en";
type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: Dict };
const LangCtx = createContext<Ctx | null>(null);

export function useLang() {
  const ctx = useContext(LangCtx);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}

export default function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("fr");

  useEffect(() => {
    const url = new URL(window.location.href);
    const q = url.searchParams.get("lang");
    const saved = window.localStorage.getItem("lang");
    if (q === "fr" || q === "en") setLang(q);
    else if (saved === "fr" || saved === "en") setLang(saved as Lang);
  }, []);

  useEffect(() => {
    window.localStorage.setItem("lang", lang);
    const url = new URL(window.location.href);
    url.searchParams.set("lang", lang);
    window.history.replaceState({}, "", url.toString());
    window.dispatchEvent(new CustomEvent("lang:change", { detail: { lang } }));
  }, [lang]);

  const t = useMemo(() => (lang === "fr" ? fr : en), [lang]);

  return <LangCtx.Provider value={{ lang, setLang, t }}>{children}</LangCtx.Provider>;
}
