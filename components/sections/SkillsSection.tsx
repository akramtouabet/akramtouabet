"use client";
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiFramer, SiNodedotjs, SiExpress, SiGit, SiDocker, SiJavascript, SiPostgresql, SiMongodb, SiAmazonwebservices, SiPhp, SiPython } from "react-icons/si";
import AnimatedText from "../ui/AnimatedText";
import { useLang } from "@/components/LanguageProvider";

const skills = [
  { icon: SiReact, name: "React" },
  { icon: SiNextdotjs, name: "Next.js" },
  { icon: SiTypescript, name: "TypeScript" },
  { icon: SiTailwindcss, name: "TailwindCSS" },
  { icon: SiFramer, name: "Framer Motion" },
  { icon: SiNodedotjs, name: "Node.js" },
  { icon: SiExpress, name: "Express" },
  { icon: SiAmazonwebservices, name: "AWS" },
  { icon: SiDocker, name: "Docker" },
  { icon: SiGit, name: "Git" },
  { icon: SiJavascript, name: "Javascript" },
  { icon: SiPostgresql, name: "Postgresql" },
  { icon: SiMongodb, name: "MongoDB/Mongoose" },
  { icon: SiPhp, name: "PHP" },
  { icon: SiPython, name: "Python" },
];

export default function SkillsSection() {
  const { t } = useLang();
  return (
    <section id="skills" className="min-h-screen flex flex-col items-center justify-center text-center">
      <AnimatedText as="h2" className="text-3xl md:text-5xl font-semibold mb-12">{t.skills.title}</AnimatedText>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 max-w-4xl mx-auto">
        {skills.map(({ icon: Icon, name }, i) => (
          <div className="flex flex-col items-center justify-center space-y-2">
            <Icon size={40} className="text-indigo-400" />
            <p className="text-sm text-gray-300">{name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
