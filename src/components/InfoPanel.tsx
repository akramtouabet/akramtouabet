"use client";

import { useEffect, useRef } from "react";
import type { Dictionary } from "@/content/dictionaries";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
import { FitText } from "./FitText";
import { useUi } from "./Providers";
import { Roll } from "./Roll";

export function InfoPanel({ t }: { t: Dictionary["info"] }) {
  const { infoOpen, setInfoOpen } = useUi();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!infoOpen) return;
    const focus = window.setTimeout(() => closeRef.current?.focus({ preventScroll: true }), 400);
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setInfoOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(focus);
      window.removeEventListener("keydown", onKey);
    };
  }, [infoOpen, setInfoOpen]);

  return (
    <div id="info" className={`info ${infoOpen ? "open" : ""}`} role="dialog" aria-modal="true" aria-label="Info" inert={!infoOpen}>
      <div className="in">
        <div className="g mt">
          <span className="A brand">{site.name}</span>
          <button ref={closeRef} className="D r end roll" type="button" onClick={() => setInfoOpen(false)}>
            <Roll>{t.close}</Roll>
          </button>
        </div>
        <div className="g body">
          <div className="side mt">
            <div>
              <span className="lb">{t.clients}</span>
              <ul>
                {projects.map((p) => (
                  <li key={p.slug}>{p.name}</li>
                ))}
              </ul>
            </div>
            <div>
              <span className="lb">{t.write}</span>
              <ul>
                <li>{site.email}</li>
                {site.links.map((link) => (
                  <li key={link.href}>
                    <a className="roll" href={link.href} target="_blank" rel="noopener noreferrer">
                      <Roll>{link.label}</Roll>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="text">{t.about}</p>
        </div>
        <div className="big">
          <FitText lines={[site.name]} mode="size" />
        </div>
      </div>
    </div>
  );
}
