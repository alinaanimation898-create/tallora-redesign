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
    <footer className="bg-[#EFE6D6] text-[#2B2620] pt-24 pb-0 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
        {/* Top section: Big editorial brand quote and newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-[#2B2620]/12">
          <div className="lg:col-span-7 space-y-5">
            <span className="text-[#8F6D2F] text-xs uppercase tracking-[0.3em] font-medium block">
              Манифест TALLORA
            </span>
            <h2 className="font-serif text-4xl sm:text-6xl font-light leading-[0.95] text-[#2B2620]">
              «Ты выше всех в комнате. <br className="hidden sm:inline" />
              <span className="italic font-normal text-[#8F6D2F]">И это твоя абсолютная власть».</span>
            </h2>
            <p className="text-[#2B2620]/70 text-sm max-w-lg leading-relaxed pt-2">
              Мы создаём сексуальную, архитектурную обувь 39–44 размеров с пропорциями каблука и
              колодки, выверенными специально под высокий рост.
            </p>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-[#8F6D2F] block mb-2 font-medium">
                Клуб TALLORA PRIVÉ
              </span>
              <p className="text-sm text-[#2B2620]/80 mb-5 leading-relaxed">
                Получите персональную скидку 5% на первый заказ и приглашения на закрытые дропы.
              </p>

              {subscribed ? (
                <div className="flex items-center gap-2 p-4 rounded-2xl bg-white border border-[#DAB16B] text-xs text-[#2B2620]">
                  <CheckCircle2 size={16} className="text-[#8F6D2F]" />
                  <span>Вы в клубе! Промокод <strong className="text-[#8F6D2F]">PRIVE5</strong> применён.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-3">
                  <div className="flex h-14 rounded-full border border-[#2B2620]/20 focus-within:border-[#B8914A] p-1.5 transition-colors">
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
                      className="bg-[#DAB16B] hover:bg-[#C99B4F] text-[#2B2620] px-6 rounded-full text-[11px] uppercase tracking-[0.2em] font-semibold transition-colors cursor-pointer"
                    >
                      Вступить
                    </button>
                  </div>
                  <p className="text-[10px] text-[#2B2620]/55 leading-normal">
                    Нажимая кнопку, вы соглашаетесь с Политикой конфиденциальности и обработкой ПДн.
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
              <li><Link href="/catalog?category=tufli" className="hover:text-[#8F6D2F] transition-colors">Туфли и лодочки</Link></li>
              <li><Link href="/catalog?category=bosonozhki" className="hover:text-[#8F6D2F] transition-colors">Босоножки и мюли</Link></li>
              <li><Link href="/catalog?category=lofery" className="hover:text-[#8F6D2F] transition-colors">Лоферы и дерби</Link></li>
              <li><Link href="/catalog?category=baletki" className="hover:text-[#8F6D2F] transition-colors">Остроносые балетки</Link></li>
              <li><Link href="/catalog?category=sapogi" className="hover:text-[#8F6D2F] transition-colors">Сапоги-трубы и ботильоны</Link></li>
              <li><Link href="/catalog" className="text-[#8F6D2F] hover:underline pt-1 inline-block">Все модели (39–44)</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm tracking-[0.2em] uppercase text-[#2B2620] mb-5">
              Сервис и подбор
            </h4>
            <ul className="space-y-3 text-[#2B2620]/70">
              <li><Link href="/size-guide" className="hover:text-[#8F6D2F] transition-colors">Калькулятор стопы по см</Link></li>
              <li><Link href="/delivery" className="hover:text-[#8F6D2F] transition-colors">Доставка и примерка</Link></li>
              <li><Link href="/delivery" className="hover:text-[#8F6D2F] transition-colors">Бесплатный обмен размера</Link></li>
              <li><Link href="/prive" className="hover:text-[#8F6D2F] transition-colors">Бонусная программа PRIVÉ</Link></li>
              <li><Link href="/faq" className="hover:text-[#8F6D2F] transition-colors">Частые вопросы (FAQ)</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm tracking-[0.2em] uppercase text-[#2B2620] mb-5">
              О бренде
            </h4>
            <ul className="space-y-3 text-[#2B2620]/70">
              <li><Link href="/about" className="hover:text-[#8F6D2F] transition-colors">Манифест и основательница</Link></li>
              <li><Link href="/lookbook" className="hover:text-[#8F6D2F] transition-colors">Lookbook на моделях 180+</Link></li>
              <li><Link href="/about" className="hover:text-[#8F6D2F] transition-colors">Собственное производство</Link></li>
              <li><Link href="/contacts" className="hover:text-[#8F6D2F] transition-colors">Шоурум в Санкт-Петербурге</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm tracking-[0.2em] uppercase text-[#2B2620] mb-5">
              Контакты
            </h4>
            <p className="text-[#2B2620]/70 mb-3 leading-relaxed">
              Ежедневно с 10:00 до 21:00 (МСК)
            </p>
            <p className="font-display text-2xl text-[#2B2620] mb-3">
              +7 (800) 555-43-44
            </p>
            <div className="flex gap-4 pt-2">
              <a
                href="https://t.me"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-[#8F6D2F] hover:underline"
              >
                Telegram <ArrowUpRight size={13} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-[#8F6D2F] hover:underline"
              >
                Instagram <ArrowUpRight size={13} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright & legal compliance */}
        <div className="pt-8 pb-4 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#2B2620]/55 gap-4">
          <p>© 2026 TALLORA. Все права защищены. Женская обувь 39–44.</p>
          <div className="flex flex-wrap gap-5 text-center">
            <Link href="/faq" className="hover:text-[#2B2620] transition-colors">Публичная оферта</Link>
            <Link href="/faq" className="hover:text-[#2B2620] transition-colors">Политика обработки ПДн (152-ФЗ)</Link>
            <Link href="/faq" className="hover:text-[#2B2620] transition-colors">Использование Cookie</Link>
          </div>
        </div>
      </div>

      {/* Giant wordmark */}
      <div aria-hidden className="mt-10 select-none pointer-events-none font-serif font-light uppercase text-center leading-[0.75] tracking-[0.04em] text-[23vw] text-[#2B2620]/[0.06] translate-y-[12%]">
        Tallora
      </div>
    </footer>
  );
}
