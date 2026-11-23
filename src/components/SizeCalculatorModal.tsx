"use client";

import React, { useState } from "react";
import { X, ArrowRight, Sparkles } from "lucide-react";
import { useShop } from "@/context/ShopContext";
import { useRouter } from "next/navigation";
import { sizeForFoot, FOOT_MIN, FOOT_MAX } from "@/lib/size";

type Width = "narrow" | "standard" | "wide";

const WIDTHS: { id: Width; label: string }[] = [
  { id: "narrow", label: "Узкая" },
  { id: "standard", label: "Стандартная" },
  { id: "wide", label: "Широкая" },
];

const STEPS = [
  "Положи лист бумаги на пол и встань на него босой ногой, перенеся вес на эту ногу",
  "Обведи стопу карандашом, держа его строго вертикально",
  "Измерь линейкой расстояние от самой выступающей точки пятки до кончика самого длинного пальца",
  "Повтори со второй ногой и ориентируйся на большее значение. Мерить лучше вечером",
];

export default function SizeCalculatorModal() {
  const { isSizeModalOpen, setIsSizeModalOpen, setSelectedSize, setIsVeraOpen } = useShop();
  const router = useRouter();

  const [lengthCm, setLengthCm] = useState<number>(26.5);
  const [width, setWidth] = useState<Width>("standard");

  if (!isSizeModalOpen) return null;

  const result = sizeForFoot(lengthCm, width);
  const pct = ((lengthCm - FOOT_MIN) / (FOOT_MAX - FOOT_MIN)) * 100;

  const apply = () => {
    setSelectedSize(result.size);
    setIsSizeModalOpen(false);
    router.push("/catalog");
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4 bg-[#2B2620]/45 backdrop-blur-sm animate-fadeIn"
      onClick={() => setIsSizeModalOpen(false)}
    >
      <div
        className="relative w-full max-w-xl bg-white rounded-t-[28px] sm:rounded-[28px] shadow-2xl p-6 sm:p-9 max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setIsSizeModalOpen(false)}
          className="absolute top-5 right-5 w-10 h-10 rounded-full hover:bg-[#F3F3F3] text-[#2B2620]/70 flex items-center justify-center transition-colors"
          aria-label="Закрыть"
        >
          <X size={20} />
        </button>

        <h2 className="font-display uppercase text-[34px] sm:text-[44px] leading-[1.02] tracking-[-0.01em] text-[#2B2620] pr-10">
          Подобрать <span className="text-[#20402D]">размер</span>
        </h2>
        <p className="mt-3 text-[14px] text-[#2B2620]/65 leading-relaxed max-w-md">
          Укажи длину стопы в сантиметрах, и мы подскажем размер Tallora от 37 до 44
        </p>

        {/* Length */}
        <div className="mt-7">
          <div className="flex items-end justify-between">
            <span className="text-[11px] uppercase tracking-[0.22em] text-[#2B2620]/55">Длина стопы</span>
            <span className="font-display text-[44px] leading-none text-[#2B2620]">
              {lengthCm.toFixed(1)}
              <span className="text-lg text-[#2B2620]/50 ml-1">см</span>
            </span>
          </div>
          <div className="relative mt-4 h-8 flex items-center">
            <div className="absolute inset-x-0 h-[3px] rounded-full bg-[#2B2620]/10" />
            <div className="absolute left-0 h-[3px] rounded-full bg-[#20402D]" style={{ width: `${pct}%` }} />
            <input
              type="range"
              min={FOOT_MIN}
              max={FOOT_MAX}
              step="0.1"
              value={lengthCm}
              onChange={(e) => setLengthCm(parseFloat(e.target.value))}
              aria-label="Длина стопы в сантиметрах"
              className="relative w-full appearance-none bg-transparent cursor-pointer accent-[#20402D] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#20402D] [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-[#20402D]"
            />
          </div>
          <div className="flex justify-between text-[11px] text-[#2B2620]/45 mt-1">
            <span>{FOOT_MIN} см · 37</span>
            <span>{FOOT_MAX} см · 44</span>
          </div>
        </div>

        {/* Width */}
        <div className="mt-6">
          <span className="text-[11px] uppercase tracking-[0.22em] text-[#2B2620]/55 block mb-2.5">Полнота стопы</span>
          <div className="grid grid-cols-3 gap-2">
            {WIDTHS.map((w) => (
              <button
                key={w.id}
                type="button"
                onClick={() => setWidth(w.id)}
                className={`h-11 rounded-full text-[13px] border transition-colors cursor-pointer ${
                  width === w.id
                    ? "bg-[#20402D] border-[#20402D] text-white"
                    : "bg-white border-[#2B2620]/15 text-[#2B2620] hover:border-[#2B2620]/40"
                }`}
              >
                {w.label}
              </button>
            ))}
          </div>
        </div>

        {/* Result */}
        <div className="mt-7 rounded-[22px] bg-[#20402D] text-white p-5 sm:p-6 flex items-center gap-5">
          <span key={result.size} className="font-display text-[72px] leading-[0.85] fade-swap">{result.size}</span>
          <div>
            <span className="text-[11px] uppercase tracking-[0.22em] text-white/70">Твой размер Tallora</span>
            <p className="mt-1.5 text-[14px] text-white/90 leading-snug">{result.desc}</p>
          </div>
        </div>

        <button
          onClick={apply}
          className="btn-shine mt-4 w-full h-14 rounded-full bg-[#20402D] hover:bg-[#183326] text-white text-[12px] uppercase tracking-[0.2em] font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          Показать модели {result.size} размера
          <ArrowRight size={15} />
        </button>
        <button
          onClick={() => {
            setIsSizeModalOpen(false);
            setIsVeraOpen(true);
          }}
          className="mt-3 w-full h-12 rounded-full border border-[#2B2620]/15 hover:border-[#20402D] text-[12px] uppercase tracking-[0.18em] text-[#2B2620] flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <Sparkles size={14} className="text-[#20402D]" />
          Сомневаешься? Спроси стилиста Веру
        </button>

        {/* How to measure */}
        <div className="mt-8 pt-6 border-t border-[#2B2620]/10">
          <h3 className="font-display uppercase text-xl tracking-[0.02em] text-[#2B2620]">Как измерить стопу</h3>
          <ol className="mt-4 space-y-3">
            {STEPS.map((t, i) => (
              <li key={i} className="flex gap-3 text-[13px] text-[#2B2620]/75 leading-relaxed">
                <span className="w-6 h-6 shrink-0 rounded-full bg-[#F5F0E8] text-[#20402D] font-display text-[13px] flex items-center justify-center">
                  {i + 1}
                </span>
                {t}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
