"use client";
import { motion } from "framer-motion";
import { useLang } from "../LanguageProvider";

export default function HomeSection() {
  const { t } = useLang();
  return (
    <div className="max-w-3xl mx-auto text-center space-y-6">
      <motion.h1 initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="text-4xl md:text-6xl font-semibold tracking-tight">
        {t.home.title}
      </motion.h1>
      <motion.p initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="text-gray-300 max-w-2xl mx-auto leading-relaxed">
        {t.home.p1}
      </motion.p>
      <motion.p initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="text-gray-400 max-w-2xl mx-auto">
        {t.home.p2}
      </motion.p>
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
        <button onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
          className="inline-flex items-center justify-center px-5 py-2.5 rounded-full border border-white/20 text-white hover:border-white/40 transition">
          {t.home.cta}
        </button>
      </motion.div>
    </div>
  );
}
