"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, ArrowUpRight } from "lucide-react";
import { Product, ShoeSize } from "@/types";
import { useShop } from "@/context/ShopContext";

interface ProductCardProps {
  product: Product;
  /** Visual tone of the surface the card sits on. */
  tone?: "light" | "dark";
}

export default function ProductCard({ product, tone = "light" }: ProductCardProps) {
  const { selectedSize, addToCart, setQuickViewProduct } = useShop();
  const dark = tone === "dark";

  const userSizeStock = selectedSize ? product.sizes.find((s) => s.size === selectedSize) : null;
  const isLastPairInUserSize = userSizeStock && userSizeStock.stockCount === 1 && userSizeStock.inStock;

  const handleQuickAdd = (e: React.MouseEvent, sz: ShoeSize) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, sz);
  };

  const type = product.typeLabel;
  const model = product.model || product.typeLabel;
  const rest = [product.color];
  const soldOut = product.sizes.every((s) => !s.inStock);
  const sizeNums = product.sizes.map((s) => s.size);
  const sizeRange = sizeNums.length ? `${Math.min(...sizeNums)}–${Math.max(...sizeNums)}` : "";

  return (
    <div className="group flex flex-col relative">
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[22px] bg-[#E8E8E8]">
        <Link href={`/catalog/${product.slug}`} className="block w-full h-full relative">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-all duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
          />
          {product.images[1] && (
            <Image
              src={product.images[1]}
              alt=""
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10 pointer-events-none">
          {product.isNew && (
            <span className="bg-[#F3F3F3] text-[#2B2620] text-[10px] uppercase tracking-[0.2em] px-3 py-1.5 rounded-full font-semibold">
              New
            </span>
          )}
          {product.badge && !/^NEW$/i.test(product.badge) && (
            <span className="bg-[#DAB16B] text-[#2B2620] text-[10px] uppercase tracking-[0.2em] px-3 py-1.5 rounded-full font-semibold">
              {product.badge.replace(/\s*-\s*/, " −")}
            </span>
          )}
          {soldOut && (
            <span className="bg-white/90 text-[#2B2620]/70 text-[10px] uppercase tracking-[0.2em] px-3 py-1.5 rounded-full font-semibold">
              Нет в наличии
            </span>
          )}
          {isLastPairInUserSize && (
            <span className="bg-white text-[#2B2620] text-[10px] tracking-[0.12em] uppercase px-3 py-1.5 rounded-full font-semibold">
              Последняя в {selectedSize}
            </span>
          )}
        </div>

        {/* Quick view */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setQuickViewProduct(product);
          }}
          className="absolute top-3 right-3 w-10 h-10 rounded-full glass text-[#F3F3F3] flex items-center justify-center transition-all opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 hover:bg-[#F3F3F3] hover:text-[#2B2620] z-10 cursor-pointer"
          aria-label="Быстрый просмотр"
          title="Быстрый просмотр"
        >
          <ArrowUpRight size={17} />
        </button>

        {/* Heel tag bottom-left */}
        <div className="absolute bottom-3 left-3 z-10 pointer-events-none transition-opacity duration-300 sm:group-hover:opacity-0">
          <span className="font-display text-[11px] tracking-[0.2em] uppercase text-[#2B2620]/70 bg-white/80 backdrop-blur px-2.5 py-1 rounded-full">
            {product.heelHeight === "Без каблука" ? "Без каблука" : `Каблук ${product.heelHeight}`}
          </span>
        </div>

        {/* Quick-add sizes (desktop) */}
        <div className="absolute bottom-3 inset-x-3 z-10 hidden sm:block translate-y-[130%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]">
          <div className="glass rounded-2xl p-2">
            <div className="flex items-center justify-between px-1.5 pb-1.5">
              <span className="text-[9px] text-[#F3F3F3]/80 uppercase tracking-[0.2em]">В корзину</span>
              <Plus size={11} className="text-[#F3F3F3]/80" />
            </div>
            <div className="flex flex-wrap gap-1">
              {product.sizes.map((s) => (
                <button
                  key={s.size}
                  disabled={!s.inStock}
                  onClick={(e) => handleQuickAdd(e, s.size)}
                  className={`h-8 flex-1 min-w-[2rem] rounded-full font-display text-[13px] flex items-center justify-center transition-all ${
                    !s.inStock
                      ? "text-[#F3F3F3]/40 line-through cursor-not-allowed"
                      : selectedSize === s.size
                      ? "bg-[#DAB16B] text-[#2B2620]"
                      : "bg-[#F3F3F3] text-[#2B2620] hover:bg-[#DAB16B] hover:text-[#2B2620]"
                  }`}
                  title={s.inStock ? `Купить размер ${s.size}` : "Нет в наличии"}
                >
                  {s.size}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Info */}
      <Link href={`/catalog/${product.slug}`} className="pt-4 px-1 block">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <span className={`text-[10px] uppercase tracking-[0.22em] ${dark ? "text-[#F3F3F3]/50" : "text-[#2B2620]/45"}`}>
              {type}
            </span>
            <h3 className={`font-serif text-[26px] leading-[1] mt-1 ${dark ? "text-[#F3F3F3]" : "text-[#2B2620]"}`}>
              <span className={product.model ? "italic" : ""}>{model}</span>
              {rest.length > 0 && (
                <span className={`block text-[15px] leading-snug mt-1 not-italic truncate first-letter:uppercase ${dark ? "text-[#F3F3F3]/60" : "text-[#2B2620]/55"}`}>
                  {rest.join(" ")}
                </span>
              )}
            </h3>
          </div>
          <div className="text-right shrink-0">
            <span className={`font-display text-lg tracking-wide ${dark ? "text-[#F3F3F3]" : "text-[#2B2620]"}`}>
              {product.price.toLocaleString("ru-RU")} ₽
            </span>
            {product.oldPrice && (
              <span className={`block text-xs line-through ${dark ? "text-[#F3F3F3]/40" : "text-[#2B2620]/35"}`}>
                {product.oldPrice.toLocaleString("ru-RU")} ₽
              </span>
            )}
          </div>
        </div>
        <div className={`mt-3 pt-3 border-t flex items-center justify-between text-[11px] ${dark ? "border-white/10 text-[#F3F3F3]/55" : "border-[#2B2620]/10 text-[#2B2620]/50"}`}>
          <span>{soldOut ? "Ожидается поступление" : `Размеры ${sizeRange}`}</span>
          <span className="text-[#C99B4F] font-medium">+{product.clubBonus} ✦</span>
        </div>
      </Link>

      {/* Mobile quick sizes */}
      <div className="sm:hidden mt-3 px-1 flex flex-wrap gap-1">
        {product.sizes.map((s) => (
          <button
            key={s.size}
            disabled={!s.inStock}
            onClick={(e) => handleQuickAdd(e, s.size)}
            className={`flex-1 min-w-[2.25rem] h-8 rounded-full font-display text-xs border ${
              !s.inStock
                ? "opacity-30 line-through border-transparent"
                : selectedSize === s.size
                ? "bg-[#DAB16B] text-[#2B2620] border-[#DAB16B]"
                : dark
                ? "border-white/20 text-[#F3F3F3]"
                : "border-[#2B2620]/15 text-[#2B2620]"
            }`}
          >
            {s.size}
          </button>
        ))}
      </div>
    </div>
  );
}
