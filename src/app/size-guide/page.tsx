"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { SIZE_TABLE, SITE_PHOTOS, sitePhoto } from "@/data/mockData";
import { useShop } from "@/context/ShopContext";
import { ShoeSize } from "@/types";
import HomeSizeCalculator from "@/components/HomeSizeCalculator";
import { asset } from "@/lib/asset";

const STEPS = [
  ["Встань на лист", "Положи лист бумаги на пол и встань на него босой ногой, перенеся вес на эту ногу"],
  ["Обведи стопу", "Проведи карандашом по контуру стопы, держа его строго вертикально"],
  ["Измерь длину", "Линейкой – от самой выступающей точки пятки до кончика самого длинного пальца"],
  ["Возьми большее", "Повтори со второй ногой и ориентируйся на большее значение. Лучше мерить вечером"],
];

export default function SizeGuidePage() {
  const router = useRouter();
  const { setSelectedSize, setIsVeraOpen } = useShop();

  const openSize = (size: number) => {
    setSelectedSize(size as ShoeSize);
    router.push("/catalog");
  };

  return (
    <div className="bg-[#F3F3F3] text-[#2B2620] min-h-screen">
      {/* Hero */}
      <section className="max-w-[1400px] mx-auto px-5 sm:px-8 pt-10 sm:pt-16 pb-16 lg:pb-24 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        <div className="lg:col-span-6">
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#2B2620]/50">Гид по размерам · 37–44</span>
          <h1 className="mt-4 font-display uppercase text-[clamp(48px,7vw,112px)] leading-[1.02] tracking-[-0.01em]">
            Твой <span className="text-accent">идеальный</span> размер
          </h1>
          <p className="mt-6 text-[16px] sm:text-[17px] text-[#2B2620]/65 leading-relaxed max-w-lg">
            Размер обуви – это длина стопы, а ещё её ширина и подъём. Поэтому у каждой модели Tallora мы указываем
            точную длину стельки для каждого размера. Измерь стопу один раз – и выбирай уверенно
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {[37, 38, 39, 40, 41, 42, 43, 44].map((s) => (
              <button
                key={s}
                onClick={() => openSize(s)}
                className="w-12 h-12 rounded-full bg-white border border-[#2B2620]/10 hover:bg-[#20402D] hover:border-[#20402D] hover:text-white font-display text-[17px] transition-colors cursor-pointer"
                aria-label={`Показать модели ${s} размера`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
        <div className="lg:col-span-6 relative aspect-[4/5] lg:aspect-[5/6] rounded-[28px] overflow-hidden bg-[#E8E8E8]">
          <Image src={sitePhoto("tild3666-3730-4262-b466-393230646133")} alt="Ноги в босоножках Tallora" fill preload sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover object-[50%_70%]" />
        </div>
      </section>

      {/* Calculator */}
      <HomeSizeCalculator />

      {/* How to measure */}
      <section className="max-w-[1400px] mx-auto px-5 sm:px-8 py-20 lg:py-28 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
        <div className="lg:col-span-4">
          <h2 className="font-display uppercase text-[clamp(40px,5vw,80px)] leading-[1.05] tracking-[-0.01em]">
            Как измерить <span className="text-accent">стопу</span>
          </h2>
          <p className="mt-5 text-[15px] text-[#2B2620]/65 leading-relaxed">Понадобятся лист бумаги, карандаш и линейка. Займёт пару минут</p>
          <div className="mt-8 relative aspect-[4/5] rounded-[28px] overflow-hidden bg-[#E8E8E8] hidden lg:block">
            <Image src={SITE_PHOTOS.redHeel} alt="Нога в босоножке Tallora" fill sizes="30vw" className="object-cover object-bottom" />
          </div>
        </div>
        <ol className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4 self-start">
          {STEPS.map(([t, d], i) => (
            <li key={t} className="rounded-[28px] bg-white p-7 sm:p-8">
              <span className="font-display text-[64px] leading-none text-accent">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-5 font-display uppercase text-[24px] leading-tight">{t}</h3>
              <p className="mt-2 text-[15px] text-[#2B2620]/65 leading-relaxed">{d}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Table */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-[1100px] mx-auto px-5 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-5">
            <h2 className="font-display uppercase text-[clamp(40px,5vw,80px)] leading-[1.05] tracking-[-0.01em]">
              Таблица <span className="text-accent">размеров</span>
            </h2>
            <p className="text-[14px] text-[#2B2620]/55 max-w-xs">Длина стельки по всем моделям каталога. Нажми на размер – покажем пары в наличии</p>
          </div>
          <div className="mt-10 border-t border-[#2B2620]/12">
            <div className="grid grid-cols-[1fr_1fr_1.4fr_40px] gap-4 py-3 text-[11px] uppercase tracking-[0.2em] text-[#2B2620]/45">
              <span>Размер</span>
              <span>Обычно</span>
              <span>Диапазон по моделям</span>
              <span />
            </div>
            {SIZE_TABLE.map((row) => (
              <button
                key={row.size}
                onClick={() => openSize(row.size)}
                className="group w-full grid grid-cols-[1fr_1fr_1.4fr_40px] gap-4 items-center py-5 border-t border-[#2B2620]/10 text-left hover:bg-[#F5F0E8] transition-colors rounded-xl px-2 -mx-2 cursor-pointer"
              >
                <span className="font-display text-[34px] leading-none">{row.size}</span>
                <span className="font-display text-[20px] text-[#20402D]">{row.typical} см</span>
                <span className="text-[15px] text-[#2B2620]/65">{row.lengthCm} см</span>
                <span className="w-10 h-10 rounded-full border border-[#2B2620]/12 group-hover:bg-[#20402D] group-hover:border-[#20402D] group-hover:text-white flex items-center justify-center transition-colors">
                  <ArrowUpRight size={16} />
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Stylist */}
      <section className="max-w-[1400px] mx-auto px-5 sm:px-8 py-20">
        <button onClick={() => setIsVeraOpen(true)} className="group w-full border-t border-[#2B2620]/12 pt-12 flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-10 text-left cursor-pointer">
          <span className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden shrink-0">
            <Image src={asset("/tallora/vera.webp")} alt="Стилист Вера" fill sizes="112px" className="object-cover" />
          </span>
          <span className="flex-1">
            <span className="block font-display uppercase text-[clamp(32px,4vw,56px)] leading-[1.05] text-[#2B2620]">
              Сомневаешься? <span className="text-accent">Помощь стилиста</span>
            </span>
            <span className="mt-3 block text-[15px] text-[#2B2620]/65 max-w-xl">
              Вера подскажет размер по конкретной модели, учтёт полноту и подъём стопы и подберёт пару под образ
            </span>
          </span>
          <span className="w-14 h-14 rounded-full bg-[#20402D] text-white flex items-center justify-center shrink-0 group-hover:rotate-[-45deg] transition-transform duration-500">
            <ArrowUpRight size={22} />
          </span>
        </button>
      </section>
    </div>
  );
}
