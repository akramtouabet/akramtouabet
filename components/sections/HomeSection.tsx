"use client";
import { motion } from "framer-motion";
import { useLang } from "../LanguageProvider";
import AnimatedText from "../ui/AnimatedText";

export default function HomeSection() {
  const { t } = useLang();
  return (
    <div className="max-w-3xl mx-auto text-center space-y-6">
      <AnimatedText viewport={{ once: true }} className="text-4xl md:text-6xl font-semibold tracking-tight" as="h1">
        {t.home.title}
      </AnimatedText>
      <AnimatedText viewport={{ once: true }} className="text-gray-300 max-w-2xl mx-auto leading-relaxed" as="p">
        {t.home.p1}
      </AnimatedText>
      <AnimatedText viewport={{ once: true }} className="text-gray-400 max-w-2xl mx-auto" as="p">
        {t.home.p2}
      </AnimatedText>
      <AnimatedText viewport={{ once: true }} as="div">
        <button onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
          className="inline-flex items-center justify-center px-5 py-2.5 rounded-full border border-white/20 text-white hover:border-white/40 transition">
          {t.home.cta}
        </button>
      </AnimatedText>
    </div>
  );
}
