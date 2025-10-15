"use client";
import { useState } from "react";
import { toast } from "sonner";

export default function VisualizerPage() {
  const [code, setCode] = useState("");

  const handleSubmit = () => {
    if (code.trim() === "akramdev2025") {
      toast.success("Accès autorisé ✅");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] text-white px-4">
      <div className="bg-neutral-900/70 backdrop-blur-md border border-white/10 p-10 rounded-2xl shadow-lg w-full max-w-md text-center space-y-6">
        <h1 className="text-3xl font-semibold">Voir ton projet</h1>
        <p className="text-gray-400 text-sm">Entre le code que je t’ai envoyé pour accéder à ton espace</p>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Code d'accès"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full px-4 py-2.5 rounded-md bg-neutral-800 text-white outline-none border border-white/10 focus:border-indigo-500 transition"
          />
          <button
            onClick={handleSubmit}
            className="w-full py-2.5 rounded-md bg-indigo-600 hover:bg-indigo-700 transition font-medium"
          >
            Valider
          </button>
        </div>
      </div>
    </div>
  );
}
