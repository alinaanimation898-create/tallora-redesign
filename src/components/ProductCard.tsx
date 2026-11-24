"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Product } from "@/types";
import { useShop } from "@/context/ShopContext";
import { ruBadge } from "@/lib/badge";

interface ProductCardProps {
  product: Product;
  /** Visual tone of the surface the card sits on. */
  tone?: "light" | "dark";
}

export default function ProductCard({ product, tone = "light" }: ProductCardProps) {
  const { selectedSize } = useShop();
  const dark = tone === "dark";
  const [idx, setIdx] = useState(0);
  const [hover, setHover] = useState(false);

  const images = product.images.length ? product.images : [""];
  const many = images.length > 1;
  const userSizeStock = selectedSize ? product.sizes.find((s) => s.size === selectedSize) : null;
  const isLastPairInUserSize = userSizeStock && userSizeStock.stockCount === 1 && userSizeStock.inStock;
  const soldOut = product.sizes.every((s) => !s.inStock);
  const sizes = [...product.sizes].sort((a, b) => a.size - b.size);
  const model = product.model || product.typeLabel;

  // Slideshow while the pointer is over the photo; arrows still work by hand
  useEffect(() => {
    if (!hover || images.length < 2) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % images.length), 1300);
    return () => clearInterval(t);
  }, [hover, images.length]);

  const go = (e: React.MouseEvent, dir: 1 | -1) => {
    e.preventDefault();
    e.stopPropagation();
    setIdx((i) => (i + dir + images.length) % images.length);
  };

  const ink = dark ? "text-[#F3F3F3]" : "text-[#2B2620]";
  const muted = dark ? "text-[#F3F3F3]/55" : "text-[#2B2620]/50";

  return (
    <div className="group/card @container flex flex-col relative">
      <div
        className="relative aspect-[3/4] w-full overflow-hidden rounded-[18px] sm:rounded-[22px] bg-[#F3F3F3]"
        onMouseEnter={() => {
          setHover(true);
          if (images.length > 1) setIdx((i) => (i + 1) % images.length);
        }}
        onMouseLeave={() => {
          setHover(false);
          setIdx(0);
        }}
      >
        <Link href={`/catalog/${product.slug}`} className="block w-full h-full relative" aria-label={product.name}>
          {images.map((src, i) => (i === idx || i === (idx + 1) % images.length) && (
            <Image
              key={src + i}
              src={src}
              alt={i === 0 ? product.name : ""}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className={`object-cover transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/card:scale-[1.03] ${
                i === idx ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </Link>

        {/* Photo position */}
        {many && (
          <div className="absolute top-2.5 inset-x-3 sm:top-3 sm:inset-x-4 z-10 flex gap-1 pointer-events-none">
            {images.map((_, i) => (
              <span key={i} className={`h-[2px] flex-1 rounded-full transition-colors ${i === idx ? "bg-[#2B2620]/70" : "bg-[#2B2620]/15"}`} />
            ))}
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-5 left-2.5 sm:top-6 sm:left-3 flex flex-wrap gap-1 z-10 pointer-events-none">
          {product.isNew && (
            <span className="bg-white text-[#2B2620] text-[9px] sm:text-[10px] uppercase tracking-[0.16em] px-2.5 py-1 rounded-full font-semibold">
              Новинка
            </span>
          )}
          {product.badge && !/^NEW$/i.test(product.badge) && (
            <span className="bg-[#20402D] text-white text-[9px] sm:text-[10px] uppercase tracking-[0.16em] px-2.5 py-1 rounded-full font-semibold">
              {ruBadge(product.badge)}
            </span>
          )}
          {soldOut && (
            <span className="bg-white/90 text-[#2B2620]/70 text-[9px] sm:text-[10px] uppercase tracking-[0.16em] px-2.5 py-1 rounded-full font-semibold">
              Скоро снова
            </span>
          )}
          {isLastPairInUserSize && (
            <span className="bg-white text-[#20402D] text-[9px] sm:text-[10px] uppercase tracking-[0.16em] px-2.5 py-1 rounded-full font-semibold">
              Последняя в {selectedSize}
            </span>
          )}
        </div>

        {/* Photo arrows: always on touch screens, on hover with a mouse */}
        {many && (
          <>
            <button
              onClick={(e) => go(e, -1)}
              aria-label="Предыдущее фото"
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/90 backdrop-blur text-[#2B2620] shadow-sm flex items-center justify-center transition-opacity sm:opacity-0 sm:group-hover/card:opacity-100 hover:bg-white cursor-pointer"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={(e) => go(e, 1)}
              aria-label="Следующее фото"
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/90 backdrop-blur text-[#2B2620] shadow-sm flex items-center justify-center transition-opacity sm:opacity-0 sm:group-hover/card:opacity-100 hover:bg-white cursor-pointer"
            >
              <ChevronRight size={16} />
            </button>
          </>
        )}

      </div>

      {/* Info */}
      <Link href={`/catalog/${product.slug}`} className="pt-3 sm:pt-4 px-0.5 block">
        <span className={`block text-[10px] sm:text-[11px] uppercase tracking-[0.18em] truncate first-letter:uppercase ${muted}`}>
          {product.typeLabel} · {product.color}
        </span>
        <div className="mt-1.5 flex items-baseline justify-between gap-2">
          <h3 className={`font-display uppercase text-[19px] sm:text-[23px] leading-none tracking-[0.02em] truncate ${ink}`}>{model}</h3>
          <span className="flex items-baseline gap-2 shrink-0">
            {product.oldPrice && (
              <span className={`hidden @[250px]:inline text-[12px] line-through ${muted}`}>{product.oldPrice.toLocaleString("ru-RU")}</span>
            )}
            <span className={`font-display text-[16px] sm:text-[19px] leading-none ${product.oldPrice ? "text-[#20402D]" : ink}`}>
              {product.price.toLocaleString("ru-RU")} ₽
            </span>
          </span>
        </div>
        <div className={`mt-3 pt-3 border-t flex items-center gap-x-1.5 overflow-hidden whitespace-nowrap font-display text-[12px] sm:text-[13px] tracking-[0.04em] ${dark ? "border-white/10" : "border-[#2B2620]/10"}`}>
          {soldOut ? (
            <span className={muted}>Скоро снова</span>
          ) : (
            sizes.map((s) => (
              <span key={s.size} className={s.inStock ? ink : `${muted} line-through opacity-50`}>
                {s.size}
              </span>
            ))
          )}
        </div>
      </Link>
    </div>
  );
}
