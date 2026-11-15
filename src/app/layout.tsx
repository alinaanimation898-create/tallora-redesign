import type { Metadata } from "next";
import { Bodoni_Moda, Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import VeraChatWidget from "@/components/VeraChatWidget";
import SizeCalculatorModal from "@/components/SizeCalculatorModal";

const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "TALLORA — Женская обувь для высоких девушек (размеры 39–44)",
  description: "Ты выше. Твоя обувь тоже. Премиальная женская обувь больших размеров 39-44 с идеальной колодкой и сексуальным силуэтом. Бесплатный обмен, доставка по РФ.",
  keywords: "обувь больших размеров женская, туфли 42 43 44 размер, обувь для высоких девушек, TALLORA",
  openGraph: {
    title: "TALLORA — Женская обувь для высоких девушек",
    description: "43 — это не размер. Это характер. Коллекция обуви 39-44.",
    type: "website",
    locale: "ru_RU",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${bodoni.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col bg-[#F4EFE8] text-[#0E0E0E] selection:bg-[#6B0F1A] selection:text-[#F4EFE8]">
        <Providers>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
          <VeraChatWidget />
          <SizeCalculatorModal />
        </Providers>
      </body>
    </html>
  );
}
