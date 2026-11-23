"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { CONTACTS } from "@/data/mockData";
import Logo from "@/components/Logo";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
    }
  };

  return (
    <footer className="bg-[#EFE6D6] text-[#2B2620] pt-24 pb-0 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
        {/* Top section: Big editorial brand quote and newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-[#2B2620]/12">
          <div className="lg:col-span-7 space-y-5">
            <span className="text-[#20402D] text-xs uppercase tracking-[0.3em] font-medium block">
              Tallora - обувь для высоких девушек
            </span>
            <h2 className="uppercase font-display text-4xl sm:text-6xl leading-[0.95] text-[#2B2620]">
              Мой стиль · Мой размер <br className="hidden sm:inline" />
              <span className="font-normal text-[#20402D]">Моя свобода</span>
            </h2>
            <p className="text-[#2B2620]/70 text-sm max-w-lg leading-relaxed pt-2">
              Стильная и удобная женская обувь 37–44 размера из натуральной кожи и замши. Без пластика.
              Без боли. Без компромиссов
            </p>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-[#20402D] block mb-2 font-medium">
                Клуб TALLORA PRIVÉ
              </span>
              <p className="text-sm text-[#2B2620]/80 mb-5 leading-relaxed">
                5% на первый заказ, до 10% бонусами с покупок и ранний доступ к новым коллекциям
              </p>

              {subscribed ? (
                <div className="flex items-center gap-2 p-4 rounded-2xl bg-white border border-[#20402D] text-xs text-[#2B2620]">
                  <CheckCircle2 size={16} className="text-[#20402D]" />
                  <span>Вы в клубе! Мы пришлём письмо со скидкой 5% на первый заказ</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-3">
                  <div className="flex h-14 rounded-full border border-[#2B2620]/20 focus-within:border-[#20402D] p-1.5 transition-colors">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Ваш e-mail"
                      required
                      className="bg-transparent px-4 text-sm text-[#2B2620] placeholder:text-[#2B2620]/40 focus:outline-none flex-grow min-w-0"
                    />
                    <button
                      type="submit"
                      className="bg-[#20402D] hover:bg-[#183326] text-white px-6 rounded-full text-[11px] uppercase tracking-[0.2em] font-semibold transition-colors cursor-pointer"
                    >
                      Вступить
                    </button>
                  </div>
                  <p className="text-[10px] text-[#2B2620]/55 leading-normal">
                    Нажимая кнопку, вы соглашаетесь с Политикой конфиденциальности и обработкой ПДн
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Middle navigation columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-14 border-b border-[#2B2620]/12 text-xs">
          <div>
            <h4 className="font-display text-sm tracking-[0.2em] uppercase text-[#2B2620] mb-5">
              Коллекция
            </h4>
            <ul className="space-y-3 text-[#2B2620]/70">
              <li><Link href="/catalog?category=tufli" className="hover:text-[#20402D] transition-colors">Туфли</Link></li>
              <li><Link href="/catalog?category=bosonozhki" className="hover:text-[#20402D] transition-colors">Босоножки и сандали</Link></li>
              <li><Link href="/catalog?category=lofery" className="hover:text-[#20402D] transition-colors">Лоферы</Link></li>
              <li><Link href="/catalog?category=baletki" className="hover:text-[#20402D] transition-colors">Балетки</Link></li>
              <li><Link href="/catalog?category=sapogi" className="hover:text-[#20402D] transition-colors">Сапоги и ботильоны</Link></li>
              <li><Link href="/catalog" className="text-[#20402D] hover:underline pt-1 inline-block">Все модели (37–44)</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm tracking-[0.2em] uppercase text-[#2B2620] mb-5">
              Сервис и подбор
            </h4>
            <ul className="space-y-3 text-[#2B2620]/70">
              <li><Link href="/size-guide" className="hover:text-[#20402D] transition-colors">Калькулятор стопы по см</Link></li>
              <li><Link href="/delivery" className="hover:text-[#20402D] transition-colors">Доставка по России</Link></li>
              <li><Link href="/delivery" className="hover:text-[#20402D] transition-colors">Возврат 14 дней</Link></li>
              <li><Link href="/prive" className="hover:text-[#20402D] transition-colors">Бонусная программа PRIVÉ</Link></li>
              <li><Link href="/faq" className="hover:text-[#20402D] transition-colors">Частые вопросы</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm tracking-[0.2em] uppercase text-[#2B2620] mb-5">
              О бренде
            </h4>
            <ul className="space-y-3 text-[#2B2620]/70">
              <li><Link href="/about" className="hover:text-[#20402D] transition-colors">О нашем бренде</Link></li>
              <li><Link href="/about#interview" className="hover:text-[#20402D] transition-colors">Интервью с основателем</Link></li>
              <li><Link href="/lookbook" className="hover:text-[#20402D] transition-colors">Галерея образов</Link></li>
              <li><Link href="/size-guide" className="hover:text-[#20402D] transition-colors">Руководство по выбору</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm tracking-[0.2em] uppercase text-[#2B2620] mb-5">
              Контакты
            </h4>
            <a href={CONTACTS.phoneHref} className="block font-display text-2xl text-[#2B2620] mb-2 hover:text-[#20402D]">
              {CONTACTS.phone}
            </a>
            <a href={`mailto:${CONTACTS.email}`} className="block text-[#2B2620]/70 mb-3 hover:text-[#20402D]">
              {CONTACTS.email}
            </a>
            <div className="flex gap-4 pt-2">
              <a
                href={CONTACTS.telegram}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-[#20402D] hover:underline"
              >
                Telegram <ArrowUpRight size={13} />
              </a>
              <a
                href={CONTACTS.max}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-[#20402D] hover:underline"
              >
                MAX <ArrowUpRight size={13} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright & legal compliance */}
        <div className="pt-8 pb-4 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#2B2620]/55 gap-4">
          <p>
            © 2025 Tallora · {CONTACTS.company} · ИНН {CONTACTS.inn} · ОГРНИП {CONTACTS.ogrnip}
          </p>
          <div className="flex flex-wrap gap-5 text-center">
            {[
              ["Пользовательское соглашение", "agreement"],
              ["Публичная оферта", "oferta"],
              ["Политика обработки ПДн", "privacy"],
              ["Cookie", "cookie"],
            ].map(([label, slug]) => (
              <a key={slug} href={`https://tallora.ru/${slug}`} target="_blank" rel="noreferrer" className="hover:text-[#2B2620] transition-colors">
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Giant wordmark */}
      <div aria-hidden className="mt-12 px-5 sm:px-8 select-none pointer-events-none text-[#2B2620]/[0.07] translate-y-[18%]">
        <Logo className="w-full h-auto max-w-[1400px] mx-auto" />
      </div>
    </footer>
  );
}
