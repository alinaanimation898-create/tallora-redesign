import type { Metadata } from "next";
import { Oswald, Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import VeraChatWidget from "@/components/VeraChatWidget";
import PriveInvite from "@/components/PriveInvite";
import SizeCalculatorModal from "@/components/SizeCalculatorModal";

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin", "cyrillic"],
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Tallora - обувь для высоких девушек (размеры 37–44)",
  description: "Стильная и удобная женская обувь 37–44 размера из натуральной кожи и замши. Туфли, лоферы, босоножки, балетки, сапоги. Доставка СДЭК по всей России",
  keywords: "обувь больших размеров женская, туфли 42 43 44 размер, обувь для высоких девушек, TALLORA",
  openGraph: {
    title: "TALLORA - Женская обувь для высоких девушек",
    description: "Твой размер. Твоя пара. Твой момент. Обувь 37–44 из натуральной кожи для высоких девушек",
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
    <html lang="ru" className={`${oswald.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col bg-[#F3F3F3] text-[#2B2620]">
        <Providers>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
          <VeraChatWidget />
          <PriveInvite />
          <SizeCalculatorModal />
        </Providers>
      </body>
    </html>
  );
}
