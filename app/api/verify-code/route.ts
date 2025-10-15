import { NextRequest, NextResponse } from "next/server";
import { projects } from "@/data/projects";

export async function POST(req: NextRequest) {
  const { code } = await req.json();

  if (typeof code !== "string" || !code.trim()) {
    return NextResponse.json({ error: "Code manquant" }, { status: 404 });
  }

  const project = projects.find((p) => p.code === code.trim());

  if (!project) {
    // Petit délai anti-brute-force (optionnel)
    await new Promise((r) => setTimeout(r, 1000));
    return NextResponse.json({ error: "Code invalide" }, { status: 401 });
  }

  // ✅ Redirige vers le projet
  return NextResponse.json({ url: project.url }, { status: 200 });
}
