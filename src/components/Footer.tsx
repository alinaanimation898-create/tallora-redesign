"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";

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
    <footer className="bg-[#0E0E0E] text-[#F4EFE8] pt-20 pb-12 border-t border-[#222222]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top section: Big editorial brand quote and newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-[#222222]">
          <div className="lg:col-span-7 space-y-5">
            <span className="text-[#C9B8A3] text-xs uppercase tracking-[0.3em] font-medium block">
              Манифест TALLORA
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-light tracking-wide leading-tight text-[#F4EFE8]">
              «Ты выше всех в комнате. <br className="hidden sm:inline" />
              <span className="italic font-normal text-[#C9B8A3]">И это твоя абсолютная власть».</span>
            </h2>
            <p className="text-[#F4EFE8]/70 text-sm max-w-lg leading-relaxed pt-2">
              Мы создаём сексуальную, архитектурную обувь 39–44 размеров с пропорциями каблука и
              колодки, выверенными специально под высокий рост.
            </p>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-[#C9B8A3] block mb-2 font-medium">
                Клуб TALLORA PRIVÉ
              </span>
              <p className="text-sm text-[#F4EFE8]/80 mb-5 leading-relaxed">
                Получите персональную скидку 5% на первый заказ и приглашения на закрытые дропы.
              </p>

              {subscribed ? (
                <div className="flex items-center gap-2 p-3 bg-[#1C1C1E] border border-[#6B0F1A] text-xs text-[#F4EFE8]">
                  <CheckCircle2 size={16} className="text-[#C9B8A3]" />
                  <span>Вы в клубе! Промокод <strong className="text-[#C9B8A3]">PRIVE5</strong> применён.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-3">
                  <div className="flex">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Ваш e-mail"
                      required
                      className="bg-transparent border border-[#333333] px-4 py-3 text-sm text-[#F4EFE8] placeholder:text-[#666666] focus:outline-none focus:border-[#C9B8A3] flex-grow"
                    />
                    <button
                      type="submit"
                      className="bg-[#6B0F1A] hover:bg-[#8E1624] text-[#F4EFE8] px-6 text-xs uppercase tracking-[0.2em] font-medium transition-colors cursor-pointer"
                    >
                      Вступить
                    </button>
                  </div>
                  <p className="text-[10px] text-[#777777] leading-normal">
                    Нажимая кнопку, вы соглашаетесь с Политикой конфиденциальности и обработкой ПДн.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Middle navigation columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-14 border-b border-[#222222] text-xs">
          <div>
            <h4 className="font-serif text-sm tracking-[0.15em] uppercase text-[#F4EFE8] mb-5">
              Коллекция
            </h4>
            <ul className="space-y-3 text-[#F4EFE8]/70">
              <li><Link href="/catalog?category=tufli" className="hover:text-[#C9B8A3] transition-colors">Туфли и лодочки</Link></li>
              <li><Link href="/catalog?category=bosonozhki" className="hover:text-[#C9B8A3] transition-colors">Босоножки и мюли</Link></li>
              <li><Link href="/catalog?category=lofery" className="hover:text-[#C9B8A3] transition-colors">Лоферы и дерби</Link></li>
              <li><Link href="/catalog?category=baletki" className="hover:text-[#C9B8A3] transition-colors">Остроносые балетки</Link></li>
              <li><Link href="/catalog?category=sapogi" className="hover:text-[#C9B8A3] transition-colors">Сапоги-трубы и ботильоны</Link></li>
              <li><Link href="/catalog" className="text-[#C9B8A3] hover:underline pt-1 inline-block">Все модели (39–44)</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-sm tracking-[0.15em] uppercase text-[#F4EFE8] mb-5">
              Сервис и подбор
            </h4>
            <ul className="space-y-3 text-[#F4EFE8]/70">
              <li><Link href="/size-guide" className="hover:text-[#C9B8A3] transition-colors">Калькулятор стопы по см</Link></li>
              <li><Link href="/delivery" className="hover:text-[#C9B8A3] transition-colors">Доставка и примерка</Link></li>
              <li><Link href="/delivery" className="hover:text-[#C9B8A3] transition-colors">Бесплатный обмен размера</Link></li>
              <li><Link href="/prive" className="hover:text-[#C9B8A3] transition-colors">Бонусная программа PRIVÉ</Link></li>
              <li><Link href="/faq" className="hover:text-[#C9B8A3] transition-colors">Частые вопросы (FAQ)</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-sm tracking-[0.15em] uppercase text-[#F4EFE8] mb-5">
              О бренде
            </h4>
            <ul className="space-y-3 text-[#F4EFE8]/70">
              <li><Link href="/about" className="hover:text-[#C9B8A3] transition-colors">Манифест и основательница</Link></li>
              <li><Link href="/lookbook" className="hover:text-[#C9B8A3] transition-colors">Lookbook на моделях 180+</Link></li>
              <li><Link href="/about" className="hover:text-[#C9B8A3] transition-colors">Собственное производство</Link></li>
              <li><Link href="/contacts" className="hover:text-[#C9B8A3] transition-colors">Шоурум в Санкт-Петербурге</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-sm tracking-[0.15em] uppercase text-[#F4EFE8] mb-5">
              Контакты
            </h4>
            <p className="text-[#F4EFE8]/70 mb-3 leading-relaxed">
              Ежедневно с 10:00 до 21:00 (МСК)
            </p>
            <p className="text-sm font-medium text-[#F4EFE8] mb-3">
              +7 (800) 555-43-44
            </p>
            <div className="flex gap-4 pt-2">
              <a
                href="https://t.me"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-[#C9B8A3] hover:underline"
              >
                Telegram <ArrowUpRight size={13} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-[#C9B8A3] hover:underline"
              >
                Instagram <ArrowUpRight size={13} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright & legal compliance */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#777777] gap-4">
          <p>© 2026 TALLORA. Все права защищены. Женская обувь 39–44.</p>
          <div className="flex flex-wrap gap-5 text-center">
            <Link href="/faq" className="hover:text-[#F4EFE8] transition-colors">Публичная оферта</Link>
            <Link href="/faq" className="hover:text-[#F4EFE8] transition-colors">Политика обработки ПДн (152-ФЗ)</Link>
            <Link href="/faq" className="hover:text-[#F4EFE8] transition-colors">Использование Cookie</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
