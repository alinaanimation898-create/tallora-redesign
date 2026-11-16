import type { Metadata } from "next";
import { Cormorant_Garamond, Oswald, Manrope } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import VeraChatWidget from "@/components/VeraChatWidget";
import SizeCalculatorModal from "@/components/SizeCalculatorModal";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin", "cyrillic"],
  display: "swap",
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin", "cyrillic"],
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Tallora – обувь для высоких девушек (размеры 37–44)",
  description: "Стильная и удобная женская обувь 37–44 размера из натуральной кожи и замши. Туфли, лоферы, босоножки, балетки, сапоги. Доставка СДЭК по всей России.",
  keywords: "обувь больших размеров женская, туфли 42 43 44 размер, обувь для высоких девушек, TALLORA",
  openGraph: {
    title: "TALLORA – Женская обувь для высоких девушек",
    description: "Твой размер. Твоя пара. Твой момент. Обувь 37–44 из натуральной кожи для высоких девушек.",
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
    <html lang="ru" className={`${cormorant.variable} ${oswald.variable} ${manrope.variable}`}>
      <body className="min-h-screen flex flex-col bg-[#F3F3F3] text-[#2B2620]">
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
