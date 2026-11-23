"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Filter, SlidersHorizontal, X, Ruler, Sparkles, Check } from "lucide-react";
import { PRODUCTS, CATEGORIES } from "@/data/mockData";
import { ShoeSize, Product } from "@/types";
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

  return (
    <div className="min-h-screen bg-[#F3F3F3] pb-24">
      {/* Editorial Title Banner */}
      <div className="bg-[#F5F0E8] text-[#2B2620] py-10 sm:py-14 px-5 sm:px-6 lg:px-8 border-b border-[#E2E2E2]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#20402D] block mb-2 font-medium">
              Размеры 37 - 44
            </span>
            <h1 className="font-serif text-[44px] leading-[0.95] sm:text-7xl font-light tracking-[-0.01em] text-[#2B2620]">
              Выбирай <span className="text-[#20402D]">смело</span>
            </h1>
            <p className="mt-3 text-sm text-[#2B2620]/65 max-w-md">Все модели - от 37 до 44. Отметь свой размер, и мы покажем только твои пары</p>
          </div>

          <div className="flex items-center gap-4 text-xs text-[#2B2620]/70">
            <button
              onClick={() => setIsSizeModalOpen(true)}
              className="flex items-center gap-1.5 text-[#20402D] hover:underline"
            >
              <Ruler size={14} />
              <span>Калькулятор стопы (см)</span>
            </button>
            <span className="opacity-40">|</span>
            <button
              onClick={() => setIsVeraOpen(true)}
              className="flex items-center gap-1.5 text-[#2B2620] hover:text-[#20402D]"
            >
              <Sparkles size={14} className="text-[#20402D]" />
              <span>Спросить стилиста Веру</span>
            </button>
          </div>
        </div>
      </div>

      {/* STICKY TOP SIZE BAR */}
      <div className="sticky top-[88px] sm:top-[96px] z-30 bg-[#FFFFFF]/95 backdrop-blur-md border-b border-[#E2E2E2] py-3 px-4 sm:px-6 lg:px-8 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-0.5 min-w-0 -ml-1 pl-1">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-[#2B2620] shrink-0 mr-1 flex items-center gap-1">
              <Ruler size={13} className="text-[#20402D]" />
              <span className="hidden sm:inline">Размер:</span>
            </span>

            <button
              onClick={() => setSelectedSize(null)}
              className={`px-3.5 h-8 rounded-full text-[11px] uppercase tracking-wider transition-all border shrink-0 ${
                selectedSize === null
                  ? "bg-[#20402D] text-white border-[#20402D]"
                  : "bg-white text-white border-[#E2E2E2] hover:border-[#2B2620]"
              }`}
            >
              Все
            </button>

            {sizes.map((sz) => (
              <button
                key={sz}
                onClick={() => setSelectedSize(selectedSize === sz ? null : sz)}
                className={`w-9 h-8 rounded-full font-display text-sm transition-all border shrink-0 flex items-center justify-center ${
                  selectedSize === sz
                    ? "bg-[#20402D] text-white border-[#20402D] font-bold shadow-xs"
                    : "bg-white text-white border-[#E2E2E2] hover:border-[#2B2620]"
                }`}
              >
                {sz}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {selectedSize && (
              <span className="hidden md:inline text-[11px] text-[#20402D] font-medium bg-[#20402D]/10 px-2.5 py-1">
                Показываем только наличие в р. {selectedSize}
              </span>
            )}
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="md:hidden shrink-0 w-9 h-9 rounded-full flex items-center justify-center border border-[#E2E2E2] bg-white text-[#2B2620]"
              aria-label="Фильтры"
            >
              <Filter size={15} />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Category Pills & Sort Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#E2E2E2]">
          {/* Categories */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setActiveCategory(cat.slug)}
                className={`px-3.5 py-1.5 text-xs uppercase tracking-wider whitespace-nowrap transition-all border ${
                  activeCategory === cat.slug
                    ? "bg-[#20402D] text-white border-[#20402D]"
                    : "bg-[#FFFFFF] text-[#2B2620]/80 border-[#E2E2E2] hover:border-[#2B2620]"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Heel Height & Sort Controls */}
          <div className="hidden md:flex items-center gap-4 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-[#2B2620]/60 uppercase tracking-wider text-[10px]">
                Каблук:
              </span>
              <select
                value={activeHeel}
                onChange={(e) => setActiveHeel(e.target.value)}
                className="bg-white border border-[#E2E2E2] px-2.5 py-1 text-xs text-[#2B2620] focus:outline-none rounded-xl"
              >
                <option value="all">Любой каблук</option>
                <option value="flat">Без каблука (до 3 см)</option>
                <option value="medium">Средний (4–7 см)</option>
                <option value="high">Высокий (от 8 см)</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[#2B2620]/60 uppercase tracking-wider text-[10px]">
                Сортировка:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-[#E2E2E2] px-2.5 py-1 text-xs text-[#2B2620] focus:outline-none rounded-xl"
              >
                <option value="popular">Как в магазине</option>
                <option value="new">Сначала новинки</option>
                <option value="price-asc">Сначала доступные</option>
                <option value="price-desc">Сначала премиальные</option>
              </select>
            </div>
          </div>
        </div>

        {/* Mobile Filter Drawer */}
        {mobileFilterOpen && (
          <div className="md:hidden bg-white p-5 border border-[#E2E2E2] my-4 shadow-lg space-y-4 animate-fadeIn rounded-2xl">
            <div className="flex justify-between items-center pb-2 border-b border-[#E2E2E2]">
              <span className="text-xs uppercase tracking-wider font-semibold">Фильтры</span>
              <button onClick={() => setMobileFilterOpen(false)}><X size={18} /></button>
            </div>

            <div>
              <span className="text-xs font-medium block mb-2">Высота каблука:</span>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: "all", label: "Любой" },
                  { id: "flat", label: "До 3 см" },
                  { id: "medium", label: "4–7 см" },
                  { id: "high", label: "От 8 см" },
                ].map((h) => (
                  <button
                    key={h.id}
                    onClick={() => setActiveHeel(h.id)}
                    className={`py-1.5 px-2 text-xs border ${
                      activeHeel === h.id ? "bg-[#20402D] text-white" : "border-[#E2E2E2]"
                    }`}
                  >
                    {h.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className="text-xs font-medium block mb-2">Сортировка:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full bg-[#FFFFFF] border border-[#E2E2E2] p-2 text-xs rounded-2xl"
              >
                <option value="popular">Как в магазине</option>
                <option value="new">Сначала новинки</option>
                <option value="price-asc">По возрастанию цены</option>
                <option value="price-desc">По убыванию цены</option>
              </select>
            </div>

            <button
              onClick={() => setMobileFilterOpen(false)}
              className="w-full bg-[#20402D] text-white py-2.5 text-xs uppercase tracking-wider font-medium"
            >
              Применить ({filteredProducts.length} пар)
            </button>
          </div>
        )}

        {/* Results Info */}
        <div className="py-4 flex justify-between items-center text-xs text-[#2B2620]/60">
          <span>
            Найдено моделей: <strong className="text-[#2B2620]">{filteredProducts.length}</strong>
          </span>
          {selectedSize && (
            <button
              onClick={() => setSelectedSize(null)}
              className="text-[#20402D] hover:underline flex items-center gap-1"
            >
              Сбросить фильтр размера ({selectedSize}) <X size={13} />
            </button>
          )}
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-24 bg-[#FFFFFF] border border-[#E2E2E2] space-y-4">
            <p className="font-serif text-2xl text-[#2B2620]">
              В выбранном размере моделей сейчас нет в наличии
            </p>
            <p className="text-xs text-[#2B2620]/60 max-w-md mx-auto">
              Попробуйте сбросить фильтр размера или спросите стилиста Веру о скором поступлении новой партии
            </p>
            <div className="pt-2 flex justify-center gap-3">
              <button
                onClick={() => setSelectedSize(null)}
                className="bg-[#20402D] text-white px-6 py-3 text-xs uppercase tracking-wider"
              >
                Показать все размеры
              </button>
              <button
                onClick={() => setIsVeraOpen(true)}
                className="border border-[#20402D] text-[#20402D] px-6 py-3 text-xs uppercase tracking-wider"
              >
                Спросить стилиста Веру
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-3 sm:gap-x-6 gap-y-8 sm:gap-y-10">
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
    <Suspense fallback={<div className="min-h-screen p-12 text-center font-serif">Загрузка каталога TALLORA...</div>}>
      <CatalogContent />
    </Suspense>
  );
}
