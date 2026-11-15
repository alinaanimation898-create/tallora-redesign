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

  const sizes: ShoeSize[] = [39, 40, 41, 42, 43, 44];

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
      if (activeHeel === "flat" && !item.heelHeight.includes("1.") && !item.heelHeight.includes("2.")) {
        return false;
      }
      if (activeHeel === "medium" && (!item.heelHeight.includes("5.") && !item.heelHeight.includes("6.") && !item.heelHeight.includes("7."))) {
        return false;
      }
      if (activeHeel === "high" && (!item.heelHeight.includes("8.") && !item.heelHeight.includes("9."))) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "new") return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      return b.rating - a.rating;
    });
  }, [activeCategory, selectedSize, activeHeel, sortBy]);

  return (
    <div className="min-h-screen bg-[#F4EFE8] pb-24">
      {/* Editorial Title Banner */}
      <div className="bg-[#0E0E0E] text-[#F4EFE8] py-14 px-4 sm:px-6 lg:px-8 border-b border-[#222222]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#C9B8A3] block mb-2 font-medium">
              Коллекция 39 — 44
            </span>
            <h1 className="font-serif text-3xl sm:text-6xl font-light tracking-wide text-[#F4EFE8]">
              Каталог обуви
            </h1>
          </div>

          <div className="flex items-center gap-4 text-xs text-[#F4EFE8]/70">
            <button
              onClick={() => setIsSizeModalOpen(true)}
              className="flex items-center gap-1.5 text-[#C9B8A3] hover:underline"
            >
              <Ruler size={14} />
              <span>Калькулятор стопы (см)</span>
            </button>
            <span className="opacity-40">|</span>
            <button
              onClick={() => setIsVeraOpen(true)}
              className="flex items-center gap-1.5 text-[#F4EFE8] hover:text-[#C9B8A3]"
            >
              <Sparkles size={14} className="text-[#C9B8A3]" />
              <span>Спросить Веру</span>
            </button>
          </div>
        </div>
      </div>

      {/* STICKY TOP SIZE BAR */}
      <div className="sticky top-20 z-30 bg-[#F9F6F0]/95 backdrop-blur-md border-b border-[#E2D9CC] py-3 px-4 sm:px-6 lg:px-8 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-[#0E0E0E] shrink-0 mr-1 flex items-center gap-1">
              <Ruler size={13} className="text-[#6B0F1A]" />
              Размер:
            </span>

            <button
              onClick={() => setSelectedSize(null)}
              className={`px-3 py-1.5 text-xs font-serif uppercase tracking-wider transition-all border shrink-0 ${
                selectedSize === null
                  ? "bg-[#0E0E0E] text-[#F4EFE8] border-[#0E0E0E]"
                  : "bg-white text-[#0E0E0E] border-[#E2D9CC] hover:border-[#0E0E0E]"
              }`}
            >
              Все
            </button>

            {sizes.map((sz) => (
              <button
                key={sz}
                onClick={() => setSelectedSize(selectedSize === sz ? null : sz)}
                className={`w-9 h-8 text-xs font-serif transition-all border shrink-0 flex items-center justify-center ${
                  selectedSize === sz
                    ? "bg-[#6B0F1A] text-[#F4EFE8] border-[#6B0F1A] font-bold shadow-xs"
                    : "bg-white text-[#0E0E0E] border-[#E2D9CC] hover:border-[#0E0E0E]"
                }`}
              >
                {sz}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {selectedSize && (
              <span className="hidden md:inline text-[11px] text-[#6B0F1A] font-medium bg-[#6B0F1A]/10 px-2.5 py-1">
                Показываем только наличие в р. {selectedSize}
              </span>
            )}
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="md:hidden flex items-center gap-1.5 text-xs uppercase tracking-wider border border-[#E2D9CC] px-3 py-1.5 bg-white text-[#0E0E0E]"
            >
              <Filter size={13} />
              Фильтры
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Category Pills & Sort Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#E2D9CC]">
          {/* Categories */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setActiveCategory(cat.slug)}
                className={`px-3.5 py-1.5 text-xs uppercase tracking-wider whitespace-nowrap transition-all border ${
                  activeCategory === cat.slug
                    ? "bg-[#0E0E0E] text-[#F4EFE8] border-[#0E0E0E]"
                    : "bg-[#F9F6F0] text-[#0E0E0E]/80 border-[#E2D9CC] hover:border-[#0E0E0E]"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Heel Height & Sort Controls */}
          <div className="hidden md:flex items-center gap-4 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-[#0E0E0E]/60 uppercase tracking-wider text-[10px]">
                Каблук:
              </span>
              <select
                value={activeHeel}
                onChange={(e) => setActiveHeel(e.target.value)}
                className="bg-white border border-[#E2D9CC] px-2.5 py-1 text-xs text-[#0E0E0E] focus:outline-none"
              >
                <option value="all">Любой каблук</option>
                <option value="flat">Без каблука (до 2 см)</option>
                <option value="medium">Комфортный (5–7 см)</option>
                <option value="high">Высокий (8–9 см)</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[#0E0E0E]/60 uppercase tracking-wider text-[10px]">
                Сортировка:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-[#E2D9CC] px-2.5 py-1 text-xs text-[#0E0E0E] focus:outline-none"
              >
                <option value="popular">По популярности</option>
                <option value="new">Сначала новинки</option>
                <option value="price-asc">Сначала доступные</option>
                <option value="price-desc">Сначала премиальные</option>
              </select>
            </div>
          </div>
        </div>

        {/* Mobile Filter Drawer */}
        {mobileFilterOpen && (
          <div className="md:hidden bg-white p-5 border border-[#E2D9CC] my-4 shadow-lg space-y-4 animate-fadeIn">
            <div className="flex justify-between items-center pb-2 border-b border-[#E2D9CC]">
              <span className="text-xs uppercase tracking-wider font-semibold">Фильтры</span>
              <button onClick={() => setMobileFilterOpen(false)}><X size={18} /></button>
            </div>

            <div>
              <span className="text-xs font-medium block mb-2">Высота каблука:</span>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: "all", label: "Любой" },
                  { id: "flat", label: "До 2 см" },
                  { id: "medium", label: "5–7 см" },
                  { id: "high", label: "8–9 см" },
                ].map((h) => (
                  <button
                    key={h.id}
                    onClick={() => setActiveHeel(h.id)}
                    className={`py-1.5 px-2 text-xs border ${
                      activeHeel === h.id ? "bg-[#0E0E0E] text-white" : "border-[#E2D9CC]"
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
                className="w-full bg-[#F9F6F0] border border-[#E2D9CC] p-2 text-xs"
              >
                <option value="popular">По популярности</option>
                <option value="new">Сначала новинки</option>
                <option value="price-asc">По возрастанию цены</option>
                <option value="price-desc">По убыванию цены</option>
              </select>
            </div>

            <button
              onClick={() => setMobileFilterOpen(false)}
              className="w-full bg-[#6B0F1A] text-white py-2.5 text-xs uppercase tracking-wider font-medium"
            >
              Применить ({filteredProducts.length} пар)
            </button>
          </div>
        )}

        {/* Results Info */}
        <div className="py-4 flex justify-between items-center text-xs text-[#0E0E0E]/60">
          <span>
            Найдено моделей: <strong className="text-[#0E0E0E]">{filteredProducts.length}</strong>
          </span>
          {selectedSize && (
            <button
              onClick={() => setSelectedSize(null)}
              className="text-[#6B0F1A] hover:underline flex items-center gap-1"
            >
              Сбросить фильтр размера ({selectedSize}) <X size={13} />
            </button>
          )}
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-24 bg-[#F9F6F0] border border-[#E2D9CC] space-y-4">
            <p className="font-serif text-2xl text-[#0E0E0E]">
              В выбранном размере моделей сейчас нет в наличии
            </p>
            <p className="text-xs text-[#0E0E0E]/60 max-w-md mx-auto">
              Попробуйте сбросить фильтр размера или спросите стилиста Веру о скором поступлении новой партии.
            </p>
            <div className="pt-2 flex justify-center gap-3">
              <button
                onClick={() => setSelectedSize(null)}
                className="bg-[#0E0E0E] text-[#F4EFE8] px-6 py-3 text-xs uppercase tracking-wider"
              >
                Показать все размеры
              </button>
              <button
                onClick={() => setIsVeraOpen(true)}
                className="border border-[#6B0F1A] text-[#6B0F1A] px-6 py-3 text-xs uppercase tracking-wider"
              >
                Спросить Веру
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
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
