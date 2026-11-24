"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, ArrowUpRight, Ruler } from "lucide-react";
import { LOOKBOOK_ITEMS, PRODUCTS } from "@/data/mockData";
import { useShop } from "@/context/ShopContext";
import Reveal from "@/components/Reveal";
import { ShoeSize } from "@/types";

const SIZES: ShoeSize[] = [37, 38, 39, 40, 41, 42, 43, 44];

export default function LookbookPage() {
  const router = useRouter();
  const { setSelectedSize, setIsSizeModalOpen } = useShop();
  const total = String(LOOKBOOK_ITEMS.length).padStart(2, "0");

  const pick = (sz: ShoeSize) => {
    setSelectedSize(sz);
    router.push("/catalog");
  };

  return (
    <div className="bg-[#F3F3F3] text-[#2B2620] min-h-screen">
      {/* Title */}
      <section className="max-w-[1400px] mx-auto px-5 sm:px-8 pt-12 sm:pt-20 pb-12 sm:pb-20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
        <div className="lg:col-span-8">
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#2B2620]/50">Образы Tallora · 37–44</span>
          <h1 className="mt-4 font-display uppercase text-[clamp(72px,14vw,220px)] leading-[0.95] tracking-[-0.02em]">
            Look<span className="text-accent">book</span>
          </h1>
        </div>
        <p className="lg:col-span-4 text-[16px] text-[#2B2620]/65 leading-relaxed max-w-sm">
          Наши героини – высокие, смелые и очень разные. Смотри, как они носят Tallora, и забирай пару, которая
          собирает образ
        </p>
      </section>

      {/* Looks */}
      <section className="max-w-[1400px] mx-auto px-5 sm:px-8 space-y-16 sm:space-y-28 pb-20 sm:pb-28">
        {LOOKBOOK_ITEMS.map((item, i) => {
          const product = PRODUCTS.find((p) => p.id === item.featuredProductId) ?? PRODUCTS[0];
          const flip = i % 2 === 1;
          return (
            <Reveal key={item.id} className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-end">
              <Link
                href={`/catalog/${product.slug}`}
                className={`group relative block overflow-hidden rounded-[28px] bg-[#E8E8E8] aspect-[4/5] lg:col-span-7 ${flip ? "lg:order-2" : ""}`}
              >
                <Image
                  src={item.imageUrl}
                  alt={`Образ с парой ${product.name}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover transition-transform duration-[1.6s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                />
              </Link>

              <div className={`lg:col-span-5 ${flip ? "lg:order-1" : ""}`}>
                <span className="font-display text-[clamp(64px,8vw,120px)] leading-none text-[#2B2620]/10">
                  {String(i + 1).padStart(2, "0")}
                  <span className="text-[0.35em] align-top ml-1">/ {total}</span>
                </span>
                <span className="mt-6 block text-[11px] uppercase tracking-[0.22em] text-[#2B2620]/50">В образе</span>
                <Link
                  href={`/catalog/${product.slug}`}
                  className="group mt-3 flex items-center gap-4 rounded-[24px] bg-white p-3 pr-4 hover:shadow-[0_20px_40px_-28px_rgba(43,38,32,0.5)] transition-shadow"
                >
                  <span className="relative w-24 h-28 shrink-0 rounded-[18px] overflow-hidden bg-[#F3F3F3]">
                    <Image src={product.images[0]} alt={product.name} fill sizes="96px" className="object-cover" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[11px] uppercase tracking-[0.18em] text-[#2B2620]/50 truncate first-letter:uppercase">
                      {product.typeLabel} · {product.color}
                    </span>
                    <span className="mt-1 block font-display uppercase text-[26px] leading-none">{product.model || product.typeLabel}</span>
                    <span className="mt-2 block font-display text-[18px] text-[#20402D]">{product.price.toLocaleString("ru-RU")} ₽</span>
                  </span>
                  <span className="w-11 h-11 shrink-0 rounded-full bg-[#20402D] text-white flex items-center justify-center group-hover:rotate-[-45deg] transition-transform duration-500">
                    <ArrowUpRight size={18} />
                  </span>
                </Link>
              </div>
            </Reveal>
          );
        })}
      </section>

      {/* Repeat the look */}
      <section className="bg-[#20402D] text-white">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 py-16 sm:py-24 grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-6">
            <span className="text-[11px] uppercase tracking-[0.3em] text-white/60">Понравился образ?</span>
            <h2 className="mt-4 font-display uppercase text-[clamp(48px,7vw,112px)] leading-[1.02] tracking-[-0.01em]">
              Повтори <span className="text-accent-light">его</span>
            </h2>
            <p className="mt-5 text-[16px] text-white/70 max-w-md leading-relaxed">
              Выбери свой размер – покажем только те пары, которые есть в наличии именно в нём
            </p>
          </div>
          <div className="lg:col-span-6">
            <div className="grid grid-cols-4 gap-2 sm:gap-3">
              {SIZES.map((sz) => (
                <button
                  key={sz}
                  onClick={() => pick(sz)}
                  className="h-16 sm:h-20 rounded-[20px] border border-white/20 hover:bg-white hover:text-[#20402D] font-display text-[26px] sm:text-[32px] transition-colors cursor-pointer"
                >
                  {sz}
                </button>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
              <button onClick={() => setIsSizeModalOpen(true)} className="flex items-center gap-2 text-[13px] text-white/80 hover:text-white cursor-pointer">
                <Ruler size={15} /> Подобрать размер в сантиметрах
              </button>
              <Link href="/catalog" className="flex items-center gap-2 text-[13px] text-white/80 hover:text-white">
                Весь каталог <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
