"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Filter, X, Ruler, Sparkles } from "lucide-react";
import { PRODUCTS, CATEGORIES } from "@/data/mockData";
import { ShoeSize } from "@/types";
import ProductCard from "@/components/ProductCard";
import { useShop } from "@/context/ShopContext";

function CatalogContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";
  const initialSizeParam = searchParams.get("size");

  const { selectedSize, setSelectedSize, setIsSizeModalOpen, setIsVeraOpen } = useShop();

  const [activeCategory, setActiveCategory] = useState<string>(initialCategory);
  const [activeHeel, setActiveHeel] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("popular");
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);

  const sizes: ShoeSize[] = [37, 38, 39, 40, 41, 42, 43, 44];

  // Filter & sort logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      // Category filter
      if (activeCategory !== "all" && item.categorySlug !== activeCategory) {
        return false;
      }
      // Persistent Size filter
      if (selectedSize) {
        const hasSize = item.sizes.some((s) => s.size === selectedSize && s.inStock);
        if (!hasSize) return false;
      }
      // Heel height filter
      const heel = parseFloat(item.heelHeight) || 0;
      if (activeHeel === "flat" && heel > 3) return false;
      if (activeHeel === "medium" && (heel <= 3 || heel > 7)) return false;
      if (activeHeel === "high" && heel <= 7) return false;
      return true;
    }).sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "new") return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      return PRODUCTS.indexOf(a) - PRODUCTS.indexOf(b);
    });
  }, [activeCategory, selectedSize, activeHeel, sortBy]);

  const countIn = (slug: string) => (slug === "all" ? PRODUCTS.length : PRODUCTS.filter((p) => p.categorySlug === slug).length);
  const catName = CATEGORIES.find((c) => c.slug === activeCategory)?.name ?? "Каталог";
  const heelOptions = [
    { id: "all", label: "Любой каблук" },
    { id: "flat", label: "До 3 см" },
    { id: "medium", label: "4–7 см" },
    { id: "high", label: "От 8 см" },
  ];
  const sortOptions = [
    { id: "popular", label: "Как в магазине" },
    { id: "new", label: "Сначала новинки" },
    { id: "price-asc", label: "Сначала доступные" },
    { id: "price-desc", label: "Сначала дорогие" },
  ];
  const pill = (active: boolean) =>
    `h-9 px-4 rounded-full text-[12px] border transition-colors whitespace-nowrap cursor-pointer ${
      active ? "bg-[#20402D] border-[#20402D] text-white" : "bg-white border-[#2B2620]/12 text-[#2B2620] hover:border-[#2B2620]/40"
    }`;

  return (
    <div className="min-h-screen bg-[#F3F3F3] pb-24">
      {/* Title */}
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 pt-10 sm:pt-14">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5">
          <div>
            <span className="text-[11px] uppercase tracking-[0.3em] text-[#2B2620]/50">Tallora · размеры 37–44</span>
            <h1 className="mt-3 font-display uppercase text-[clamp(48px,8vw,120px)] leading-[0.85] tracking-[-0.02em] text-[#2B2620]">
              {activeCategory === "all" ? "Каталог" : catName}
              <sup className="ml-2 align-top text-[0.22em] tracking-normal text-[#20402D]">{filteredProducts.length}</sup>
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setIsSizeModalOpen(true)} className="h-11 px-5 rounded-full bg-white border border-[#2B2620]/12 hover:border-[#20402D] text-[12px] flex items-center gap-2 cursor-pointer">
              <Ruler size={14} className="text-[#20402D]" /> Подобрать размер
            </button>
            <button onClick={() => setIsVeraOpen(true)} className="h-11 px-5 rounded-full bg-white border border-[#2B2620]/12 hover:border-[#20402D] text-[12px] flex items-center gap-2 cursor-pointer">
              <Sparkles size={14} className="text-[#20402D]" /> Помощь стилиста
            </button>
          </div>
        </div>

        {/* Category tabs */}
        <nav className="mt-8 sm:mt-10 -mx-5 px-5 sm:mx-0 sm:px-0 flex gap-6 sm:gap-8 overflow-x-auto no-scrollbar border-b border-[#2B2620]/10">
          {CATEGORIES.map((cat) => {
            const active = activeCategory === cat.slug;
            return (
              <button
                key={cat.slug}
                onClick={() => setActiveCategory(cat.slug)}
                className={`relative shrink-0 pb-3 text-[12px] sm:text-[13px] uppercase tracking-[0.14em] transition-colors cursor-pointer ${
                  active ? "text-[#2B2620]" : "text-[#2B2620]/45 hover:text-[#2B2620]"
                }`}
              >
                {cat.slug === "all" ? "Все" : cat.name}
                <span className={`ml-1 text-[10px] ${active ? "text-[#20402D]" : "text-[#2B2620]/35"}`}>{countIn(cat.slug)}</span>
                {active && <span className="absolute left-0 right-0 -bottom-px h-[2px] bg-[#20402D]" />}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Sticky toolbar */}
      <div className="sticky top-[88px] sm:top-[96px] z-30 bg-[#F3F3F3]/90 backdrop-blur-md">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar min-w-0 -ml-1 pl-1 py-0.5">
            <span className="hidden sm:inline text-[11px] uppercase tracking-[0.18em] text-[#2B2620]/50 mr-2 shrink-0">Мой размер</span>
            <button onClick={() => setSelectedSize(null)} className={`${pill(selectedSize === null)} shrink-0`}>Все</button>
            {sizes.map((sz) => (
              <button
                key={sz}
                onClick={() => setSelectedSize(selectedSize === sz ? null : sz)}
                className={`shrink-0 w-9 h-9 rounded-full font-display text-[14px] border transition-colors flex items-center justify-center cursor-pointer ${
                  selectedSize === sz ? "bg-[#20402D] border-[#20402D] text-white" : "bg-white border-[#2B2620]/12 text-[#2B2620] hover:border-[#2B2620]/40"
                }`}
              >
                {sz}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-2 shrink-0">
            <select value={activeHeel} onChange={(e) => setActiveHeel(e.target.value)} className="h-9 pl-4 pr-8 rounded-full bg-white border border-[#2B2620]/12 text-[12px] text-[#2B2620] focus:outline-none focus:border-[#20402D] cursor-pointer">
              {heelOptions.map((o) => <option key={o.id} value={o.id}>{o.label}</option>)}
            </select>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="h-9 pl-4 pr-8 rounded-full bg-white border border-[#2B2620]/12 text-[12px] text-[#2B2620] focus:outline-none focus:border-[#20402D] cursor-pointer">
              {sortOptions.map((o) => <option key={o.id} value={o.id}>{o.label}</option>)}
            </select>
          </div>
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="md:hidden shrink-0 h-9 px-3.5 rounded-full flex items-center gap-1.5 border border-[#2B2620]/12 bg-white text-[12px] text-[#2B2620]"
            aria-label="Фильтры"
          >
            <Filter size={14} /> Фильтры
          </button>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
        {/* Mobile filters */}
        {mobileFilterOpen && (
          <div className="md:hidden bg-white p-5 my-3 rounded-[22px] border border-[#2B2620]/8 space-y-5 animate-fadeIn">
            <div className="flex justify-between items-center">
              <span className="text-[11px] uppercase tracking-[0.2em] font-semibold">Фильтры</span>
              <button onClick={() => setMobileFilterOpen(false)} aria-label="Закрыть"><X size={18} /></button>
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-[0.16em] text-[#2B2620]/50 block mb-2">Каблук</span>
              <div className="flex flex-wrap gap-2">
                {heelOptions.map((h) => (
                  <button key={h.id} onClick={() => setActiveHeel(h.id)} className={pill(activeHeel === h.id)}>{h.label}</button>
                ))}
              </div>
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-[0.16em] text-[#2B2620]/50 block mb-2">Сортировка</span>
              <div className="flex flex-wrap gap-2">
                {sortOptions.map((o) => (
                  <button key={o.id} onClick={() => setSortBy(o.id)} className={pill(sortBy === o.id)}>{o.label}</button>
                ))}
              </div>
            </div>
            <button onClick={() => setMobileFilterOpen(false)} className="w-full h-12 rounded-full bg-[#20402D] text-white text-[12px] uppercase tracking-[0.18em] font-semibold">
              Показать {filteredProducts.length} моделей
            </button>
          </div>
        )}

        {selectedSize && (
          <div className="pt-2 pb-1 flex items-center gap-2 text-[12px] text-[#2B2620]/60">
            Показываем пары в наличии в {selectedSize} размере
            <button onClick={() => setSelectedSize(null)} className="text-[#20402D] hover:underline flex items-center gap-1 cursor-pointer">
              сбросить <X size={12} />
            </button>
          </div>
        )}

        {/* Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-24 mt-6 bg-white rounded-[28px] space-y-4">
            <p className="font-display uppercase text-3xl text-[#2B2620]">В этом размере пока пусто</p>
            <p className="text-sm text-[#2B2620]/60 max-w-md mx-auto">
              Сбрось фильтр или спроси стилиста Веру, когда придёт новая партия
            </p>
            <div className="pt-2 flex flex-wrap justify-center gap-3">
              <button onClick={() => setSelectedSize(null)} className="h-12 px-6 rounded-full bg-[#20402D] text-white text-[12px] uppercase tracking-[0.18em]">
                Показать все размеры
              </button>
              <button onClick={() => setIsVeraOpen(true)} className="h-12 px-6 rounded-full border border-[#20402D] text-[#20402D] text-[12px] uppercase tracking-[0.18em]">
                Спросить стилиста Веру
              </button>
            </div>
          </div>
        ) : (
          <div className="pt-4 sm:pt-6 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-3 sm:gap-x-6 gap-y-10 sm:gap-y-14">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function CatalogPage() {
  return (
    <Suspense fallback={<div className="min-h-screen p-12 text-center font-display">Загрузка каталога TALLORA...</div>}>
      <CatalogContent />
    </Suspense>
  );
}
