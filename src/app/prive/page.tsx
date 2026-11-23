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
    <div className="bg-[#F5F0E8] text-[#2B2620] min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#20402D]/30 border border-[#20402D] rounded-full text-[11px] uppercase tracking-[0.25em] text-[#20402D] mb-4">
            <Award size={13} />
            Клуб привилегий
          </div>
          <h1 className="font-serif text-4xl sm:text-7xl font-light text-[#2B2620]">
            Tallora Privé
          </h1>
          <p className="text-sm sm:text-base text-[#2B2620]/75 mt-4 leading-relaxed font-light">
            Ваш личный доступ к миру Tallora: скидка на первый заказ, бонусы с покупок и ранний доступ
            к новым коллекциям.
          </p>
        </div>

        {/* Club perks (from tallora.ru) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-[28px] border border-[#20402D] shadow-xl p-8 flex flex-col">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#20402D] block mb-4">Welcome</span>
            <span className="font-display text-5xl text-[#2B2620] leading-none">5%</span>
            <span className="font-serif text-xl text-[#2B2620] mt-2">на первый заказ</span>
            <p className="text-xs text-[#2B2620]/65 leading-relaxed mt-4">Скидка начисляется сразу после вступления в клуб.</p>
          </div>
          <div className="bg-white rounded-[28px] border border-[#E2E2E2] p-8 flex flex-col">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#20402D] block mb-4">Early access</span>
            <span className="font-display text-5xl text-[#2B2620] leading-none">Первыми</span>
            <span className="font-serif text-xl text-[#2B2620] mt-2">о новых коллекциях</span>
            <p className="text-xs text-[#2B2620]/65 leading-relaxed mt-4">Узнавайте о новинках, скидках и закрытых предложениях раньше всех.</p>
          </div>
          <div className="bg-white rounded-[28px] border border-[#E2E2E2] p-8 flex flex-col">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#20402D] block mb-4">Privé bonus</span>
            <span className="font-display text-5xl text-[#2B2620] leading-none">до 10%</span>
            <span className="font-serif text-xl text-[#2B2620] mt-2">бонусами с покупок</span>
            <p className="text-xs text-[#2B2620]/65 leading-relaxed mt-4">Возвращаем часть стоимости бонусами, которыми можно оплатить следующие пары.</p>
          </div>
        </div>

        {/* Join form card */}
        <div className="bg-white border border-[#E2E2E2] p-8 sm:p-12 max-w-2xl mx-auto text-center rounded-[24px]">
          <h2 className="font-serif text-2xl sm:text-4xl text-[#2B2620] mb-2">
            Вступить в клуб TALLORA PRIVÉ
          </h2>
          <p className="text-xs text-[#2B2620]/70 mb-8 max-w-md mx-auto">
            Получите персональный промокод на скидку 5% на первую покупку и начните копить бонусы.
          </p>

          {joined ? (
            <div className="p-6 bg-[#20402D]/20 border border-[#20402D] space-y-3">
              <CheckCircle2 size={32} className="text-[#20402D] mx-auto" />
              <h4 className="font-serif text-xl text-[#2B2620]">Добро пожаловать в TALLORA PRIVÉ!</h4>
              <p className="text-xs text-[#2B2620]/80">
                Ваш статус: <strong>Silver</strong> · Промокод на первую покупку: <strong className="text-[#20402D]">PRIVE5</strong>.
              </p>
              <Link
                href="/catalog"
                className="inline-block bg-[#20402D] text-white px-6 py-3 text-xs uppercase tracking-wider font-medium mt-2"
              >
                Перейти к выбору обуви
              </Link>
            </div>
          ) : (
            <form onSubmit={handleJoin} className="space-y-4 text-left">
              <div>
                <label className="text-[11px] uppercase tracking-wider text-[#20402D] block mb-1">
                  Имя:
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ваше имя"
                  className="w-full bg-white border border-[#E2E2E2] rounded-xl p-3 text-xs text-[#2B2620] focus:outline-none focus:border-[#CFE0D4]"
                />
              </div>

              <div>
                <label className="text-[11px] uppercase tracking-wider text-[#20402D] block mb-1">
                  E-mail:
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-white border border-[#E2E2E2] rounded-xl p-3 text-xs text-[#2B2620] focus:outline-none focus:border-[#CFE0D4]"
                />
              </div>

              <div>
                <label className="text-[11px] uppercase tracking-wider text-[#20402D] block mb-1">
                  Ваш размер обуви:
                </label>
                <select
                  value={shoeSize}
                  onChange={(e) => setShoeSize(e.target.value)}
                  className="w-full bg-white border border-[#E2E2E2] rounded-xl p-3 text-xs text-[#2B2620] focus:outline-none"
                >
                  <option value="37">37 размер</option>
                  <option value="38">38 размер</option>
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
                className="w-full bg-[#20402D] hover:bg-[#183326] text-white py-4 text-xs uppercase tracking-[0.2em] font-medium transition-colors cursor-pointer mt-4"
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
