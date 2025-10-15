"use client";
import { motion } from "framer-motion";
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiFramer, SiNodedotjs, SiExpress, SiAmazon, SiOpenjdk, SiGit } from "react-icons/si";

const skills = [
  { icon: SiReact, name: "React" },
  { icon: SiNextdotjs, name: "Next.js" },
  { icon: SiTypescript, name: "TypeScript" },
  { icon: SiTailwindcss, name: "TailwindCSS" },
  { icon: SiFramer, name: "Framer Motion" },
  { icon: SiNodedotjs, name: "Node.js" },
  { icon: SiExpress, name: "Express" },
  { icon: SiAmazon, name: "AWS" },
  { icon: SiOpenjdk, name: "Java (OpenJDK)" },
  { icon: SiGit, name: "Git" },
];

export default function CompetencesSection() {
  return (
    <section id="competences" className="min-h-screen flex flex-col items-center justify-center text-center">
      <motion.h2
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl md:text-5xl font-semibold mb-12"
      >
        Compétences
      </motion.h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 max-w-4xl mx-auto">
        {skills.map(({ icon: Icon, name }, i) => (
          <motion.div
            key={name}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center space-y-2"
          >
            <Icon size={40} className="text-indigo-400" />
            <p className="text-sm text-gray-300">{name}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
