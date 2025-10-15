"use client";
import { useLang } from "../LanguageProvider";
import { motion } from "framer-motion";
import AnimatedText from "../ui/AnimatedText";

export default function PortfolioSection() {
  const { t } = useLang();
  return (
    <AnimatedText viewport={{ once: true }} className="max-w-xl mx-auto text-center" as="div">
      <h2 className="text-2xl md:text-3xl font-semibold mb-4">{t.portfolio.title}</h2>
      <p className="text-gray-400">{t.portfolio.soon}</p>
    </AnimatedText>

  );
}
