"use client";
import { useLang } from "../LanguageProvider";
import { motion } from "framer-motion";
import AnimatedText from "../ui/AnimatedText";

export default function PortfolioSection() {
  const { t } = useLang();
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-xl mx-auto text-center">
      <h2 className="text-2xl md:text-3xl font-semibold mb-4">{t.portfolio.title}</h2>
      <p className="text-gray-400"><AnimatedText text={t.portfolio.soon} /></p>
    </motion.div>
  );
}
