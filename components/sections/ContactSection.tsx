"use client";
import { useState } from "react";
import { toast } from "sonner";
import { useLang } from "../LanguageProvider";

export default function ContactSection() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const { t } = useLang();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData as unknown as Iterable<[string, FormDataEntryValue]>);
    setLoading(true);
    setSent(false);
    try {
      const endpoint = "https://formspree.io/f/your-form-id";
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      if (res.ok) {
        setSent(true);
        toast.success(t.contact.sent);
        form.reset();
      } else {
        toast.error("Error", { description: "Retry shortly." });
      }
    } catch {
      toast.error("Network error");
    } finally {
      setLoading(false);
    }
  }

  const inputClass = "w-full rounded-lg bg-black/30 border border-white/10 px-4 py-3 outline-none focus:border-white/30 placeholder:text-gray-500";
  const btnClass = "mt-2 inline-flex items-center justify-center px-5 py-2.5 rounded-full border border-white/20 hover:border-white/40 disabled:opacity-50";

  return (
    <div className="w-full max-w-xl mx-auto">
      <form onSubmit={onSubmit} className="grid gap-4">
        <div className="grid gap-2">
          <label htmlFor="name" className="text-sm text-gray-300">{t.contact.name}</label>
          <input id="name" name="name" required placeholder="..." className={inputClass} />
        </div>
        <div className="grid gap-2">
          <label htmlFor="email" className="text-sm text-gray-300">{t.contact.email}</label>
          <input id="email" type="email" name="email" required placeholder="..." className={inputClass} />
        </div>
        <div className="grid gap-2">
          <label htmlFor="message" className="text-sm text-gray-300">{t.contact.message}</label>
          <textarea id="message" name="message" required rows={5} placeholder="..." className={inputClass} />
        </div>
        <button disabled={loading} className={btnClass}>
          {loading ? t.contact.sending : (sent ? t.contact.sent : t.contact.send)}
        </button>
      </form>
    </div>
  );
}
