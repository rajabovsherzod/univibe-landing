import type { Metadata } from "next";
import { Bricolage_Grotesque, Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import { Header } from "@/components/header";
import { Footer } from "@/components/sections";
import { LanguageProvider } from "@/lib/i18n";
import "./globals.css";

const display = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const sans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

const mono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://univibe.uz"),
  title: {
    default: "Univibe — Universiteting bitta ilovada",
    template: "%s | Univibe",
  },
  description:
    "Tadbirlar, QR-davomat, ball to'plash, reyting va do'kon — universitet talabalar hayotini bitta chiroyli platformada birlashtiramiz.",
  keywords: [
    "Univibe", "universitet", "talabalar platformasi", "tadbirlar", "QR davomat",
    "reyting", "ballar", "student engagement", "university", "campus", "Uzbekistan",
  ],
  authors: [{ name: "Univibe" }],
  creator: "Univibe",
  applicationName: "Univibe",
  icons: { icon: "/icon.svg", shortcut: "/icon.svg", apple: "/icon.svg" },
  openGraph: {
    type: "website",
    locale: "uz_UZ",
    url: "https://univibe.uz",
    siteName: "Univibe",
    title: "Univibe — Universiteting bitta ilovada",
    description:
      "Tadbirlar, QR-davomat, ball to'plash, reyting va do'kon — talabalar hayoti bitta chiroyli platformada.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Univibe — Universiteting bitta ilovada",
    description: "Universitet talabalar hayoti bitta chiroyli platformada.",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://univibe.uz" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="uz"
      className={`${display.variable} ${sans.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#f7fafd] text-[#0a2540]">
        <LanguageProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
