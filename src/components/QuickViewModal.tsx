"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Check, HelpCircle, ArrowRight, ShieldCheck, RefreshCw } from "lucide-react";
import { useShop } from "@/context/ShopContext";
import { ShoeSize } from "@/types";

export default function QuickViewModal() {
  const {
    quickViewProduct,
    setQuickViewProduct,
    selectedSize,
    addToCart,
    setIsSizeModalOpen,
  } = useShop();

  const [activeSize, setActiveSize] = useState<ShoeSize | null>(selectedSize || 42);
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;

  const handleAddToCart = () => {
    if (activeSize) {
      addToCart(product, activeSize);
      setQuickViewProduct(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2B2620]/45 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-[#FFFFFF] border border-[#E2E2E2] shadow-2xl p-6 sm:p-8 rounded-sm max-h-[92vh] overflow-y-auto">
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-5 right-5 text-[#2B2620]/60 hover:text-[#8F6D2F] transition-colors p-1 z-10"
          aria-label="Закрыть"
        >
          <X size={24} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Left: Gallery preview */}
          <div>
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#EAEAEA] border border-[#E2E2E2] mb-3">
              <Image
                src={product.images[activeImageIdx] || product.images[0]}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
              {product.badge && (
                <div className="absolute top-3 left-3 bg-[#DAB16B] text-[#2B2620] text-[10px] uppercase tracking-[0.2em] px-2.5 py-1 rounded-full font-semibold">
                  {product.badge}
                </div>
              )}
            </div>

            {/* Thumbnail dots/images */}
            <div className="flex gap-2 overflow-x-auto pb-1">
              {product.images.slice(0, 4).map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIdx(idx)}
                  className={`relative w-14 h-18 border shrink-0 overflow-hidden ${
                    activeImageIdx === idx
                      ? "border-[#DAB16B] ring-1 ring-[#DAB16B]"
                      : "border-[#E2E2E2] opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image src={img} alt="thumb" fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Info, Size selector, Buy */}
          <div className="flex flex-col">
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#8F6D2F] font-semibold mb-1">
              {product.category} · Высота каблука {product.heelHeight}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#2B2620] leading-snug mb-3">
              {product.name}
            </h2>

            {/* Price & Club bonus */}
            <div className="flex items-baseline gap-3 mb-4 pb-4 border-b border-[#E2E2E2]">
              <span className="font-serif text-2xl font-bold text-[#2B2620]">
                {product.price.toLocaleString("ru-RU")} ₽
              </span>
              {product.oldPrice && (
                <span className="text-sm text-[#888888] line-through font-serif">
                  {product.oldPrice.toLocaleString("ru-RU")} ₽
                </span>
              )}
              <span className="text-xs bg-[#DAB16B]/10 text-[#8F6D2F] px-2 py-0.5 font-medium ml-auto">
                +{product.clubBonus} баллов PRIVÉ
              </span>
            </div>

            {/* Fit guidance banner */}
            <div className="bg-[#F3F3F3] p-3 border border-[#E2E2E2] mb-5 text-xs">
              <span className="font-semibold text-[#2B2620] block mb-0.5">
                Посадка по колодке:
              </span>
              <p className="text-[#2B2620]/80 leading-relaxed">
                {product.fitHintText}
              </p>
            </div>

            {/* Sizes Grid */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase tracking-wider font-medium text-[#2B2620]">
                  Выберите размер:
                </span>
                <button
                  onClick={() => {
                    setQuickViewProduct(null);
                    setIsSizeModalOpen(true);
                  }}
                  className="text-xs text-[#8F6D2F] underline flex items-center gap-1 hover:opacity-80"
                >
                  <HelpCircle size={13} />
                  Не знаю свой размер
                </button>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s.size}
                    disabled={!s.inStock}
                    onClick={() => setActiveSize(s.size)}
                    className={`py-3 text-sm font-serif border text-center transition-all ${
                      !s.inStock
                        ? "opacity-30 line-through bg-gray-100 border-[#E2E2E2] cursor-not-allowed text-gray-400"
                        : activeSize === s.size
                        ? "bg-[#DAB16B] text-[#2B2620] border-[#DAB16B] font-bold shadow-xs"
                        : "bg-white text-[#2B2620] border-[#E2E2E2] hover:border-[#2B2620]"
                    }`}
                  >
                    {s.size}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 mb-6">
              <button
                onClick={handleAddToCart}
                disabled={!activeSize}
                className="w-full bg-[#DAB16B] hover:bg-[#C99B4F] disabled:opacity-40 text-[#2B2620] py-4 px-6 text-xs uppercase tracking-[0.2em] font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Добавить в корзину ({activeSize} размер)</span>
                <ArrowRight size={15} />
              </button>

              <Link
                href={`/catalog/${product.slug}`}
                onClick={() => setQuickViewProduct(null)}
                className="w-full text-center block text-xs uppercase tracking-wider text-[#2B2620]/70 hover:text-[#8F6D2F] py-1"
              >
                Подробнее о модели, материалы и отзывы →
              </Link>
            </div>

            {/* Trust highlights */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-[#E2E2E2] text-[11px] text-[#2B2620]/70">
              <div className="flex items-center gap-2">
                <RefreshCw size={15} className="text-[#8F6D2F] shrink-0" />
                <span>Возврат 14 дней · СДЭК по всей России</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck size={15} className="text-[#8F6D2F] shrink-0" />
                <span>{product.material}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
