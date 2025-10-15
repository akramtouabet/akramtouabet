"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import clsx from "clsx";
import { useLang } from "./LanguageProvider";

export default function MobileMenu({ active }: { active: string }) {
  const [open, setOpen] = useState(false);
  const { t } = useLang();

  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener("hashchange", close);
    return () => window.removeEventListener("hashchange", close);
  }, []);

  const NAV = ["home", "portfolio", "clients", "contact", "visualizer"];

  return (
    <>
      <button
        aria-label="Menu"
        onClick={() => setOpen((v) => !v)}
        className="fixed top-4 right-4 z-50 w-10 h-10 rounded-full bg-black/60 border border-line grid place-items-center md:hidden"
      >
        <div className="space-y-1.5">
          <span
            className={clsx(
              "block h-0.5 w-5 bg-foreground transition",
              open && "translate-y-2 rotate-45"
            )}
          ></span>
          <span
            className={clsx(
              "block h-0.5 w-5 bg-foreground transition",
              open && "opacity-0"
            )}
          ></span>
          <span
            className={clsx(
              "block h-0.5 w-5 bg-foreground transition",
              open && "-translate-y-2 -rotate-45"
            )}
          ></span>
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/90 backdrop-blur"
          >
            <motion.nav
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
              className="absolute inset-x-0 bottom-0 p-8 pb-16 grid gap-6"
            >
              {NAV.map((id) => {
                const href =
                  id === "visualizer" ? "/visualizer" : `#${id}`;
                return (
                  <a
                    key={id}
                    href={href}
                    onClick={() => setOpen(false)}
                    className={clsx(
                      "text-2xl font-medium transition",
                      active === id ? "text-white" : "text-gray-400"
                    )}
                  >
                    {t.nav[id as keyof typeof t.nav]}
                  </a>
                );
              })}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
