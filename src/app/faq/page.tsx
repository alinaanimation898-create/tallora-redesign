"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FAQ_LIST } from "@/data/mockData";
import { Sparkles, HelpCircle, ArrowRight } from "lucide-react";
import { useShop } from "@/context/ShopContext";

export default function FAQPage() {
  const { setIsVeraOpen } = useShop();
  const [activeTab, setActiveTab] = useState<string>("all");
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const filtered = activeTab === "all" ? FAQ_LIST : FAQ_LIST.filter((f) => f.category === activeTab);

  return (
    <div className="bg-[#F3F3F3] min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center">
          <span className="text-xs uppercase tracking-[0.25em] text-[#8F6D2F] font-semibold block mb-2">
            Служба заботы TALLORA
          </span>
          <h1 className="font-serif text-3xl sm:text-6xl text-[#2B2620]">
            Спрашивай <span className="italic text-[#B8914A]">смело</span>
          </h1>
          <p className="text-sm text-[#2B2620]/70 mt-3 max-w-lg mx-auto">
            Всё о подборе размера 37–44, доставке, возврате и клубе Privé.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex justify-center gap-2 overflow-x-auto no-scrollbar pb-2">
          {[
            { id: "all", label: "Все вопросы" },
            { id: "size", label: "Размеры и колодка" },
            { id: "delivery", label: "Доставка и возврат" },
            { id: "payment", label: "Оплата и рассрочка" },
            { id: "prive", label: "Клуб PRIVÉ" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-xs uppercase tracking-wider border transition-all ${
                activeTab === tab.id
                  ? "bg-[#DAB16B] text-[#2B2620] border-[#DAB16B]"
                  : "bg-white text-[#2B2620] border-[#E2E2E2] hover:border-[#2B2620]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {filtered.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div key={idx} className="bg-[#FFFFFF] border border-[#E2E2E2]">
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="font-serif text-base sm:text-lg text-[#2B2620]">
                    {item.question}
                  </span>
                  <span className="font-mono text-xl text-[#8F6D2F] shrink-0">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
                {isOpen && (
                  <div className="px-5 pb-6 text-xs sm:text-sm text-[#2B2620]/80 leading-relaxed border-t border-[#E2E2E2]/60 pt-4">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Vera Stylist Assistance Card */}
        <div className="bg-[#EFE6D6] text-[#2B2620] p-8 border border-[#E2E2E2] flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left rounded-[24px]">
          <div>
            <h3 className="font-serif text-xl sm:text-2xl text-[#2B2620] flex items-center gap-2 justify-center sm:justify-start">
              <Sparkles size={20} className="text-[#8F6D2F]" />
              Остались вопросы? Напишите нам
            </h3>
            <p className="text-xs text-[#2B2620]/70 mt-1 max-w-md">
              Спросите стилиста Веру прямо сейчас в онлайн-чате или напишите нам в Telegram.
            </p>
          </div>
          <button
            onClick={() => setIsVeraOpen(true)}
            className="bg-[#DAB16B] hover:bg-[#C99B4F] text-[#2B2620] px-6 py-3.5 text-xs uppercase tracking-[0.2em] font-medium shrink-0 cursor-pointer rounded-full"
          >
            Спросить стилиста Веру
          </button>
        </div>
      </div>
    </div>
  );
}
