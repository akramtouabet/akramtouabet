import type { Locale } from "@/i18n";

type Localized<T = string> = Record<Locale, T>;

export type Project = {
  slug: string;
  name: string;
  year: string;
  /** Projet en cours : la colonne « Année » affiche alors le statut. */
  ongoing?: boolean;
  status: Localized;
  /** Couleur pleine de la page projet, reprise de l'identité du client. */
  colors: { bg: string; fg: string };
  kind: Localized;
  sector: Localized;
  city: string;
  summary: Localized;
  text: Localized;
  delivered: Localized<string[]>;
  tools: string;
  url?: string;
};

/** Du plus récent au plus ancien. */
export const projects: Project[] = [
  {
    slug: "sans-cesse-studio",
    name: "Sans Cesse Studio",
    year: "2026",
    ongoing: true,
    status: { fr: "En cours", en: "In progress" },
    colors: { bg: "#ffffff", fg: "#111111" },
    kind: { fr: "Traiteur", en: "Caterer" },
    sector: { fr: "Traiteur, événementiel", en: "Caterer, events" },
    city: "Paris",
    summary: {
      fr: "Propositions de design, site vitrine",
      en: "Design proposals, showcase website",
    },
    text: {
      fr: "Un traiteur parisien qui imagine des tables et des réceptions sur mesure. Plusieurs pistes de design ont été proposées ; le site est en cours de développement sur celle retenue.",
      en: "A Parisian caterer creating bespoke tables and receptions. Several design directions were proposed; the website is being built on the chosen one.",
    },
    delivered: {
      fr: ["Plusieurs pistes de design", "Site vitrine sur mesure", "Développement en cours"],
      en: ["Several design directions", "Bespoke showcase website", "Development in progress"],
    },
    tools: "Next.js, TypeScript",
    url: "https://sanscessestudio.com/",
  },
  {
    slug: "as2-fleurs",
    name: "As2 Fleurs",
    year: "2025",
    status: { fr: "En ligne", en: "Live" },
    colors: { bg: "#ac5361", fg: "#f9f4ec" },
    kind: { fr: "Fleuriste", en: "Florist" },
    sector: { fr: "Fleuriste, e-commerce", en: "Florist, e-commerce" },
    city: "Paris",
    summary: {
      fr: "Boutique, configurateur, abonnement",
      en: "Shop, configurator, subscription",
    },
    text: {
      fr: "Une fleuriste indépendante qui prenait ses commandes par téléphone et sur les réseaux. Le site lui donne une vraie boutique : un configurateur qui reprend les choix faits au téléphone, le paiement en ligne, un abonnement floral, et un back-office où elle gère seule produits, commandes et livraisons.",
      en: "An independent florist who took orders by phone and on social media. The site gives her a real shop: a configurator that mirrors the choices made over the phone, online payment, a flower subscription, and a back office where she manages products, orders and deliveries on her own.",
    },
    delivered: {
      fr: ["Boutique en ligne sur mesure", "Configurateur de bouquets", "Abonnement floral récurrent", "Back-office : produits, commandes, livraisons"],
      en: ["Bespoke online shop", "Bouquet configurator", "Recurring flower subscription", "Back office: products, orders, deliveries"],
    },
    tools: "Next.js, TypeScript, PostgreSQL, Stripe",
    url: "https://as2fleurs.fr/",
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

/** Valeur affichée dans la colonne « Année » : le statut si le projet est en cours. */
export function projectYear(project: Project, locale: Locale) {
  return project.ongoing ? project.status[locale] : project.year;
}
