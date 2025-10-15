"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Tooltip } from "@/components/ui/tooltip";
import { useLang } from "../LanguageProvider";

type Client = { id: number; logo: string; name: string; description: string };

const CLIENTS: Client[] = Array.from({ length: 9 }).map((_, i) => ({
  id: i + 1,
  logo: "/avatar.svg",
  name: `Client ${i + 1}`,
  description: "Description courte du client et du projet réalisé. Texte exemple pour démonstration. Cette phrase est volontairement un peu longue pour montrer l’ellipsis et le tooltip."
}));

function EllipsisTooltip({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [truncated, setTruncated] = useState(false);

  useEffect(() => {
    const check = () => {
      const el = ref.current;
      if (!el) return;
      setTruncated(el.scrollHeight > el.clientHeight + 1);
    };
    check();
    const ro = new ResizeObserver(check);
    if (ref.current) ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  const p = <p ref={ref} className="text-sm text-gray-300 line-clamp-3 cursor-help">{text}</p>;
  return truncated ? <Tooltip content={text}>{p}</Tooltip> : p;
}

export default function ClientsSection() {
  const [page, setPage] = useState(0);
  const { t } = useLang();
  const perPage = 3;
  const totalPages = Math.ceil(CLIENTS.length / perPage);
  const start = page * perPage;
  const slice = CLIENTS.slice(start, start + perPage);
  const progress = ((page + 1) / totalPages) * 100;

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="grid md:grid-cols-3 gap-6">
        {slice.map(c => (
          <motion.div key={c.id} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="rounded-2xl p-5 border border-line bg-black/40">
            <div className="flex items-center gap-3 mb-3">
              <img src={c.logo} alt="" className="w-10 h-10 rounded bg-dim p-1 border border-line" />
              <div className="font-medium">{c.name}</div>
            </div>
            <EllipsisTooltip text={c.description} />
          </motion.div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div className="w-full h-1.5 bg-dim rounded-full overflow-hidden border border-line">
          <div className="h-full bg-white transition-all" style={{ width: `${progress}%` }} aria-label="Progression" />
        </div>
        <div className="ml-4 flex gap-2">
          <button className="px-3 py-1.5 rounded-full border border-line text-sm disabled:opacity-40"
            onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0}>{t.clients.prev}</button>
          <button className="px-3 py-1.5 rounded-full border border-line text-sm disabled:opacity-40"
            onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))} disabled={page === totalPages - 1}>{t.clients.next}</button>
        </div>
      </div>
    </div>
  );
}
