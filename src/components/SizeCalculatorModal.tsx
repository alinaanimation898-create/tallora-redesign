"use client";

import React, { useState } from "react";
import { X, Ruler, Check, HelpCircle, ArrowRight, Sparkles } from "lucide-react";
import { useShop } from "@/context/ShopContext";
import { ShoeSize } from "@/types";
import { useRouter } from "next/navigation";
import { sizeForFoot } from "@/lib/size";

export default function SizeCalculatorModal() {
  const { isSizeModalOpen, setIsSizeModalOpen, setSelectedSize, setIsVeraOpen } = useShop();
  const router = useRouter();

  const [lengthCm, setLengthCm] = useState<number>(27.2);
  const [widthType, setWidthType] = useState<"narrow" | "standard" | "wide">("standard");

  if (!isSizeModalOpen) return null;

  // Calculate size from length in cm & width
  const calculateSize = (cm: number, width: "narrow" | "standard" | "wide") => {
    const r = sizeForFoot(cm, width);
    return { size: r.size, note: `Рекомендуем ${r.size} размер · ${r.desc.toLowerCase()}` };
  };

  const recommendation = calculateSize(lengthCm, widthType);

  const handleApplySize = () => {
    setSelectedSize(recommendation.size);
    setIsSizeModalOpen(false);
    router.push("/catalog");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2B2620]/45 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-xl bg-[#FFFFFF] border border-[#E2E2E2] shadow-2xl p-6 sm:p-8 rounded-sm max-h-[90vh] overflow-y-auto">
        <button
          onClick={() => setIsSizeModalOpen(false)}
          className="absolute top-5 right-5 text-[#2B2620]/60 hover:text-[#20402D] transition-colors p-1"
          aria-label="Закрыть"
        >
          <X size={22} />
        </button>

        <div className="text-center mb-6">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#20402D] font-semibold block mb-1">
            Безупречная посадка
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl text-[#2B2620]">
            Калькулятор размера стопы
          </h2>
          <p className="text-xs text-[#2B2620]/70 mt-1 max-w-md mx-auto">
            Никаких сюрпризов: у каждой модели Tallora указана длина стельки для каждого размера - от 37 до 44.
          </p>
        </div>

        {/* Step 1: Foot length slider */}
        <div className="bg-[#F3F3F3] p-5 border border-[#E2E2E2] mb-5 rounded-2xl">
          <div className="flex justify-between items-center mb-3">
            <label className="text-xs uppercase tracking-wider font-medium text-[#2B2620] flex items-center gap-1.5">
              <Ruler size={15} className="text-[#20402D]" />
              Длина стопы:
            </label>
            <span className="font-serif text-xl font-bold text-[#20402D]">
              {lengthCm.toFixed(1)} см
            </span>
          </div>

          <input
            type="range"
            min="23"
            max="29.5"
            step="0.1"
            value={lengthCm}
            onChange={(e) => setLengthCm(parseFloat(e.target.value))}
            className="w-full accent-[#20402D] cursor-pointer h-2 bg-[#E2E2E2] rounded-lg"
          />

          <div className="flex justify-between text-[10px] text-[#2B2620]/50 mt-2 font-mono">
            <span>23.0 см (р. 37)</span>
            <span>26.0 см (р. 40)</span>
            <span>29.5 см (р. 44)</span>
          </div>
        </div>

        {/* Step 2: Width selector */}
        <div className="mb-6">
          <label className="text-xs uppercase tracking-wider font-medium text-[#2B2620] block mb-2">
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
                    ? "bg-[#20402D] text-white border-[#20402D]"
                    : "bg-[#F3F3F3] text-white border-[#E2E2E2] hover:border-[#2B2620]"
                }`}
              >
                {w.label}
              </button>
            ))}
          </div>
        </div>

        {/* Result banner */}
        <div className="p-4 bg-[#20402D]/10 border border-[#20402D] rounded-sm mb-6 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-[#20402D] font-bold block">
              Твой точный размер TALLORA:
            </span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="font-serif text-3xl font-bold text-[#20402D]">
                {recommendation.size}
              </span>
              <span className="text-xs text-[#2B2620]/80">
                ({recommendation.note})
              </span>
            </div>
          </div>
          <div className="w-8 h-8 rounded-full bg-[#20402D] text-white flex items-center justify-center shrink-0">
            <Check size={18} />
          </div>
        </div>

        {/* Action buttons */}
        <div className="space-y-3">
          <button
            onClick={handleApplySize}
            className="w-full bg-[#20402D] hover:bg-[#183326] text-white py-3.5 px-6 text-xs uppercase tracking-[0.2em] font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer rounded-full"
          >
            <span>Показать модели в {recommendation.size} размере</span>
            <ArrowRight size={15} />
          </button>

          <div className="flex items-center justify-between pt-2 text-[11px] text-[#2B2620]/70">
            <button
              onClick={() => {
                setIsSizeModalOpen(false);
                setIsVeraOpen(true);
              }}
              className="flex items-center gap-1.5 text-[#20402D] hover:underline"
            >
              <Sparkles size={13} />
              Сомневаетесь? Спросить стилиста Веру
            </button>
            <span className="text-[10px] text-[#888888]">Возврат 14 дней</span>
          </div>
        </div>

        {/* Measurement mini guide */}
        <div className="mt-6 pt-5 border-t border-[#E2E2E2] text-xs text-[#2B2620]/70 space-y-1">
          <p className="font-semibold text-[#2B2620] flex items-center gap-1">
            <HelpCircle size={14} className="text-[#20402D]" />
            Как замерить стопу за 1 минуту:
          </p>
          <p className="text-[11px] leading-relaxed">
            1. Положите лист А4 на пол вплотную к стене. <br />
            2. Встаньте пяткой к стене и отметьте карандашом самую выступающую точку пальца. <br />
            3. Измерьте линейкой расстояние от края листа до метки
          </p>
        </div>
      </div>
    </div>
  );
}
