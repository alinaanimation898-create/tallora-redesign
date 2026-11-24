"use client";

import React, { useMemo, useState, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { SlidersHorizontal, X, Ruler, ArrowRight } from "lucide-react";
import { PRODUCTS, CATEGORIES, SITE_PHOTOS } from "@/data/mockData";
import { ShoeSize } from "@/types";
import ProductCard from "@/components/ProductCard";
import { useShop } from "@/context/ShopContext";
import { asset } from "@/lib/asset";

const SIZES: ShoeSize[] = [37, 38, 39, 40, 41, 42, 43, 44];
const HEELS = [
  { id: "all", label: "Любой" },
  { id: "flat", label: "До 3 см" },
  { id: "medium", label: "4–7 см" },
  { id: "high", label: "От 8 см" },
];
const SORTS = [
  { id: "new", label: "Новинки" },
  { id: "price-asc", label: "По возрастанию цены" },
  { id: "price-desc", label: "По убыванию цены" },
  { id: "discount", label: "По величине скидки" },
];
const discountOf = (p: { price: number; oldPrice?: number }) => (p.oldPrice ? 1 - p.price / p.oldPrice : 0);

/** Tiled selector: thin shared borders, the active cell filled with emerald. */
const TILE_WRAP = "grid gap-px bg-[#2B2620]/10 border border-[#2B2620]/10 rounded-[18px] overflow-hidden";
const tile = (active: boolean) =>
  `h-12 flex items-center justify-center transition-colors cursor-pointer ${
    active ? "bg-[#20402D] text-white" : "bg-white text-[#2B2620] hover:bg-[#F5F0E8]"
  }`;

const countIn = (slug: string) => (slug === "all" ? PRODUCTS.length : PRODUCTS.filter((p) => p.categorySlug === slug).length);
const plural = (n: number) =>
  n % 10 === 1 && n % 100 !== 11 ? "модель" : [2, 3, 4].includes(n % 10) && ![12, 13, 14].includes(n % 100) ? "модели" : "моделей";

function Label({ children }: { children: React.ReactNode }) {
  return <span className="block text-[11px] uppercase tracking-[0.22em] text-[#2B2620]/45 mb-3">{children}</span>;
}

function CatalogContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { selectedSize, setSelectedSize, setIsSizeModalOpen, setIsVeraOpen } = useShop();

  // Category lives in the URL, so footer links, the header and the back button all stay in sync
  const activeCategory = searchParams.get("category") || "all";
  const [activeHeel, setActiveHeel] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("new");
  const [sheetOpen, setSheetOpen] = useState(false);

  const chooseCategory = (slug: string) => {
    router.replace(slug === "all" ? "/catalog" : `/catalog?category=${slug}`, { scroll: false });
  };

  const products = useMemo(() => {
    return PRODUCTS.filter((item) => {
      if (activeCategory !== "all" && item.categorySlug !== activeCategory) return false;
      if (selectedSize && !item.sizes.some((s) => s.size === selectedSize && s.inStock)) return false;
      const heel = parseFloat(item.heelHeight) || 0;
      if (activeHeel === "flat" && heel > 3) return false;
      if (activeHeel === "medium" && (heel <= 3 || heel > 7)) return false;
      if (activeHeel === "high" && heel <= 7) return false;
      return true;
    }).sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "discount") return discountOf(b) - discountOf(a) || PRODUCTS.indexOf(a) - PRODUCTS.indexOf(b);
      return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0) || PRODUCTS.indexOf(a) - PRODUCTS.indexOf(b);
    });
  }, [activeCategory, selectedSize, activeHeel, sortBy]);

  const title = activeCategory === "all" ? "Каталог" : CATEGORIES.find((c) => c.slug === activeCategory)?.name ?? "Каталог";
  const activeFilters = (selectedSize ? 1 : 0) + (activeHeel !== "all" ? 1 : 0);
  const showStory = activeCategory === "all" && !selectedSize && activeHeel === "all" && products.length > 8;

  const sizeGrid = (
    <div className={`${TILE_WRAP} grid-cols-4`}>
      {SIZES.map((sz) => (
        <button key={sz} onClick={() => setSelectedSize(selectedSize === sz ? null : sz)} className={`${tile(selectedSize === sz)} font-display text-[17px]`}>
          {sz}
        </button>
      ))}
    </div>
  );

  const heelPills = (
    <div className={`${TILE_WRAP} grid-cols-2`}>
      {HEELS.map((h) => (
        <button key={h.id} onClick={() => setActiveHeel(h.id)} className={`${tile(activeHeel === h.id)} text-[13px]`}>
          {h.label}
        </button>
      ))}
    </div>
  );

  const sortList = (
    <ul>
      {SORTS.map((o) => {
        const active = sortBy === o.id;
        return (
          <li key={o.id}>
            <button
              onClick={() => setSortBy(o.id)}
              className={`group w-full flex items-center gap-2.5 py-1.5 text-left text-[14px] cursor-pointer transition-colors ${active ? "text-[#20402D] font-medium" : "text-[#2B2620]/65 hover:text-[#2B2620]"}`}
            >
              <span className={`h-px transition-all ${active ? "w-5 bg-[#20402D]" : "w-0 bg-[#2B2620] group-hover:w-3"}`} />
              {o.label}
            </button>
          </li>
        );
      })}
    </ul>
  );

  return (
    <div className="min-h-screen bg-[#F3F3F3] pb-24">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8">
        {/* Heading */}
        <div className="pt-8 sm:pt-12 pb-6 sm:pb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <nav className="text-[12px] text-[#2B2620]/45 flex items-center gap-2">
              <Link href="/" className="hover:text-[#20402D]">Главная</Link>
              <span>/</span>
              <button onClick={() => chooseCategory("all")} className="hover:text-[#20402D] cursor-pointer">Каталог</button>
              {activeCategory !== "all" && (
                <>
                  <span>/</span>
                  <span className="text-[#2B2620]/70">{title}</span>
                </>
              )}
            </nav>
            <h1 className="mt-3 font-display uppercase text-[clamp(40px,5.5vw,80px)] leading-[1.02] tracking-[-0.01em] text-[#2B2620]">
              {title}
            </h1>
          </div>
          <p className="text-[14px] text-[#2B2620]/55 md:text-right max-w-xs">
            {products.length} {plural(products.length)} · размеры 37–44 · натуральная кожа и замша
          </p>
        </div>

        {/* Mobile: categories + filters button */}
        <div className="lg:hidden sticky top-[88px] sm:top-[96px] z-30 -mx-5 px-5 sm:-mx-8 sm:px-8 py-3 bg-[#F3F3F3]/92 backdrop-blur-md flex items-center gap-2">
          <div className="flex gap-1.5 overflow-x-auto no-scrollbar min-w-0">
            {CATEGORIES.map((c) => (
              <button
                key={c.slug}
                onClick={() => chooseCategory(c.slug)}
                className={`shrink-0 h-9 px-4 rounded-full text-[13px] border cursor-pointer ${
                  activeCategory === c.slug ? "bg-[#2B2620] border-[#2B2620] text-white" : "bg-white border-[#2B2620]/10 text-[#2B2620]"
                }`}
              >
                {c.slug === "all" ? "Все" : c.name}
              </button>
            ))}
          </div>
          <button onClick={() => setSheetOpen(true)} className="shrink-0 h-9 px-3.5 rounded-full bg-[#20402D] text-white text-[13px] flex items-center gap-1.5 cursor-pointer">
            <SlidersHorizontal size={14} />
            {activeFilters > 0 ? activeFilters : "Фильтр"}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] xl:grid-cols-[270px_1fr] gap-10 xl:gap-14">
          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div className="space-y-9 pb-10">
              <div>
                <Label>Категории</Label>
                <ul className="space-y-0.5">
                  {CATEGORIES.map((c) => {
                    const active = activeCategory === c.slug;
                    return (
                      <li key={c.slug}>
                        <button
                          onClick={() => chooseCategory(c.slug)}
                          className={`group w-full flex items-center justify-between py-1.5 text-left cursor-pointer transition-colors ${
                            active ? "text-[#20402D]" : "text-[#2B2620]/70 hover:text-[#2B2620]"
                          }`}
                        >
                          <span className="font-display uppercase text-[19px] tracking-[0.02em] flex items-center gap-2.5">
                            <span className={`h-px transition-all ${active ? "w-5 bg-[#20402D]" : "w-0 bg-[#2B2620] group-hover:w-3"}`} />
                            {c.slug === "all" ? "Все модели" : c.name}
                          </span>
                          <span className="text-[12px] text-[#2B2620]/35">{countIn(c.slug)}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div>
                <div className="flex items-baseline justify-between">
                  <Label>Мой размер</Label>
                  {selectedSize && (
                    <button onClick={() => setSelectedSize(null)} className="text-[12px] text-[#20402D] hover:underline cursor-pointer">
                      сбросить
                    </button>
                  )}
                </div>
                {sizeGrid}
                <button onClick={() => setIsSizeModalOpen(true)} className="mt-3 flex items-center gap-1.5 text-[13px] text-[#20402D] hover:underline cursor-pointer">
                  <Ruler size={14} /> Подобрать размер в см
                </button>
              </div>

              <div>
                <Label>Каблук</Label>
                {heelPills}
              </div>

              <div>
                <Label>Сортировка</Label>
                {sortList}
              </div>

              <button
                onClick={() => setIsVeraOpen(true)}
                className="w-full rounded-[22px] bg-[#20402D] text-white p-5 text-left flex items-center gap-4 cursor-pointer hover:bg-[#183326] transition-colors"
              >
                <span className="relative w-14 h-14 rounded-full overflow-hidden shrink-0 ring-2 ring-white/20">
                  <Image src={asset("/tallora/vera.webp")} alt="Стилист Вера" fill sizes="56px" className="object-cover" />
                </span>
                <span>
                  <span className="block font-display uppercase text-[18px] leading-tight">Помощь стилиста</span>
                  <span className="block text-[12px] text-white/70 mt-1 leading-snug">Вера подберёт пару под размер и образ</span>
                </span>
              </button>
            </div>
          </aside>

          {/* Products */}
          <div className="min-w-0">
            {activeFilters > 0 && (
              <div className="mb-6 flex flex-wrap items-center gap-2">
                {selectedSize && (
                  <button onClick={() => setSelectedSize(null)} className="h-9 pl-4 pr-3 rounded-full bg-white border border-[#2B2620]/10 text-[13px] flex items-center gap-2 cursor-pointer">
                    {selectedSize} размер в наличии <X size={13} />
                  </button>
                )}
                {activeHeel !== "all" && (
                  <button onClick={() => setActiveHeel("all")} className="h-9 pl-4 pr-3 rounded-full bg-white border border-[#2B2620]/10 text-[13px] flex items-center gap-2 cursor-pointer">
                    Каблук {HEELS.find((h) => h.id === activeHeel)?.label.toLowerCase()} <X size={13} />
                  </button>
                )}
              </div>
            )}

            {products.length === 0 ? (
              <div className="text-center py-24 bg-white rounded-[28px] space-y-4">
                <p className="font-display uppercase text-3xl text-[#2B2620]">В этом размере пока пусто</p>
                <p className="text-sm text-[#2B2620]/60 max-w-md mx-auto">Сбрось фильтры или спроси стилиста, когда придёт новая партия</p>
                <div className="pt-2 flex flex-wrap justify-center gap-3">
                  <button
                    onClick={() => {
                      setSelectedSize(null);
                      setActiveHeel("all");
                    }}
                    className="h-12 px-6 rounded-full bg-[#20402D] text-white text-[12px] uppercase tracking-[0.18em] cursor-pointer"
                  >
                    Показать всё
                  </button>
                  <button onClick={() => setIsVeraOpen(true)} className="h-12 px-6 rounded-full border border-[#20402D] text-[#20402D] text-[12px] uppercase tracking-[0.18em] cursor-pointer">
                    Помощь стилиста
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 xl:grid-cols-3 gap-x-4 sm:gap-x-10 gap-y-12 sm:gap-y-16">
                {products.map((product, i) => (
                  <React.Fragment key={product.id}>
                    {showStory && i === 5 && (
                      <Link href="/catalog?category=tufli" className="group relative col-span-2 xl:col-span-1 rounded-[22px] overflow-hidden bg-[#2B2620] min-h-[340px] flex">
                        <Image src={SITE_PHOTOS.walk} alt="Туфли Tallora" fill sizes="(max-width: 1280px) 100vw, 33vw" className="object-cover object-[50%_60%] transition-transform duration-[1.2s] group-hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#2B2620]/85 via-[#2B2620]/10 to-transparent" />
                        <div className="relative mt-auto p-6 text-white">
                          <span className="text-[11px] uppercase tracking-[0.22em] text-white/70">На шпильке · 37–44</span>
                          <span className="mt-2 block font-display uppercase text-[34px] leading-[1.05]">
                            Время <span className="text-accent-light">выделяться</span>
                          </span>
                          <span className="mt-4 inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.18em]">
                            Смотреть туфли <ArrowRight size={14} />
                          </span>
                        </div>
                      </Link>
                    )}
                    <ProductCard product={product} />
                  </React.Fragment>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter sheet */}
      {sheetOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex items-end bg-[#2B2620]/40 backdrop-blur-sm animate-fadeIn" onClick={() => setSheetOpen(false)}>
          <div className="w-full bg-[#F3F3F3] rounded-t-[28px] p-6 pb-8 max-h-[85vh] overflow-y-auto space-y-7" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <span className="font-display uppercase text-2xl">Фильтры</span>
              <button onClick={() => setSheetOpen(false)} aria-label="Закрыть" className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                <X size={18} />
              </button>
            </div>
            <div>
              <Label>Мой размер</Label>
              {sizeGrid}
              <button
                onClick={() => {
                  setSheetOpen(false);
                  setIsSizeModalOpen(true);
                }}
                className="mt-3 flex items-center gap-1.5 text-[13px] text-[#20402D]"
              >
                <Ruler size={14} /> Подобрать размер в см
              </button>
            </div>
            <div>
              <Label>Каблук</Label>
              {heelPills}
            </div>
            <div>
              <Label>Сортировка</Label>
              {sortList}
            </div>
            <button onClick={() => setSheetOpen(false)} className="w-full py-4 rounded-full bg-[#20402D] text-white text-[12px] uppercase tracking-[0.18em] font-semibold">
              Показать {products.length} {plural(products.length)}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CatalogPage() {
  return (
    <Suspense fallback={<div className="min-h-screen p-12 text-center font-display">Загрузка каталога…</div>}>
      <CatalogContent />
    </Suspense>
  );
}
