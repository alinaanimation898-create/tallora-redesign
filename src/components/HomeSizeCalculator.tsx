"use client";

import React, { useState } from "react";
import { Ruler, CheckCircle2, ArrowRight, Sparkles } from "lucide-react";
import { useShop } from "@/context/ShopContext";
import { ShoeSize } from "@/types";
import { useRouter } from "next/navigation";

export default function HomeSizeCalculator() {
  const { setSelectedSize, setIsVeraOpen } = useShop();
  const router = useRouter();
  const [cm, setCm] = useState(27.4);
  const [width, setWidth] = useState<"narrow" | "standard" | "wide">("standard");

  const calcSize = (): { size: ShoeSize; desc: string } => {
    let effective = cm;
    if (width === "wide") effective += 0.3;
    if (width === "narrow") effective -= 0.2;

    if (effective < 25.4) return { size: 39, desc: "25.0 – 25.4 см · стопа сидит плотно без скольжения" };
    if (effective < 26.1) return { size: 40, desc: "25.5 – 26.0 см · мягкая колодка" };
    if (effective < 26.8) return { size: 41, desc: "26.1 – 26.7 см · свободное движение пальцев" };
    if (effective < 27.5) return { size: 42, desc: "26.8 – 27.4 см · оптимальный подъем" };
    if (effective < 28.3) return { size: 43, desc: "27.5 – 28.2 см · анатомическая поддержка свода" };
    return { size: 44, desc: "28.3 – 29.0 см · удлинённая стелька до 29 см" };
  };

  const result = calcSize();

  const handleApply = () => {
    setSelectedSize(result.size);
    router.push(`/catalog?size=${result.size}`);
  };

  return (
    <div className="bg-[#0E0E0E] text-[#F4EFE8] py-20 px-4 sm:px-6 lg:px-8 border-y border-[#222222]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.3em] text-[#C9B8A3] font-medium block mb-2">
            Точный подбор без страха «не подойдёт»
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-light tracking-wide text-[#F4EFE8]">
            Калькулятор размера стопы
          </h2>
          <p className="text-[#F4EFE8]/70 text-sm mt-3">
            Укажите длину стопы в сантиметрах — мы мгновенно рассчитаем ваш размер в колодках TALLORA.
          </p>
        </div>

        <div className="bg-[#171717] border border-[#2B2B2B] p-6 sm:p-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Controls */}
          <div className="md:col-span-7 space-y-6">
            <div>
              <div className="flex justify-between items-baseline mb-2">
                <span className="text-xs uppercase tracking-wider text-[#C9B8A3] flex items-center gap-1.5">
                  <Ruler size={16} /> Длина стопы:
                </span>
                <span className="font-serif text-3xl font-bold text-[#F4EFE8]">
                  {cm.toFixed(1)} <span className="text-sm font-sans font-normal text-[#C9B8A3]">см</span>
                </span>
              </div>
              <input
                type="range"
                min="24.8"
                max="29.0"
                step="0.1"
                value={cm}
                onChange={(e) => setCm(parseFloat(e.target.value))}
                className="w-full accent-[#6B0F1A] cursor-pointer h-2 bg-[#333333] rounded-lg"
              />
              <div className="flex justify-between text-[11px] text-[#777777] mt-1 font-mono">
                <span>25.0 см (р. 39)</span>
                <span>27.0 см (р. 42)</span>
                <span>29.0 см (р. 44)</span>
              </div>
            </div>

            <div>
              <span className="text-xs uppercase tracking-wider text-[#C9B8A3] block mb-2">
                Полнота стопы:
              </span>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "narrow", label: "Узкая" },
                  { id: "standard", label: "Стандарт" },
                  { id: "wide", label: "Широкая" },
                ].map((w) => (
                  <button
                    key={w.id}
                    type="button"
                    onClick={() => setWidth(w.id as any)}
                    className={`py-2 px-3 text-xs tracking-wider uppercase border transition-all ${
                      width === w.id
                        ? "bg-[#6B0F1A] text-[#F4EFE8] border-[#6B0F1A] font-semibold"
                        : "bg-[#222222] text-[#F4EFE8]/80 border-[#333333] hover:border-[#6B0F1A]"
                    }`}
                  >
                    {w.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Result Card */}
          <div className="md:col-span-5 bg-[#202020] border border-[#333333] p-6 text-center flex flex-col justify-between h-full">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C9B8A3] block mb-1">
                Ваш идеальный размер
              </span>
              <div className="font-serif text-6xl font-bold text-[#F4EFE8] my-1">
                {result.size}
              </div>
              <p className="text-xs text-[#F4EFE8]/70 leading-relaxed mb-4">
                {result.desc}
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleApply}
                className="w-full bg-[#6B0F1A] hover:bg-[#8E1624] text-[#F4EFE8] py-3.5 px-4 text-xs uppercase tracking-[0.2em] font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Смотреть обувь {result.size} размера</span>
                <ArrowRight size={14} />
              </button>

              <button
                onClick={() => setIsVeraOpen(true)}
                className="w-full text-center text-[11px] text-[#C9B8A3] hover:underline flex items-center justify-center gap-1.5"
              >
                <Sparkles size={12} />
                <span>Спросить стилиста Веру о посадке этой пары</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
