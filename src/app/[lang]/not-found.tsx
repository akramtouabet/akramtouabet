import Link from "next/link";
import { FitText } from "@/components/FitText";
import { Roll } from "@/components/Roll";

/** Rendue dans la mise en page de la langue ; textes courts dans les deux langues. */
export default function NotFound() {
  return (
    <main className="plain">
      <div className="g sh mt">
        <p className="A">
          <span className="lb">404.:</span>
          Page introuvable / Page not found
        </p>
        <span className="D r">
          <Link className="roll" href="/">
            <Roll>Accueil / Home</Roll>
          </Link>
        </span>
      </div>
      <div className="pword" style={{ marginTop: "auto" }}>
        <FitText as="h1" lines={["404"]} heightRatio={0.6} rise />
      </div>
    </main>
  );
}
