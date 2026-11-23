"use client";

import { useEffect, useRef, useState } from "react";

/** Une seule fois par chargement du site : pas à chaque retour sur l'accueil. */
let played = false;

const DURATION = 1300;

export function Loader({ name, role, city }: { name: string; role: string; city: string }) {
  const [visible, setVisible] = useState(() => !played);
  const [done, setDone] = useState(false);
  const countRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!visible) return;
    played = true;
    const body = document.body;
    const finish = () => {
      setDone(true);
      body.classList.remove("locked");
      window.setTimeout(() => body.classList.add("ready"), 260);
      window.setTimeout(() => setVisible(false), 1100);
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const skip = window.setTimeout(finish, 0);
      return () => window.clearTimeout(skip);
    }

    body.classList.add("locked");
    const start = performance.now();
    let frame = 0;
    const step = (now: number) => {
      const progress = Math.min(1, (now - start) / DURATION);
      const eased = 1 - Math.pow(1 - progress, 3);
      if (countRef.current) countRef.current.textContent = String(Math.round(eased * 100)).padStart(3, "0");
      if (barRef.current) barRef.current.style.width = `${eased * 100}%`;
      if (progress < 1) frame = requestAnimationFrame(step);
      else window.setTimeout(finish, 220);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [visible]);

  if (!visible) return null;

  return (
    <div className={`loader mt ${done ? "done" : ""}`} aria-hidden="true">
      <div ref={barRef} className="bar" />
      <div className="g row">
        <span className="A">{name}</span>
        <span className="B dim">{role}</span>
        <span className="D r">{city}</span>
      </div>
      <div ref={countRef} className="count">
        000
      </div>
    </div>
  );
}
