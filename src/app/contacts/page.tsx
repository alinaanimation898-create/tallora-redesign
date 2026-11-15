"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Phone, Mail, MapPin, Clock, MessageSquare, ArrowRight, CheckCircle2 } from "lucide-react";

export default function ContactsPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="bg-[#F3F3F3] min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-14">
        <div className="text-center">
          <span className="text-xs uppercase tracking-[0.25em] text-[#8F6D2F] font-semibold block mb-2">
            Связь с нами
          </span>
          <h1 className="font-serif text-3xl sm:text-6xl text-[#2B2620]">
            Контакты и шоурум TALLORA
          </h1>
          <p className="text-sm text-[#2B2620]/70 mt-3 max-w-md mx-auto">
            Будем рады видеть вас на примерке в Санкт-Петербурге или ответить в любом удобном мессенджере.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Left info (5 cols) */}
          <div className="md:col-span-5 bg-[#FFFFFF] p-6 sm:p-8 border border-[#E2E2E2] space-y-6">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#8F6D2F] font-bold block mb-1">
                Флагманский шоурум
              </span>
              <h3 className="font-serif text-xl text-[#2B2620]">Санкт-Петербург</h3>
              <p className="text-xs text-[#2B2620]/80 mt-1 leading-relaxed">
                Набережная реки Мойки, 58 (вход с набережной, 2 этаж, код 43)
              </p>
            </div>

            <div className="space-y-3 text-xs text-[#2B2620]/80 pt-2 border-t border-[#E2E2E2]">
              <div className="flex items-center gap-3">
                <Clock size={16} className="text-[#8F6D2F] shrink-0" />
                <span>Ежедневно: 11:00 — 21:00 (по предварительной записи)</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-[#8F6D2F] shrink-0" />
                <span>+7 (800) 555-43-44</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-[#8F6D2F] shrink-0" />
                <span>concierge@tallora.ru</span>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E2E2E2] space-y-2">
              <span className="text-[10px] uppercase tracking-wider text-[#2B2620]/60 block">
                Мессенджеры для быстрой связи:
              </span>
              <div className="flex gap-3">
                <a
                  href="https://t.me"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-[#DAB16B] text-[#2B2620] px-4 py-2 text-xs uppercase tracking-wider hover:bg-[#C99B4F] transition-colors"
                >
                  Telegram
                </a>
                <a
                  href="https://whatsapp.com"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-emerald-700 text-[#F3F3F3] px-4 py-2 text-xs uppercase tracking-wider hover:bg-emerald-800 transition-colors"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Right message form (7 cols) */}
          <div className="md:col-span-7 bg-[#FFFFFF] p-6 sm:p-8 border border-[#E2E2E2]">
            <h3 className="font-serif text-2xl text-[#2B2620] mb-2">
              Записаться на примерку или задать вопрос
            </h3>
            <p className="text-xs text-[#2B2620]/70 mb-6">
              Мы подготовим нужные модели и размеры к вашему визиту.
            </p>

            {sent ? (
              <div className="p-6 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs space-y-2">
                <CheckCircle2 size={24} />
                <p className="font-serif text-base font-medium">Сообщение отправлено!</p>
                <p>Наш консьерж свяжется с вами в течение 15 минут.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-[#2B2620]/70 block mb-1">
                      Имя *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Ваше имя"
                      className="w-full bg-white border border-[#E2E2E2] p-3 text-xs focus:outline-none focus:border-[#DAB16B]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-[#2B2620]/70 block mb-1">
                      Телефон / Telegram *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+7 (999) 000-00-00"
                      className="w-full bg-white border border-[#E2E2E2] p-3 text-xs focus:outline-none focus:border-[#DAB16B]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#2B2620]/70 block mb-1">
                    Комментарий (желаемая дата, модель или размер):
                  </label>
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Хочу примерить лодочки Mia 43 размера в эту субботу..."
                    className="w-full bg-white border border-[#E2E2E2] p-3 text-xs focus:outline-none focus:border-[#DAB16B]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#DAB16B] hover:bg-[#C99B4F] text-[#2B2620] py-4 text-xs uppercase tracking-[0.2em] font-medium transition-colors cursor-pointer"
                >
                  Отправить заявку
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
