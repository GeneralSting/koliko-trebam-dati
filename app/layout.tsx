import type { Metadata } from "next";
import { Schibsted_Grotesk, Hanken_Grotesk } from "next/font/google";
import "./globals.css";

const schibsted = Schibsted_Grotesk({
  subsets: ["latin", "latin-ext"],
  variable: "--font-schibsted",
  display: "swap",
});

const hanken = Hanken_Grotesk({
  subsets: ["latin", "latin-ext"],
  variable: "--font-hanken",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Koliko Trebam Dati? — Kalkulator darivanja",
  description:
    "Brzo saznajte preporučeni iznos novčanog poklona ovisno o prigodi i vašem odnosu s primateljem.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hr" className={`${schibsted.variable} ${hanken.variable}`}>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
