"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, Award, Gift, Clock, ShieldCheck, CheckCircle2, ArrowRight } from "lucide-react";
import { useShop } from "@/context/ShopContext";

export default function PriveClubPage() {
  const { isPriveMember, setIsPriveMember } = useShop();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [shoeSize, setShoeSize] = useState("43");
  const [joined, setJoined] = useState(false);

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsPriveMember(true);
      setJoined(true);
    }
  };

  return (
    <div className="bg-[#0E0E0E] text-[#F4EFE8] min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#6B0F1A]/30 border border-[#6B0F1A] rounded-full text-[11px] uppercase tracking-[0.25em] text-[#C9B8A3] mb-4">
            <Award size={13} />
            Клуб привилегий
          </div>
          <h1 className="font-serif text-4xl sm:text-7xl font-light text-[#F4EFE8]">
            TALLORA PRIVÉ
          </h1>
          <p className="text-sm sm:text-base text-[#F4EFE8]/75 mt-4 leading-relaxed font-light">
            Закрытое сообщество высоких женщин. Доступ к ограниченным тиражам обуви 39–44,
            накопительный кешбэк до 10% и персональные консультации стилиста.
          </p>
        </div>

        {/* Membership tiers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#171717] border border-[#2B2B2B] p-8 flex flex-col justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#C9B8A3] block mb-1">
                Старт
              </span>
              <h3 className="font-serif text-2xl text-[#F4EFE8] mb-1">Silver</h3>
              <p className="text-xs text-[#F4EFE8]/60 mb-6">Сумма покупок до 50 000 ₽</p>
              <ul className="space-y-3 text-xs text-[#F4EFE8]/80">
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#6B0F1A]" /> Скидка 5% на первый заказ</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#6B0F1A]" /> 5% кешбэк бонусами</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#6B0F1A]" /> Бесплатный обмен размера</li>
              </ul>
            </div>
            <div className="pt-6 mt-6 border-t border-[#2B2B2B] text-xs text-[#C9B8A3]">
              Присваивается сразу при регистрации
            </div>
          </div>

          <div className="bg-[#1C1C1E] border border-[#6B0F1A] p-8 flex flex-col justify-between relative shadow-xl">
            <span className="absolute -top-3 right-6 bg-[#6B0F1A] text-[#F4EFE8] text-[9px] uppercase tracking-widest px-2.5 py-0.5">
              Популярный
            </span>
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#C9B8A3] block mb-1">
                Клубный
              </span>
              <h3 className="font-serif text-2xl text-[#F4EFE8] mb-1">Gold</h3>
              <p className="text-xs text-[#F4EFE8]/60 mb-6">Сумма покупок от 50 000 ₽</p>
              <ul className="space-y-3 text-xs text-[#F4EFE8]/80">
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#6B0F1A]" /> 7% кешбэк бонусами</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#6B0F1A]" /> Ранний доступ к дропам за 48 ч</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#6B0F1A]" /> Бесплатная курьерская доставка</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#6B0F1A]" /> Бронь редких размеров (43, 44)</li>
              </ul>
            </div>
            <div className="pt-6 mt-6 border-t border-[#333333] text-xs text-[#C9B8A3]">
              Кешбэк 1 бонус = 1 рубль
            </div>
          </div>

          <div className="bg-[#171717] border border-[#2B2B2B] p-8 flex flex-col justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#C9B8A3] block mb-1">
                VIP
              </span>
              <h3 className="font-serif text-2xl text-[#F4EFE8] mb-1">Platinum Black</h3>
              <p className="text-xs text-[#F4EFE8]/60 mb-6">Сумма покупок от 150 000 ₽</p>
              <ul className="space-y-3 text-xs text-[#F4EFE8]/80">
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#6B0F1A]" /> 10% кешбэк бонусами</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#6B0F1A]" /> Индивидуальный пошив колодки</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#6B0F1A]" /> Персональный стилист на связи 24/7</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#6B0F1A]" /> Приглашения на закрытые вечера</li>
              </ul>
            </div>
            <div className="pt-6 mt-6 border-t border-[#2B2B2B] text-xs text-[#C9B8A3]">
              Максимальный статус
            </div>
          </div>
        </div>

        {/* Join form card */}
        <div className="bg-[#1A1A1A] border border-[#333333] p-8 sm:p-12 max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-2xl sm:text-4xl text-[#F4EFE8] mb-2">
            Вступить в клуб TALLORA PRIVÉ
          </h2>
          <p className="text-xs text-[#F4EFE8]/70 mb-8 max-w-md mx-auto">
            Получите персональный промокод на скидку 5% на первую покупку и начните копить бонусы.
          </p>

          {joined ? (
            <div className="p-6 bg-[#6B0F1A]/20 border border-[#6B0F1A] space-y-3">
              <CheckCircle2 size={32} className="text-[#C9B8A3] mx-auto" />
              <h4 className="font-serif text-xl text-[#F4EFE8]">Добро пожаловать в TALLORA PRIVÉ!</h4>
              <p className="text-xs text-[#F4EFE8]/80">
                Ваш статус: <strong>Silver</strong> · Промокод на первую покупку: <strong className="text-[#C9B8A3]">PRIVE5</strong>.
              </p>
              <Link
                href="/catalog"
                className="inline-block bg-[#6B0F1A] text-[#F4EFE8] px-6 py-3 text-xs uppercase tracking-wider font-medium mt-2"
              >
                Перейти к выбору обуви
              </Link>
            </div>
          ) : (
            <form onSubmit={handleJoin} className="space-y-4 text-left">
              <div>
                <label className="text-[11px] uppercase tracking-wider text-[#C9B8A3] block mb-1">
                  Имя:
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ваше имя"
                  className="w-full bg-[#262626] border border-[#3A3A3A] p-3 text-xs text-[#F4EFE8] focus:outline-none focus:border-[#C9B8A3]"
                />
              </div>

              <div>
                <label className="text-[11px] uppercase tracking-wider text-[#C9B8A3] block mb-1">
                  E-mail:
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-[#262626] border border-[#3A3A3A] p-3 text-xs text-[#F4EFE8] focus:outline-none focus:border-[#C9B8A3]"
                />
              </div>

              <div>
                <label className="text-[11px] uppercase tracking-wider text-[#C9B8A3] block mb-1">
                  Ваш размер обуви:
                </label>
                <select
                  value={shoeSize}
                  onChange={(e) => setShoeSize(e.target.value)}
                  className="w-full bg-[#262626] border border-[#3A3A3A] p-3 text-xs text-[#F4EFE8] focus:outline-none"
                >
                  <option value="39">39 размер</option>
                  <option value="40">40 размер</option>
                  <option value="41">41 размер</option>
                  <option value="42">42 размер</option>
                  <option value="43">43 размер</option>
                  <option value="44">44 размер</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-[#6B0F1A] hover:bg-[#8E1624] text-[#F4EFE8] py-4 text-xs uppercase tracking-[0.2em] font-medium transition-colors cursor-pointer mt-4"
              >
                Получить доступ и скидку 5%
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
