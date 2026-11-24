"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import { useShop } from "@/context/ShopContext";
import { SITE_PHOTOS } from "@/data/mockData";
import { ShoeSize } from "@/types";

const SIZES: ShoeSize[] = [37, 38, 39, 40, 41, 42, 43, 44];

const PERKS = [
  { value: "5%", title: "на первый заказ", text: "Персональная скидка приходит сразу после вступления в клуб" },
  { value: "до 10%", title: "бонусами с покупок", text: "Часть стоимости возвращается бонусами – ими можно оплатить следующие пары" },
  { value: "Первой", title: "о новых коллекциях", text: "Новинки, закрытые распродажи и предложения – раньше всех" },
];

const STEPS = [
  ["Оставь имя и почту", "Укажи размер – будем присылать только то, что есть в наличии именно в нём"],
  ["Получи скидку 5%", "Персональное письмо со скидкой на первый заказ придёт сразу"],
  ["Копи бонусы", "С каждой покупки до 10% возвращается бонусами на следующие пары"],
];

export default function PriveClubPage() {
  const { setIsPriveMember } = useShop();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [size, setSize] = useState<ShoeSize | null>(null);
  const [joined, setJoined] = useState(false);

  const join = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) return;
    setIsPriveMember(true);
    setJoined(true);
  };

  return (
    <div className="bg-[#F5F0E8] text-[#2B2620] min-h-screen">
      {/* Hero */}
      <section className="grid grid-cols-1 lg:grid-cols-2 lg:min-h-[calc(100svh-96px)]">
        <div className="bg-[#20402D] text-white px-5 sm:px-10 lg:px-16 py-16 lg:py-20 flex flex-col justify-between gap-12">
          <span className="text-[11px] uppercase tracking-[0.3em] text-white/60">Закрытый клуб для своих</span>
          <div>
            <h1 className="font-display uppercase text-[clamp(96px,15vw,240px)] leading-[0.95] tracking-[-0.03em]">Privé</h1>
            <p className="mt-8 font-display uppercase text-[clamp(24px,2.6vw,38px)] leading-[1.25]">
              Новинки раньше всех
              <br />
              Распродажи первой
              <br />
              <span className="text-accent-light">Скидка всегда</span>
            </p>
          </div>
          <a href="#join" className="btn-shine self-start group inline-flex h-14 pl-7 pr-2 rounded-full bg-white text-[#20402D] items-center gap-8 text-[12px] uppercase tracking-[0.22em] font-semibold">
            Вступить в клуб
            <span className="w-10 h-10 rounded-full bg-[#20402D] text-white flex items-center justify-center group-hover:rotate-[-45deg] transition-transform duration-500">
              <ArrowRight size={16} />
            </span>
          </a>
        </div>
        <div className="relative min-h-[70svh] lg:min-h-0">
          <Image src={SITE_PHOTOS.redBoots} alt="Девушка в замшевых сапогах Tallora" fill preload sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover object-[50%_40%]" />
        </div>
      </section>

      {/* Perks */}
      <section className="max-w-[1400px] mx-auto px-5 sm:px-8 py-20 lg:py-28">
        <h2 className="font-display uppercase text-[clamp(40px,6vw,96px)] leading-[1.05] tracking-[-0.01em]">
          Что даёт <span className="text-accent">клуб</span>
        </h2>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 border-t border-[#2B2620]/15">
          {PERKS.map((p, i) => (
            <div key={p.title} className={`py-10 md:px-8 md:first:pl-0 ${i > 0 ? "border-t md:border-t-0 md:border-l border-[#2B2620]/15" : ""}`}>
              <span className="font-display uppercase text-[clamp(64px,7vw,110px)] leading-none text-accent">{p.value}</span>
              <h3 className="mt-4 font-display uppercase text-[26px] leading-tight">{p.title}</h3>
              <p className="mt-3 text-[15px] text-[#2B2620]/65 leading-relaxed max-w-xs">{p.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <h2 className="lg:col-span-4 font-display uppercase text-[clamp(40px,5vw,80px)] leading-[1.05] tracking-[-0.01em]">
            Как это <span className="text-accent">работает</span>
          </h2>
          <ol className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-8">
            {STEPS.map(([t, d], i) => (
              <li key={t}>
                <span className="w-14 h-14 rounded-full bg-[#20402D] text-white font-display text-2xl flex items-center justify-center">{i + 1}</span>
                <h3 className="mt-6 font-display uppercase text-[22px] leading-tight">{t}</h3>
                <p className="mt-2 text-[15px] text-[#2B2620]/65 leading-relaxed">{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Join */}
      <section id="join" className="max-w-[1400px] mx-auto px-5 sm:px-8 py-20 lg:py-28 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 scroll-mt-28">
        <div className="lg:col-span-5">
          <h2 className="font-display uppercase text-[clamp(44px,6vw,96px)] leading-[1.05] tracking-[-0.01em]">
            Добро <span className="text-accent">пожаловать</span>
          </h2>
          <p className="mt-6 text-[16px] text-[#2B2620]/70 leading-relaxed max-w-md">
            Вступление бесплатное. Скидка 5% на первый заказ – сразу на почту, бонусы – с каждой покупки
          </p>
        </div>

        <div className="lg:col-span-7 rounded-[32px] bg-white p-6 sm:p-10">
          {joined ? (
            <div className="py-10 text-center">
              <span className="mx-auto w-16 h-16 rounded-full bg-[#20402D] text-white flex items-center justify-center">
                <Check size={28} />
              </span>
              <h3 className="mt-6 font-display uppercase text-[34px] leading-tight">{name}, ты в клубе</h3>
              <p className="mt-3 text-[15px] text-[#2B2620]/65 max-w-sm mx-auto">
                Письмо с персональной скидкой 5% уже летит на {email}
              </p>
              <Link href="/catalog" className="mt-8 inline-flex h-14 px-8 rounded-full bg-[#20402D] text-white items-center gap-3 text-[12px] uppercase tracking-[0.2em] font-semibold">
                Выбрать пару <ArrowRight size={15} />
              </Link>
            </div>
          ) : (
            <form onSubmit={join} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-[11px] uppercase tracking-[0.2em] text-[#2B2620]/50">Имя</span>
                  <input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Как к тебе обращаться"
                    className="mt-2 w-full h-14 px-5 rounded-full bg-[#F5F0E8] text-[15px] placeholder:text-[#2B2620]/35 focus:outline-none focus:ring-2 focus:ring-[#20402D]/30"
                  />
                </label>
                <label className="block">
                  <span className="text-[11px] uppercase tracking-[0.2em] text-[#2B2620]/50">E-mail</span>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@mail.ru"
                    className="mt-2 w-full h-14 px-5 rounded-full bg-[#F5F0E8] text-[15px] placeholder:text-[#2B2620]/35 focus:outline-none focus:ring-2 focus:ring-[#20402D]/30"
                  />
                </label>
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-[0.2em] text-[#2B2620]/50">Мой размер</span>
                <div className="mt-2 grid grid-cols-8 gap-1.5">
                  {SIZES.map((sz) => (
                    <button
                      type="button"
                      key={sz}
                      onClick={() => setSize(sz)}
                      className={`h-12 rounded-full font-display text-[16px] border transition-colors cursor-pointer ${
                        size === sz ? "bg-[#20402D] border-[#20402D] text-white" : "border-[#2B2620]/12 hover:border-[#20402D]"
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
              <button type="submit" className="btn-shine w-full h-16 rounded-full bg-[#20402D] hover:bg-[#183326] text-white text-[13px] uppercase tracking-[0.2em] font-semibold flex items-center justify-center gap-3 transition-colors cursor-pointer">
                Получить скидку 5% <ArrowRight size={16} />
              </button>
              <p className="text-[11px] text-[#2B2620]/45 text-center">
                Нажимая кнопку, ты соглашаешься с политикой конфиденциальности и обработкой персональных данных
              </p>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
