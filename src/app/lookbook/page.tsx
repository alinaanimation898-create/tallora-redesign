"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { LOOKBOOK_ITEMS, PRODUCTS } from "@/data/mockData";

export default function LookbookPage() {
  return (
    <div className="bg-[#0E0E0E] text-[#F4EFE8] min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs uppercase tracking-[0.3em] text-[#C9B8A3] font-medium block mb-2">
            Editorial Fall / Winter
          </span>
          <h1 className="font-serif text-4xl sm:text-7xl font-light text-[#F4EFE8]">
            Lookbook: Власть вертикали
          </h1>
          <p className="text-sm text-[#F4EFE8]/70 mt-4 leading-relaxed font-light">
            Каждая съёмка TALLORA проходит с участием моделей ростом от 178 до 188 см.
            Мы показываем реальные пропорции высокой женской фигуры, длинных ног и обуви 41–44 размера.
          </p>
        </div>

        {/* Big Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {LOOKBOOK_ITEMS.map((item, index) => {
            const product = PRODUCTS.find((p) => p.id === item.featuredProductId) || PRODUCTS[0];
            return (
              <div
                key={item.id}
                className="bg-[#141414] border border-[#222222] overflow-hidden flex flex-col group"
              >
                {/* 9:16 High Fashion Image */}
                <div className="relative aspect-[4/5] sm:aspect-[9/14] w-full overflow-hidden bg-[#0A0A0A]">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent opacity-90" />

                  {/* Badges on photo */}
                  <div className="absolute top-4 left-4 bg-[#6B0F1A] text-[#F4EFE8] text-[10px] uppercase tracking-wider px-3 py-1 font-mono">
                    Рост {item.modelHeight} см · Размер {item.modelShoeSize}
                  </div>
                </div>

                {/* Content info below */}
                <div className="p-6 sm:p-8 flex flex-col justify-between flex-1">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[#C9B8A3] block mb-1">
                      Кадр 0{index + 1} · Модель: {item.modelName}
                    </span>
                    <h2 className="font-serif text-2xl sm:text-3xl text-[#F4EFE8] mb-3">
                      {item.title}
                    </h2>
                    <blockquote className="text-xs sm:text-sm text-[#F4EFE8]/80 italic border-l-2 border-[#6B0F1A] pl-4 py-1 mb-6">
                      «{item.quote}»
                    </blockquote>
                  </div>

                  {/* Attached Product Box */}
                  <div className="bg-[#1C1C1E] border border-[#2E2E2E] p-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-15 bg-[#0A0A0A] border border-[#333333] shrink-0 overflow-hidden">
                        <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
                      </div>
                      <div>
                        <h4 className="font-serif text-sm text-[#F4EFE8]">{product.name}</h4>
                        <span className="text-xs text-[#C9B8A3] font-mono">
                          {product.price.toLocaleString("ru-RU")} ₽
                        </span>
                      </div>
                    </div>

                    <Link
                      href={`/catalog/${product.slug}`}
                      className="bg-[#6B0F1A] hover:bg-[#8E1624] text-[#F4EFE8] text-xs uppercase tracking-wider py-2.5 px-4 transition-colors flex items-center gap-1.5 shrink-0"
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
        <div className="text-center py-10 border-t border-[#222222]">
          <h3 className="font-serif text-2xl text-[#F4EFE8] mb-3">
            Хотите повторить образ?
          </h3>
          <p className="text-xs text-[#F4EFE8]/70 max-w-md mx-auto mb-6">
            Выберите ваш размер стопы, и мы покажем только пары в наличии.
          </p>
          <Link
            href="/catalog"
            className="inline-block bg-[#F4EFE8] hover:bg-[#C9B8A3] text-[#0E0E0E] px-8 py-3.5 text-xs uppercase tracking-[0.2em] font-medium transition-colors"
          >
            Перейти в каталог (39–44)
          </Link>
        </div>
      </div>
    </div>
  );
}
