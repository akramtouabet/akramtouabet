"use client";

import { useRef, useState } from "react";
import type { Dictionary } from "@/content/dictionaries";
import { site } from "@/content/site";
import { FitText } from "./FitText";
import { Roll } from "./Roll";

export function ContactBlock({ t }: { t: Dictionary["contact"] }) {
  const [hint, setHint] = useState(t.hint);
  const mailRef = useRef<HTMLButtonElement>(null);
  const timer = useRef<number>(0);

  const say = (message: string) => {
    setHint(message);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setHint(t.hint), 1800);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      say(t.copied);
    } catch {
      const range = document.createRange();
      if (mailRef.current) range.selectNodeContents(mailRef.current);
      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(range);
      say(t.selected);
    }
  };

  return (
    <>
      <div className="g sh mt">
        <span className="A" id="contact-title">
          <span className="lb">{t.label}</span>
          {t.title}
        </span>
        <span className="B dim" aria-live="polite">
          {hint}
        </span>
        <span className="C">
          {site.links.map((link, k) => (
            <span key={link.href}>
              {k > 0 && ", "}
              <a className="roll" href={link.href} target="_blank" rel="noopener noreferrer">
                <Roll>{link.label}</Roll>
              </a>
            </span>
          ))}
        </span>
        <span className="D r">
          <span className="lb">{t.reply.label}</span>
          {t.reply.text}
        </span>
      </div>
      <button ref={mailRef} className="mail" type="button" data-cursor={t.cursor} onClick={copy}>
        <FitText lines={[site.email]} mode="size" />
      </button>
    </>
  );
}
