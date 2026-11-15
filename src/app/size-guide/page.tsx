"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Ruler, Check, HelpCircle, ArrowRight, Sparkles, ShieldCheck } from "lucide-react";
import { SIZE_TABLE } from "@/data/mockData";
import { useShop } from "@/context/ShopContext";
import { ShoeSize } from "@/types";
import { useRouter } from "next/navigation";

export default function SizeGuidePage() {
  const { setSelectedSize, setIsVeraOpen } = useShop();
  const router = useRouter();

  const [cm, setCm] = useState(27.4);
  const [width, setWidth] = useState<"narrow" | "standard" | "wide">("standard");

  const calcSize = (): { size: ShoeSize; desc: string } => {
    let effective = cm;
    if (width === "wide") effective += 0.3;
    if (width === "narrow") effective -= 0.2;

    if (effective < 25.4) return { size: 39, desc: "25.0 – 25.4 см · стопа сидит плотно без скольжения" };
    if (effective < 26.1) return { size: 40, desc: "25.5 – 26.0 см · мягкая посадка в пучковой зоне" };
    if (effective < 26.8) return { size: 41, desc: "26.1 – 26.7 см · свободное движение пальцев" };
    if (effective < 27.5) return { size: 42, desc: "26.8 – 27.4 см · идеальный анатомический подъем" };
    if (effective < 28.3) return { size: 43, desc: "27.5 – 28.2 см · анатомическая поддержка свода" };
    return { size: 44, desc: "28.3 – 29.0 см · удлинённая стелька до 29 см" };
  };

  const calculated = calcSize();

  const handleApply = () => {
    setSelectedSize(calculated.size);
    router.push(`/catalog?size=${calculated.size}`);
  };

  return (
    <div className="bg-[#F4EFE8] min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-16">
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-[0.3em] text-[#6B0F1A] font-semibold block mb-2">
            Идеальная посадка
          </span>
          <h1 className="font-serif text-3xl sm:text-6xl text-[#0E0E0E]">
            Гид по размерам TALLORA
          </h1>
          <p className="text-sm text-[#0E0E0E]/70 mt-3 leading-relaxed">
            Мы знаем главную боль: «в одном магазине 42 мал, в другом 43 слетает». Обувь TALLORA
            шьётся по единому стандарту колодки с шагом в полразмера для точной посадки.
          </p>
        </div>

        {/* Interactive Calculator Section */}
        <div className="bg-[#0E0E0E] text-[#F4EFE8] p-8 sm:p-12 border border-[#222222] shadow-2xl">
          <div className="text-center mb-8">
            <span className="text-xs uppercase tracking-[0.25em] text-[#C9B8A3] block mb-1">
              Шаг 1. Онлайн-расчёт
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl text-[#F4EFE8]">
              Интерактивный калькулятор стопы
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center max-w-4xl mx-auto">
            <div className="md:col-span-7 space-y-6">
              <div>
                <div className="flex justify-between items-baseline mb-2">
                  <span className="text-xs uppercase tracking-wider text-[#C9B8A3] flex items-center gap-1.5">
                    <Ruler size={16} /> Длина стопы:
                  </span>
                  <span className="font-serif text-3xl font-bold text-[#F4EFE8]">
                    {cm.toFixed(1)} <span className="text-sm text-[#C9B8A3] font-normal">см</span>
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

            <div className="md:col-span-5 bg-[#1C1C1E] border border-[#333333] p-6 text-center flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#C9B8A3] block mb-1">
                  Рекомендуемый размер
                </span>
                <div className="font-serif text-6xl font-bold text-[#F4EFE8] my-2">
                  {calculated.size}
                </div>
                <p className="text-xs text-[#F4EFE8]/70 leading-relaxed mb-4">
                  {calculated.desc}
                </p>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleApply}
                  className="w-full bg-[#6B0F1A] hover:bg-[#8E1624] text-[#F4EFE8] py-3.5 px-4 text-xs uppercase tracking-[0.2em] font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Показать модели {calculated.size} размера</span>
                  <ArrowRight size={14} />
                </button>
                <button
                  onClick={() => setIsVeraOpen(true)}
                  className="w-full text-center text-[11px] text-[#C9B8A3] hover:underline flex items-center justify-center gap-1.5"
                >
                  <Sparkles size={12} />
                  <span>Уточнить у стилиста Веры</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Step 2: How to measure */}
        <div className="bg-[#F9F6F0] p-8 sm:p-12 border border-[#E2D9CC]">
          <div className="text-center mb-10">
            <span className="text-xs uppercase tracking-[0.25em] text-[#6B0F1A] font-semibold block mb-1">
              Инструкция
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl text-[#0E0E0E]">
              Как точно измерить стопу дома
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#6B0F1A] text-[#F4EFE8] font-serif text-lg font-bold flex items-center justify-center">
                1
              </div>
              <h3 className="font-serif text-lg text-[#0E0E0E]">Лист А4 к стене</h3>
              <p className="text-xs text-[#0E0E0E]/70 leading-relaxed">
                Положите лист бумаги формата А4 на ровный твердый пол, вплотную к вертикальной плинтусной стене.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#6B0F1A] text-[#F4EFE8] font-serif text-lg font-bold flex items-center justify-center">
                2
              </div>
              <h3 className="font-serif text-lg text-[#0E0E0E]">Встаньте всем весом</h3>
              <p className="text-xs text-[#0E0E0E]/70 leading-relaxed">
                Поставьте ногу на лист так, чтобы пятка слегка касалась стены. Перенесите вес на измеряемую ногу — под нагрузкой стопа удлиняется на 3–5 мм!
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#6B0F1A] text-[#F4EFE8] font-serif text-lg font-bold flex items-center justify-center">
                3
              </div>
              <h3 className="font-serif text-lg text-[#0E0E0E]">Отметка карандашом</h3>
              <p className="text-xs text-[#0E0E0E]/70 leading-relaxed">
                Держите карандаш строго вертикально (угол 90° к полу) и проведите черту по самой выступающей точке пальцев. Измерьте линейкой расстояние от края листа до черты.
              </p>
            </div>
          </div>
        </div>

        {/* Step 3: Full Size Chart Table */}
        <div className="bg-[#F9F6F0] p-8 sm:p-12 border border-[#E2D9CC]">
          <div className="text-center mb-8">
            <span className="text-xs uppercase tracking-[0.25em] text-[#6B0F1A] font-semibold block mb-1">
              Официальный стандарт TALLORA
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl text-[#0E0E0E]">
              Таблица размеров женской обуви (39–44)
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="bg-[#0E0E0E] text-[#F4EFE8] text-[11px] uppercase tracking-wider">
                  <th className="p-3.5 sm:p-4">Размер TALLORA</th>
                  <th className="p-3.5 sm:p-4">Длина стопы (см)</th>
                  <th className="p-3.5 sm:p-4">Ширина пучков (мм)</th>
                  <th className="p-3.5 sm:p-4">Соответствие РФ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2D9CC] font-mono text-xs">
                {SIZE_TABLE.map((row) => (
                  <tr
                    key={row.size}
                    className={`hover:bg-[#F4EFE8] transition-colors ${
                      calculated.size === row.size ? "bg-[#6B0F1A]/10 font-bold" : ""
                    }`}
                  >
                    <td className="p-3.5 sm:p-4 font-serif text-base text-[#0E0E0E] flex items-center gap-2">
                      <span className="font-bold text-[#6B0F1A]">{row.size}</span>
                      {calculated.size === row.size && (
                        <span className="text-[10px] bg-[#6B0F1A] text-[#F4EFE8] px-1.5 py-0.5 rounded-xs uppercase tracking-wider font-sans">
                          Ваш расчёт
                        </span>
                      )}
                    </td>
                    <td className="p-3.5 sm:p-4 text-[#0E0E0E]">{row.lengthCm}</td>
                    <td className="p-3.5 sm:p-4 text-[#0E0E0E]/80">{row.widthMm}</td>
                    <td className="p-3.5 sm:p-4 text-[#0E0E0E]/80">{row.russianSize}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 p-4 bg-[#F4EFE8] border border-[#E2D9CC] flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-[#0E0E0E]">
              <ShieldCheck size={18} className="text-[#6B0F1A] shrink-0" />
              <span>Сомневаетесь между двумя размерами? Закажите обе пары на примерку курьером!</span>
            </div>
            <Link
              href="/catalog"
              className="text-[#6B0F1A] hover:underline font-semibold shrink-0 uppercase tracking-wider text-[11px]"
            >
              В каталог →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
