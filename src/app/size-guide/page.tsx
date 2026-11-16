"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Ruler, Check, HelpCircle, ArrowRight, Sparkles, ShieldCheck } from "lucide-react";
import { SIZE_TABLE } from "@/data/mockData";
import { useShop } from "@/context/ShopContext";
import { ShoeSize } from "@/types";
import { useRouter } from "next/navigation";
import { sizeForFoot } from "@/lib/size";

export default function SizeGuidePage() {
  const { setSelectedSize, setIsVeraOpen } = useShop();
  const router = useRouter();

  const [cm, setCm] = useState(26.5);
  const [width, setWidth] = useState<"narrow" | "standard" | "wide">("standard");

  const calcSize = () => sizeForFoot(cm, width);

  const calculated = calcSize();

  const handleApply = () => {
    setSelectedSize(calculated.size);
    router.push(`/catalog?size=${calculated.size}`);
  };

  return (
    <div className="bg-[#F3F3F3] min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-16">
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-[0.3em] text-[#8F6D2F] font-semibold block mb-2">
            Идеальная посадка
          </span>
          <h1 className="font-serif text-3xl sm:text-6xl text-[#2B2620]">
            Твой <span className="italic text-[#B8914A]">идеальный</span> размер
          </h1>
          <p className="text-sm text-[#2B2620]/70 mt-3 leading-relaxed">
            Размер обуви зависит от длины стопы, а ещё от её ширины, подъёма и особенностей
            строения. Поэтому у каждой модели Tallora мы указываем длину стельки для каждого размера – от 37 до 44.
          </p>
        </div>

        {/* Interactive Calculator Section */}
        <div className="bg-[#F5F0E8] text-[#2B2620] p-8 sm:p-12 border border-[#E2E2E2] shadow-2xl rounded-[24px]">
          <div className="text-center mb-8">
            <span className="text-xs uppercase tracking-[0.25em] text-[#8F6D2F] block mb-1">
              Шаг 1. Онлайн-расчёт
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl text-[#2B2620]">
              Интерактивный калькулятор стопы
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center max-w-4xl mx-auto">
            <div className="md:col-span-7 space-y-6">
              <div>
                <div className="flex justify-between items-baseline mb-2">
                  <span className="text-xs uppercase tracking-wider text-[#8F6D2F] flex items-center gap-1.5">
                    <Ruler size={16} /> Длина стопы:
                  </span>
                  <span className="font-serif text-3xl font-bold text-[#2B2620]">
                    {cm.toFixed(1)} <span className="text-sm text-[#8F6D2F] font-normal">см</span>
                  </span>
                </div>
                <input
                  type="range"
                  min="23"
                  max="29.5"
                  step="0.1"
                  value={cm}
                  onChange={(e) => setCm(parseFloat(e.target.value))}
                  className="w-full accent-[#DAB16B] cursor-pointer h-2 bg-[#EFEAE2] rounded-lg"
                />
              </div>

              <div>
                <span className="text-xs uppercase tracking-wider text-[#8F6D2F] block mb-2">
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
                          ? "bg-[#DAB16B] text-[#2B2620] border-[#DAB16B] font-semibold"
                          : "bg-[#EFEAE2] text-[#2B2620]/80 border-[#E2E2E2] hover:border-[#DAB16B]"
                      }`}
                    >
                      {w.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="md:col-span-5 bg-white border border-[#E2E2E2] p-6 text-center flex flex-col justify-between rounded-[24px]">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#8F6D2F] block mb-1">
                  Рекомендуемый размер
                </span>
                <div className="font-serif text-6xl font-bold text-[#2B2620] my-2">
                  {calculated.size}
                </div>
                <p className="text-xs text-[#2B2620]/70 leading-relaxed mb-4">
                  {calculated.desc}
                </p>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleApply}
                  className="w-full bg-[#DAB16B] hover:bg-[#C99B4F] text-[#2B2620] py-3.5 px-4 text-xs uppercase tracking-[0.2em] font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer rounded-full"
                >
                  <span>Показать модели {calculated.size} размера</span>
                  <ArrowRight size={14} />
                </button>
                <button
                  onClick={() => setIsVeraOpen(true)}
                  className="w-full text-center text-[11px] text-[#8F6D2F] hover:underline flex items-center justify-center gap-1.5"
                >
                  <Sparkles size={12} />
                  <span>Уточнить у стилиста Веры</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Step 2: How to measure */}
        <div className="bg-[#FFFFFF] p-8 sm:p-12 border border-[#E2E2E2] rounded-[24px]">
          <div className="text-center mb-10">
            <span className="text-xs uppercase tracking-[0.25em] text-[#8F6D2F] font-semibold block mb-1">
              Инструкция
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl text-[#2B2620]">
              Как точно измерить стопу дома
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#DAB16B] text-[#2B2620] font-serif text-lg font-bold flex items-center justify-center">
                1
              </div>
              <h3 className="font-serif text-lg text-[#2B2620]">Обведите стопу</h3>
              <p className="text-xs text-[#2B2620]/70 leading-relaxed">
                Встаньте на лист бумаги и обведите контур стопы карандашом, держа его строго вертикально.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#DAB16B] text-[#2B2620] font-serif text-lg font-bold flex items-center justify-center">
                2
              </div>
              <h3 className="font-serif text-lg text-[#2B2620]">Измерьте длину</h3>
              <p className="text-xs text-[#2B2620]/70 leading-relaxed">
                Измерьте расстояние от самой выступающей точки пятки до кончика большого пальца. Повторите для второй ноги – часто размеры немного отличаются.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#DAB16B] text-[#2B2620] font-serif text-lg font-bold flex items-center justify-center">
                3
              </div>
              <h3 className="font-serif text-lg text-[#2B2620]">Вечером и по большей</h3>
              <p className="text-xs text-[#2B2620]/70 leading-relaxed">
                Ориентируйтесь на большую стопу. Лучше мерить во второй половине дня – к вечеру стопа немного увеличивается. Между носком обуви и пальцами должно остаться около 5 мм.
              </p>
            </div>
          </div>
        </div>

        {/* Step 3: Full Size Chart Table */}
        <div className="bg-[#FFFFFF] p-8 sm:p-12 border border-[#E2E2E2] rounded-[24px]">
          <div className="text-center mb-8">
            <span className="text-xs uppercase tracking-[0.25em] text-[#8F6D2F] font-semibold block mb-1">
              По всем моделям каталога
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl text-[#2B2620]">
              Длина стельки Tallora (37–44)
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="bg-[#DAB16B] text-[#2B2620] text-[11px] uppercase tracking-wider">
                  <th className="p-3.5 sm:p-4">Размер TALLORA</th>
                  <th className="p-3.5 sm:p-4">Обычно (см)</th>
                  <th className="p-3.5 sm:p-4">Диапазон по моделям (см)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E2E2] font-mono text-xs">
                {SIZE_TABLE.map((row) => (
                  <tr
                    key={row.size}
                    className={`hover:bg-[#F3F3F3] transition-colors ${
                      calculated.size === row.size ? "bg-[#DAB16B]/10 font-bold" : ""
                    }`}
                  >
                    <td className="p-3.5 sm:p-4 font-serif text-base text-[#2B2620] flex items-center gap-2">
                      <span className="font-bold text-[#8F6D2F]">{row.size}</span>
                      {calculated.size === row.size && (
                        <span className="text-[10px] bg-[#DAB16B] text-[#2B2620] px-1.5 py-0.5 rounded-xs uppercase tracking-wider font-sans">
                          Ваш расчёт
                        </span>
                      )}
                    </td>
                    <td className="p-3.5 sm:p-4 text-[#2B2620]">{row.typical}</td>
                    <td className="p-3.5 sm:p-4 text-[#2B2620]/80">{row.lengthCm}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 p-4 bg-[#F3F3F3] border border-[#E2E2E2] flex items-center justify-between text-xs rounded-2xl">
            <div className="flex items-center gap-2 text-[#2B2620]">
              <ShieldCheck size={18} className="text-[#8F6D2F] shrink-0" />
              <span>Длина стельки отличается от модели к модели – точное значение смотрите в карточке товара. Сомневаетесь? Напишите нам.</span>
            </div>
            <Link
              href="/catalog"
              className="text-[#8F6D2F] hover:underline font-semibold shrink-0 uppercase tracking-wider text-[11px]"
            >
              В каталог →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
