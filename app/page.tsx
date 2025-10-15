"use client";

import FullpageWrapper from "@/components/FullpageWrapper";
import HomeSection from "@/components/sections/HomeSection";
import SkillsSection from "@/components/sections/SkillsSection";
import PortfolioSection from "@/components/sections/PortfolioSection";
import ClientsSection from "@/components/sections/ClientsSection";
import ContactSection from "@/components/sections/ContactSection";

export default function Page() {
  return (
    <FullpageWrapper anchors={["home","skills","portfolio", "clients", "contact"]}>
      <HomeSection />
      <SkillsSection />
      <PortfolioSection />
      <ClientsSection />
      <ContactSection />
    </FullpageWrapper>
  );
}
