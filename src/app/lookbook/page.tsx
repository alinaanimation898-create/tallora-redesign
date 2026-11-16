"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { LOOKBOOK_ITEMS, PRODUCTS } from "@/data/mockData";

export default function LookbookPage() {
  return (
    <div className="bg-[#F5F0E8] text-[#2B2620] min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs uppercase tracking-[0.3em] text-[#8F6D2F] font-medium block mb-2">
            Lookbook Tallora
          </span>
          <h1 className="font-serif text-4xl sm:text-7xl font-light text-[#2B2620]">
            Lookbook <span className="italic">Tallora</span>
          </h1>
          <p className="text-sm text-[#2B2620]/70 mt-4 leading-relaxed font-light">
            Для повседневной жизни и особых случаев. Мы объединили стиль и удобство, чтобы каждая девушка
            чувствовала себя уверенно. Отмечайте нас в социальных сетях - вдохновим других вместе!
          </p>
        </div>

        {/* Big Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {LOOKBOOK_ITEMS.map((item, index) => {
            const product = PRODUCTS.find((p) => p.id === item.featuredProductId) || PRODUCTS[0];
            return (
              <div
                key={item.id}
                className="bg-white rounded-[28px] border border-[#E2E2E2] overflow-hidden flex flex-col group"
              >
                {/* 9:16 High Fashion Image */}
                <div className="relative aspect-[4/5] sm:aspect-[3/4] w-full overflow-hidden bg-[#E8E8E8]">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-white/85 backdrop-blur text-[#2B2620] text-[10px] uppercase tracking-[0.2em] px-3 py-1.5 rounded-full">
                    {product.typeLabel} {product.model}
                  </div>
                </div>

                {/* Content info below */}
                <div className="p-6 sm:p-8 flex flex-col justify-between flex-1">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[#8F6D2F] block mb-1">
                      Кадр 0{index + 1}
                    </span>
                    <h2 className="font-serif text-2xl sm:text-3xl text-[#2B2620] mb-3">
                      {item.title}
                    </h2>
                    <blockquote className="text-xs sm:text-sm text-[#2B2620]/80 italic border-l-2 border-[#DAB16B] pl-4 py-1 mb-6">
                      «{item.quote}»
                    </blockquote>
                  </div>

                  {/* Attached Product Box */}
                  <div className="bg-[#F3F3F3] rounded-2xl p-3 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-15 bg-white rounded-lg shrink-0 overflow-hidden">
                        <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
                      </div>
                      <div>
                        <h4 className="font-serif text-base text-[#2B2620]">{product.typeLabel} <span className="italic">{product.model}</span></h4>
                        <span className="block text-[11px] text-[#2B2620]/55">{product.color}</span>
                        <span className="text-xs text-[#8F6D2F] font-mono">
                          {product.price.toLocaleString("ru-RU")} ₽
                        </span>
                      </div>
                    </div>

                    <Link
                      href={`/catalog/${product.slug}`}
                      className="bg-[#DAB16B] hover:bg-[#C99B4F] text-[#2B2620] text-xs uppercase tracking-wider py-2.5 px-4 rounded-full transition-colors flex items-center gap-1.5 shrink-0"
                    >
                      <span>Купить</span>
                      <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center py-10 border-t border-[#E2E2E2]">
          <h3 className="font-serif text-2xl text-[#2B2620] mb-3">
            Хотите повторить образ?
          </h3>
          <p className="text-xs text-[#2B2620]/70 max-w-md mx-auto mb-6">
            Выберите ваш размер стопы, и мы покажем только пары в наличии.
          </p>
          <Link
            href="/catalog"
            className="inline-block bg-[#F3F3F3] hover:bg-[#E3C78F] text-[#2B2620] px-8 py-3.5 text-xs uppercase tracking-[0.2em] font-medium transition-colors rounded-full"
          >
            Перейти в каталог (37–44)
          </Link>
        </div>
      </div>
    </div>
  );
}
