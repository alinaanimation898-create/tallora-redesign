"use client";

import React, { useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { useShop } from "@/context/ShopContext";
import { ShoeSize } from "@/types";
import { useRouter } from "next/navigation";

type Width = "narrow" | "standard" | "wide";

export default function HomeSizeCalculator() {
  const { setSelectedSize, setIsVeraOpen } = useShop();
  const router = useRouter();
  const [cm, setCm] = useState(27.4);
  const [width, setWidth] = useState<Width>("standard");

  const calcSize = (): { size: ShoeSize; desc: string } => {
    let effective = cm;
    if (width === "wide") effective += 0.3;
    if (width === "narrow") effective -= 0.2;

    if (effective < 25.4) return { size: 39, desc: "25.0 – 25.4 см · стопа сидит плотно, без скольжения" };
    if (effective < 26.1) return { size: 40, desc: "25.5 – 26.0 см · мягкая колодка" };
    if (effective < 26.8) return { size: 41, desc: "26.1 – 26.7 см · свободное движение пальцев" };
    if (effective < 27.5) return { size: 42, desc: "26.8 – 27.4 см · оптимальный подъём" };
    if (effective < 28.3) return { size: 43, desc: "27.5 – 28.2 см · анатомическая поддержка свода" };
    return { size: 44, desc: "28.3 – 29.0 см · удлинённая стелька до 29 см" };
  };

  const result = calcSize();
  const min = 24.8;
  const max = 29.0;
  const pct = ((cm - min) / (max - min)) * 100;

  const handleApply = () => {
    setSelectedSize(result.size);
    router.push(`/catalog?size=${result.size}`);
  };

  return (
    <section className="relative bg-[#F5F0E8] text-[#2B2620] py-20 lg:py-28 px-5 sm:px-8 overflow-hidden">
      <div className="max-w-[1400px] mx-auto relative grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left: controls */}
        <div className="lg:col-span-7">
          <span className="text-[11px] uppercase tracking-[0.35em] text-[#8F6D2F] block mb-5">
            Точный подбор без «не подойдёт»
          </span>
          <h2 className="font-serif font-light text-[clamp(44px,6vw,96px)] leading-[0.9]">
            Твой размер <span className="italic text-[#B8914A]">в сантиметрах</span>
          </h2>
          <p className="text-[#2B2620]/60 text-[15px] mt-5 max-w-md leading-relaxed">
            Встань на лист бумаги, отметь пятку и самый длинный палец — и передвинь ползунок.
          </p>

          <div className="mt-12">
            <div className="flex items-end justify-between mb-5">
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#2B2620]/50">Длина стопы</span>
              <span className="font-display text-6xl leading-none">
                {cm.toFixed(1)}
                <span className="text-lg text-[#2B2620]/50 ml-1.5">см</span>
              </span>
            </div>

            <div className="relative h-10 flex items-center">
              <div className="absolute inset-x-0 h-[3px] rounded-full bg-[#2B2620]/10" />
              <div className="absolute left-0 h-[3px] rounded-full bg-[#DAB16B]" style={{ width: `${pct}%` }} />
              <div
                className="absolute w-7 h-7 -ml-3.5 rounded-full bg-white shadow-[0_0_0_6px_rgba(218,177,107,0.35)] pointer-events-none"
                style={{ left: `${pct}%` }}
              />
              <input
                type="range"
                min={min}
                max={max}
                step="0.1"
                value={cm}
                onChange={(e) => setCm(parseFloat(e.target.value))}
                aria-label="Длина стопы в сантиметрах"
                className="absolute inset-0 w-full opacity-0 cursor-pointer"
              />
            </div>
            <div className="flex justify-between text-[11px] text-[#2B2620]/40 mt-2 font-display tracking-wider">
              <span>25 см · 39</span>
              <span>27 см · 42</span>
              <span>29 см · 44</span>
            </div>
          </div>

          <div className="mt-10">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#2B2620]/50 block mb-3">Полнота</span>
            <div className="inline-flex p-1 rounded-full border border-[#2B2620]/15">
              {([
                { id: "narrow", label: "Узкая" },
                { id: "standard", label: "Стандарт" },
                { id: "wide", label: "Широкая" },
              ] as { id: Width; label: string }[]).map((w) => (
                <button
                  key={w.id}
                  type="button"
                  onClick={() => setWidth(w.id)}
                  className={`h-11 px-5 sm:px-7 rounded-full text-[11px] tracking-[0.2em] uppercase font-semibold transition-all cursor-pointer ${
                    width === w.id ? "bg-[#DAB16B] text-[#2B2620]" : "text-[#2B2620]/70 hover:text-[#2B2620]"
                  }`}
                >
                  {w.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: result */}
        <div className="lg:col-span-5">
          <div className="relative rounded-[32px] bg-[#DAB16B] p-8 sm:p-10 overflow-hidden">
            <div
              aria-hidden
              className="absolute -right-6 -bottom-16 font-display text-[280px] leading-none text-[#2B2620]/10 select-none"
            >
              {result.size}
            </div>
            <span className="relative text-[11px] uppercase tracking-[0.3em] text-[#2B2620]/70">Твой размер Tallora</span>
            <div key={result.size} className="relative font-display text-[150px] sm:text-[180px] leading-[0.85] mt-4 fade-swap text-[#2B2620]">
              {result.size}
            </div>
            <p className="relative text-sm text-[#2B2620]/75 mt-4 max-w-[260px]">{result.desc}</p>

            <button
              onClick={handleApply}
              className="group relative mt-8 w-full h-14 pl-7 pr-2 rounded-full bg-white text-[#2B2620] flex items-center justify-between text-[12px] uppercase tracking-[0.2em] font-semibold cursor-pointer"
            >
              Обувь {result.size} размера
              <span className="w-10 h-10 rounded-full bg-[#DAB16B] text-[#2B2620] flex items-center justify-center group-hover:rotate-[-45deg] transition-transform duration-500">
                <ArrowRight size={16} />
              </span>
            </button>

            <button
              onClick={() => setIsVeraOpen(true)}
              className="relative mt-4 w-full text-center text-[11px] uppercase tracking-[0.18em] text-[#2B2620]/75 hover:text-[#2B2620] flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles size={13} />
              Спросить Веру о посадке
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
