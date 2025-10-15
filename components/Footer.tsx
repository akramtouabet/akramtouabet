"use client";
import { useLang } from "./LanguageProvider";
import { AnimatePresence, motion } from "framer-motion";

export default function Footer() {
  const { t, lang } = useLang();
  return (
    <footer className="fixed bottom-0 inset-x-0 z-40">
      <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between text-xs text-gray-400">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={`left-${lang}`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="flex items-center gap-4"
          >
            <a href={`mailto:${t.footer.email}`}>{t.footer.email}</a>
            <a href="https://github.com/akramtouabet" target="_blank" rel="noreferrer">{t.footer.github}</a>
            <a href="https://fr.linkedin.com/in/akramtouabet" target="_blank" rel="noreferrer">{t.footer.linkedin}</a>
          </motion.div>
        </AnimatePresence>
        <AnimatePresence mode="popLayout">
          <motion.div
            key={`right-${lang}`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="flex items-center gap-4"
          >
            <a href="/legal/mentions-legales">{t.footer.mentions}</a>
            <a href="/legal/cgu-cgv">{t.footer.cgu}</a>
            <a href="/legal/cookies">{t.footer.cookies}</a>
            <span>{t.footer.city}</span>
          </motion.div>
        </AnimatePresence>
      </div>
    </footer>
  );
}
