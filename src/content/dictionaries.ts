import type { Locale } from "@/i18n";

const fr = {
  meta: {
    title: "Akram Touabet — Développeur web à Paris",
    description:
      "Développeur web indépendant à Paris. Sites sur mesure, e-commerce et espaces d'édition pour des maisons qui ont une identité forte.",
  },
  nav: { index: "Index", info: "Info", contact: "Contact", available: "Disponible", language: "Langue" },
  loader: "Développeur web",
  hero: [
    { label: "RÔLE.:", text: "Développeur web indépendant, full stack. Sites sur mesure, e-commerce, espaces d'édition." },
    { label: "POUR.:", text: "Maisons de mode, cafés, restaurants, hôtels, lieux. Et studios de design." },
    { label: "BASE.:", text: "Paris" },
    { label: "DISPO.:", text: "Maintenant" },
  ],
  about: {
    label: "À PROPOS.:",
    subtitle: "Un interlocuteur, du début à la fin",
    place: "Paris, et à distance",
    lead: "Je fabrique des sites précis et rapides, faits à la main, pour des maisons qui ont une identité forte.",
    rest: "De la première maquette à la mise en ligne, sans intermédiaire, avec un espace d'édition pour que vos équipes restent autonomes.",
    facts: [
      { label: "BASE.:", text: "Paris, et à distance" },
      { label: "LANGUES.:", text: "Français, anglais, arabe" },
      { label: "DÉLAI.:", text: "Selon le projet" },
      { label: "RÉPONSE.:", text: "Sous 24 heures" },
    ],
  },
  index: { label: "INDEX.:", number: "N°", title: "Projets clients", sectorCity: "Secteur, ville", year: "Année", cursor: "Voir" },
  card: { label: "FICHE.:", sector: "Secteur", city: "Ville", done: "Fait", tools: "Outils", year: "Année" },
  skills: {
    label: "SAVOIR-FAIRE.:",
    title: "Ce que je fais",
    toolsTitle: "Outils",
    methodTitle: "Méthode",
    alsoTitle: "Aussi",
    services: ["Sites éditoriaux", "Boutiques en ligne", "Réservations, agenda", "Espaces d'édition", "Suivi, évolutions"],
    tools: ["Next.js, React", "Node", "Sanity, CMS headless", "Shopify", "GSAP", "Vercel, AWS"],
    method: ["Un échange", "Plusieurs pistes de design", "Développement", "Mise en ligne"],
    also: ["Pour les studios de design", "Intégration au pixel près", "Animations, transitions"],
  },
  contact: {
    label: "CONTACT.:",
    title: "Un projet, une ouverture, une collection",
    hint: "Cliquez pour copier l'adresse",
    copied: "Adresse copiée",
    selected: "Adresse sélectionnée",
    cursor: "Copier",
    reply: { label: "RÉP.:", text: "24 h" },
  },
  footer: { made: "Fait à la main, à Paris", legal: "Mentions légales", top: "Haut ↑" },
  info: {
    close: "Fermer ×",
    clients: "CLIENTS.:",
    write: "ÉCRIRE.:",
    about:
      "Développeur web indépendant, à Paris. Je travaille seul, avec quelques designers et photographes de confiance, pour des maisons qui ont une image forte. Je propose plusieurs pistes de design, je code chaque page à la main, et je vous laisse un outil simple pour faire vivre le site.",
  },
  project: {
    back: "← Index",
    next: "Suivant →",
    count: "Projet",
    sector: "SECTEUR.:",
    city: "VILLE.:",
    year: "ANNÉE.:",
    status: "STATUT.:",
    brief: "MISSION.:",
    briefTitle: "Le projet",
    done: "FAIT.:",
    doneTitle: "Ce qui a été livré",
    tools: "OUTILS.:",
    visit: "Voir le site ↗",
    nextLabel: "SUIVANT.:",
    nextTitle: "Projet suivant",
    cursor: "Suivant",
  },
  legal: {
    title: "Mentions légales",
    label: "LÉGAL.:",
    publisher: "Éditeur",
    publisherText: "Akram Touabet, développeur web indépendant, Paris (France). Directeur de la publication.",
    siret: "SIRET",
    contact: "Contact",
    host: "Hébergement",
    data: "Données",
    dataText: "Ce site ne dépose aucun cookie et ne collecte aucune donnée personnelle.",
  },
};

