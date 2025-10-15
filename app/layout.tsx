import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LanguageProvider from "@/components/LanguageProvider";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL("https://akramtouabet.com"),
  title: "Akram Touabet — Développeur Web à Paris",
  description: "Des expériences web minimalistes, rapides et élégantes.",
  openGraph: {
    title: "Akram Touabet — Web Developer / Développeur Web à Paris",
    description: "Minimal, fast and elegant web experiences.",
    url: "https://akramtouabet.com",
    siteName: "Akram Touabet",
    images: ["/og.png"],
    locale: "fr_FR",
    type: "website"
  },
  icons: [{ rel: "icon", url: "/favicon.ico" }]
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="dark">
      <body className={`${inter.variable} bg-background text-foreground antialiased`}>
        <LanguageProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <Toaster theme="dark" position="top-right" richColors />
          <script type="application/ld+json" suppressHydrationWarning
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Person",
                name: "Akram Touabet",
                jobTitle: "Web Developer",
                url: "https://akramtouabet.com",
                address: { "@type":"PostalAddress", addressLocality:"Paris", addressCountry:"FR" }
              })
            }}
          />
        </LanguageProvider>
      </body>
    </html>
  );
}
