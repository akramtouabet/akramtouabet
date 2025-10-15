export default async function sitemap() {
  const base = "https://akramtouabet.com";
  const urls = ["", "/legal/mentions-legales", "/legal/cgu-cgv", "/legal/cookies"];
  return urls.map((u) => ({
    url: base + u,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: u === "" ? 1 : 0.5
  }));
}
