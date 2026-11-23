import { notFound } from "next/navigation";

/** Toute adresse inconnue sous /fr ou /en affiche la page 404 de la langue. */
export default function CatchAll() {
  notFound();
}
