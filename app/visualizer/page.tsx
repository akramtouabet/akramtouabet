"use client";

import { useState } from "react";
import { toast } from "sonner";

export default function VisualizerPage() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!code.trim()) {
      toast.error("Entre un code d’accès");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      const data = await res.json();

      if (res.ok && data.url) {
        toast.success("Accès autorisé ✅");
        window.location.href = data.url; // ✅ simple client redirect
      } else {
        toast.error(data.error || "Code invalide ❌");
      }
    } catch (err) {
      toast.error("Erreur réseau ⚠️");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center text-white px-4">
      <div className="backdrop-blur-md border border-white/10 p-10 rounded-2xl shadow-lg w-full max-w-md text-center space-y-6">
        <h1 className="text-3xl font-semibold">Voir ton projet</h1>
        <p className="text-gray-400 text-sm">
          Entre le code que je t’ai envoyé pour accéder à ton espace
        </p>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Code d'accès"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            disabled={loading}
            className="w-full px-4 py-2.5 rounded-md bg-neutral-800 text-white outline-none border border-white/10 focus:border-indigo-500 transition"
          />
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-2.5 rounded-md bg-indigo-600 hover:bg-indigo-700 transition font-medium disabled:opacity-50"
          >
            {loading ? "Vérification..." : "Valider"}
          </button>
        </div>
      </div>
    </div>
  );
}