export type Dictionary = typeof fr;

const en: Dictionary = {
  meta: {
    title: "Akram Touabet — Web developer in Paris",
    description:
      "Independent web developer in Paris. Bespoke websites, e-commerce and editing tools for houses with a strong identity.",
  },
  nav: { index: "Index", info: "Info", contact: "Contact", available: "Available", language: "Language" },
  loader: "Web developer",
  hero: [
    { label: "ROLE.:", text: "Independent full-stack web developer. Bespoke websites, e-commerce, editing tools." },
    { label: "FOR.:", text: "Fashion houses, cafés, restaurants, hotels, venues. And design studios." },
    { label: "BASE.:", text: "Paris" },
    { label: "AVAIL.:", text: "Now" },
  ],
  about: {
    label: "ABOUT.:",
    subtitle: "One contact, from start to finish",
    place: "Paris, and remote",
    lead: "I build precise, fast, handcrafted websites for houses with a strong identity.",
    rest: "From the first mock-up to launch, with no middleman, and an editing space so your teams stay independent.",
    facts: [
      { label: "BASE.:", text: "Paris, and remote" },
      { label: "LANGUAGES.:", text: "French, English, Arabic" },
      { label: "TIMELINE.:", text: "Depends on the project" },
      { label: "REPLY.:", text: "Within 24 hours" },
    ],
  },
  index: { label: "INDEX.:", number: "No.", title: "Client projects", sectorCity: "Sector, city", year: "Year", cursor: "View" },
  card: { label: "CARD.:", sector: "Sector", city: "City", done: "Done", tools: "Tools", year: "Year" },
  skills: {
    label: "EXPERTISE.:",
    title: "What I do",
    toolsTitle: "Tools",
    methodTitle: "Method",
    alsoTitle: "Also",
    services: ["Editorial websites", "Online shops", "Bookings, calendars", "Editing spaces", "Support, updates"],
    tools: ["Next.js, React", "Node", "Sanity, headless CMS", "Shopify", "GSAP", "Vercel, AWS"],
    method: ["A conversation", "Several design directions", "Development", "Launch"],
    also: ["For design studios", "Pixel-perfect build", "Animations, transitions"],
  },
  contact: {
    label: "CONTACT.:",
    title: "A project, an opening, a collection",
    hint: "Click to copy the address",
    copied: "Address copied",
    selected: "Address selected",
    cursor: "Copy",
    reply: { label: "REPLY.:", text: "24 h" },
  },
  footer: { made: "Handmade in Paris", legal: "Legal notice", top: "Top ↑" },
  info: {
    close: "Close ×",
    clients: "CLIENTS.:",
    write: "WRITE.:",
    about:
      "Independent web developer based in Paris. I work alone, with a few trusted designers and photographers, for houses with a strong image. I propose several design directions, hand-code every page, and leave you a simple tool to keep the site alive.",
  },
  project: {
    back: "← Index",
    next: "Next →",
    count: "Project",
    sector: "SECTOR.:",
    city: "CITY.:",
    year: "YEAR.:",
    status: "STATUS.:",
    brief: "BRIEF.:",
    briefTitle: "The project",
    done: "DONE.:",
    doneTitle: "What was delivered",
    tools: "TOOLS.:",
    visit: "Visit site ↗",
    nextLabel: "NEXT.:",
    nextTitle: "Next project",
    cursor: "Next",
  },
  legal: {
    title: "Legal notice",
    label: "LEGAL.:",
    publisher: "Publisher",
    publisherText: "Akram Touabet, independent web developer, Paris (France). Publication director.",
    siret: "SIRET",
    contact: "Contact",
    host: "Hosting",
    data: "Data",
    dataText: "This site sets no cookies and collects no personal data.",
  },
};

const dictionaries: Record<Locale, Dictionary> = { fr, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
