"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Eye, ShoppingBag, Sparkles } from "lucide-react";
import { Product, ShoeSize } from "@/types";
import { useShop } from "@/context/ShopContext";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { selectedSize, addToCart, setQuickViewProduct, setIsSizeModalOpen } = useShop();
  const [isHovered, setIsHovered] = useState(false);
  const [selectedCardSize, setSelectedCardSize] = useState<ShoeSize | null>(selectedSize);

  // Check if user's selected size has low stock
  const userSizeStock = selectedSize
    ? product.sizes.find((s) => s.size === selectedSize)
    : null;
  const isLastPairInUserSize = userSizeStock && userSizeStock.stockCount === 1 && userSizeStock.inStock;

  const handleQuickAdd = (e: React.MouseEvent, sz: ShoeSize) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, sz);
  };

  return (
    <div
      className="group flex flex-col relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Visual Image Container - Vertical 3:4 Aspect Ratio */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#ECE4D8] border border-[#E2D9CC]">
        <Link href={`/catalog/${product.slug}`} className="block w-full h-full relative">
          <Image
            src={isHovered && product.images[1] ? product.images[1] : product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.isHit && (
            <span className="bg-[#0E0E0E] text-[#F4EFE8] text-[9px] uppercase tracking-[0.2em] px-2.5 py-1 font-medium">
              Хит
            </span>
          )}
          {product.isNew && (
            <span className="bg-[#6B0F1A] text-[#F4EFE8] text-[9px] uppercase tracking-[0.2em] px-2.5 py-1 font-medium">
              New
            </span>
          )}
          {isLastPairInUserSize && (
            <span className="bg-[#6B0F1A] text-[#F4EFE8] text-[9px] tracking-wider uppercase px-2.5 py-1 font-semibold animate-pulse shadow-md">
              Последняя пара в р. {selectedSize}
            </span>
          )}
        </div>

        {/* Quick View Button on hover */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setQuickViewProduct(product);
          }}
          className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-[#F4EFE8]/90 hover:bg-[#0E0E0E] hover:text-[#F4EFE8] text-[#0E0E0E] flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 shadow-md z-10 cursor-pointer"
          aria-label="Быстрый просмотр"
          title="Быстрый просмотр"
        >
          <Eye size={16} />
        </button>

        {/* Quick size selection drawer on hover (desktop) */}
        <div className="absolute bottom-0 inset-x-0 bg-[#0E0E0E]/90 backdrop-blur-xs p-2.5 text-center transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 hidden sm:block z-10">
          <span className="text-[10px] text-[#C9B8A3] uppercase tracking-widest block mb-1.5">
            Быстрое добавление размера:
          </span>
          <div className="flex justify-center gap-1.5">
            {product.sizes.map((s) => (
              <button
                key={s.size}
                disabled={!s.inStock}
                onClick={(e) => handleQuickAdd(e, s.size)}
                className={`w-7 h-7 text-xs font-serif flex items-center justify-center transition-all ${
                  !s.inStock
                    ? "opacity-30 line-through text-gray-500 cursor-not-allowed"
                    : selectedSize === s.size
                    ? "bg-[#6B0F1A] text-[#F4EFE8] font-bold"
                    : "bg-[#F4EFE8] text-[#0E0E0E] hover:bg-[#6B0F1A] hover:text-[#F4EFE8]"
                }`}
                title={s.inStock ? `Купить размер ${s.size}` : "Нет в наличии"}
              >
                {s.size}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Model height & shoe size reference note */}
      <div className="pt-3 pb-1 flex items-center justify-between text-[11px] text-[#0E0E0E]/60 border-b border-[#E2D9CC]/60">
        <span>{product.modelInfo.text}</span>
        <span className="text-[#6B0F1A] font-medium">{product.heelHeight}</span>
      </div>

      {/* Product Title and Price */}
      <div className="pt-2">
        <Link href={`/catalog/${product.slug}`} className="block">
          <h3 className="font-serif text-base text-[#0E0E0E] group-hover:text-[#6B0F1A] transition-colors leading-snug">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-baseline justify-between mt-1">
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-lg font-semibold text-[#0E0E0E]">
              {product.price.toLocaleString("ru-RU")} ₽
            </span>
            {product.oldPrice && (
              <span className="text-xs text-[#888888] line-through font-serif">
                {product.oldPrice.toLocaleString("ru-RU")} ₽
              </span>
            )}
          </div>
          <span className="text-[10px] text-[#6B0F1A] tracking-wider uppercase font-medium">
            +{product.clubBonus} бонусов
          </span>
        </div>

        {/* Mobile quick size buttons */}
        <div className="sm:hidden mt-2.5 pt-2 border-t border-[#E2D9CC]/60 flex items-center justify-between">
          <span className="text-[10px] uppercase tracking-wider text-[#0E0E0E]/60">Размеры:</span>
          <div className="flex gap-1">
            {product.sizes.map((s) => (
              <button
                key={s.size}
                disabled={!s.inStock}
                onClick={(e) => handleQuickAdd(e, s.size)}
                className={`w-6 h-6 text-[10px] font-serif border ${
                  !s.inStock
                    ? "opacity-30 line-through border-transparent"
                    : selectedSize === s.size
                    ? "bg-[#6B0F1A] text-[#F4EFE8] border-[#6B0F1A]"
                    : "border-[#D4C7B5] text-[#0E0E0E]"
                }`}
              >
                {s.size}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
