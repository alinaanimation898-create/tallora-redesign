"use client";

import React, { useState } from "react";
import { X, Ruler, Check, HelpCircle, ArrowRight, Sparkles } from "lucide-react";
import { useShop } from "@/context/ShopContext";
import { ShoeSize } from "@/types";
import { useRouter } from "next/navigation";

export default function SizeCalculatorModal() {
  const { isSizeModalOpen, setIsSizeModalOpen, setSelectedSize, setIsVeraOpen } = useShop();
  const router = useRouter();

  const [lengthCm, setLengthCm] = useState<number>(27.2);
  const [widthType, setWidthType] = useState<"narrow" | "standard" | "wide">("standard");

  if (!isSizeModalOpen) return null;

  // Calculate size from length in cm & width
  const calculateSize = (cm: number, width: "narrow" | "standard" | "wide"): {
    size: ShoeSize;
    note: string;
  } => {
    let effectiveCm = cm;
    if (width === "wide") effectiveCm += 0.3; // slightly round up for wider feet
    if (width === "narrow") effectiveCm -= 0.2;

    if (effectiveCm < 25.4) return { size: 39, note: "Идеально подходит 39 размер с мягкой фиксацией" };
    if (effectiveCm < 26.1) return { size: 40, note: "Ваш точный размер — 40" };
    if (effectiveCm < 26.8) return { size: 41, note: "Ваш точный размер — 41" };
    if (effectiveCm < 27.5) return { size: 42, note: "Рекомендуем 42 размер — комфортная посадка в носке" };
    if (effectiveCm < 28.3) return { size: 43, note: "Рекомендуем 43 размер с выверенной колодкой" };
    return { size: 44, note: "Рекомендуем 44 размер (колодка до 29.0 см)" };
  };

  const recommendation = calculateSize(lengthCm, widthType);

  const handleApplySize = () => {
    setSelectedSize(recommendation.size);
    setIsSizeModalOpen(false);
    router.push("/catalog");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0E0E0E]/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-xl bg-[#F9F6F0] border border-[#E2D9CC] shadow-2xl p-6 sm:p-8 rounded-sm max-h-[90vh] overflow-y-auto">
        <button
          onClick={() => setIsSizeModalOpen(false)}
          className="absolute top-5 right-5 text-[#0E0E0E]/60 hover:text-[#6B0F1A] transition-colors p-1"
          aria-label="Закрыть"
        >
          <X size={22} />
        </button>

        <div className="text-center mb-6">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#6B0F1A] font-semibold block mb-1">
            Безупречная посадка
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl text-[#0E0E0E]">
            Калькулятор размера стопы
          </h2>
          <p className="text-xs text-[#0E0E0E]/70 mt-1 max-w-md mx-auto">
            Никаких сюрпризов: колодки TALLORA разработаны с учетом анатомии высокой стопы от 39 до 44 размера.
          </p>
        </div>

        {/* Step 1: Foot length slider */}
        <div className="bg-[#F4EFE8] p-5 border border-[#E2D9CC] mb-5">
          <div className="flex justify-between items-center mb-3">
            <label className="text-xs uppercase tracking-wider font-medium text-[#0E0E0E] flex items-center gap-1.5">
              <Ruler size={15} className="text-[#6B0F1A]" />
              Длина стопы:
            </label>
            <span className="font-serif text-xl font-bold text-[#6B0F1A]">
              {lengthCm.toFixed(1)} см
            </span>
          </div>

          <input
            type="range"
            min="24.8"
            max="29.0"
            step="0.1"
            value={lengthCm}
            onChange={(e) => setLengthCm(parseFloat(e.target.value))}
            className="w-full accent-[#6B0F1A] cursor-pointer h-2 bg-[#E2D9CC] rounded-lg"
          />

          <div className="flex justify-between text-[10px] text-[#0E0E0E]/50 mt-2 font-mono">
            <span>25.0 см (р. 39)</span>
            <span>27.0 см (р. 42)</span>
            <span>29.0 см (р. 44)</span>
          </div>
        </div>

        {/* Step 2: Width selector */}
        <div className="mb-6">
          <label className="text-xs uppercase tracking-wider font-medium text-[#0E0E0E] block mb-2">
            Полнота стопы:
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: "narrow", label: "Узкая" },
              { id: "standard", label: "Стандартная" },
              { id: "wide", label: "Широкая" },
            ].map((w) => (
              <button
                key={w.id}
                type="button"
                onClick={() => setWidthType(w.id as any)}
                className={`py-2 px-3 text-xs tracking-wider uppercase border transition-all ${
                  widthType === w.id
                    ? "bg-[#0E0E0E] text-[#F4EFE8] border-[#0E0E0E]"
                    : "bg-[#F4EFE8] text-[#0E0E0E] border-[#E2D9CC] hover:border-[#0E0E0E]"
                }`}
              >
                {w.label}
              </button>
            ))}
          </div>
        </div>

        {/* Result banner */}
        <div className="p-4 bg-[#6B0F1A]/10 border border-[#6B0F1A] rounded-sm mb-6 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-[#6B0F1A] font-bold block">
              Твой точный размер TALLORA:
            </span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="font-serif text-3xl font-bold text-[#6B0F1A]">
                {recommendation.size}
              </span>
              <span className="text-xs text-[#0E0E0E]/80">
                ({recommendation.note})
              </span>
            </div>
          </div>
          <div className="w-8 h-8 rounded-full bg-[#6B0F1A] text-[#F4EFE8] flex items-center justify-center shrink-0">
            <Check size={18} />
          </div>
        </div>

        {/* Action buttons */}
        <div className="space-y-3">
          <button
            onClick={handleApplySize}
            className="w-full bg-[#6B0F1A] hover:bg-[#8E1624] text-[#F4EFE8] py-3.5 px-6 text-xs uppercase tracking-[0.2em] font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <span>Показать модели в {recommendation.size} размере</span>
            <ArrowRight size={15} />
          </button>

          <div className="flex items-center justify-between pt-2 text-[11px] text-[#0E0E0E]/70">
            <button
              onClick={() => {
                setIsSizeModalOpen(false);
                setIsVeraOpen(true);
              }}
              className="flex items-center gap-1.5 text-[#6B0F1A] hover:underline"
            >
              <Sparkles size={13} />
              Сомневаетесь? Спросить стилиста Веру
            </button>
            <span className="text-[10px] text-[#888888]">100% бесплатный обмен</span>
          </div>
        </div>

        {/* Measurement mini guide */}
        <div className="mt-6 pt-5 border-t border-[#E2D9CC] text-xs text-[#0E0E0E]/70 space-y-1">
          <p className="font-semibold text-[#0E0E0E] flex items-center gap-1">
            <HelpCircle size={14} className="text-[#6B0F1A]" />
            Как замерить стопу за 1 минуту:
          </p>
          <p className="text-[11px] leading-relaxed">
            1. Положите лист А4 на пол вплотную к стене. <br />
            2. Встаньте пяткой к стене и отметьте карандашом самую выступающую точку пальца. <br />
            3. Измерьте линейкой расстояние от края листа до метки.
          </p>
        </div>
      </div>
    </div>
  );
}
