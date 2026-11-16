"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Phone, Mail, Truck, MessageSquare, ArrowRight, CheckCircle2 } from "lucide-react";
import { CONTACTS, SHOWROOM } from "@/data/mockData";

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
            Мы <span className="italic text-[#B8914A]">на связи</span>
          </h1>
          <p className="text-sm text-[#2B2620]/70 mt-3 max-w-md mx-auto">
            Подберём пару по твоему размеру в Telegram или MAX, ответим на звонок - или приезжай примерить в шоурум.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Left info (5 cols) */}
          <div className="md:col-span-5 bg-[#FFFFFF] p-6 sm:p-8 border border-[#E2E2E2] space-y-6 rounded-[24px]">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#8F6D2F] font-bold block mb-1">
                Интернет-магазин
              </span>
              <h3 className="font-serif text-xl text-[#2B2620]">Доставка по всей России</h3>
              <p className="text-xs text-[#2B2620]/80 mt-1 leading-relaxed">
                СДЭК - до двери или пункта выдачи. По Москве - курьером, примерка при заказе от 3 пар.
              </p>
            </div>

            <div className="pt-2 border-t border-[#E2E2E2]">
              <span className="text-[10px] uppercase tracking-widest text-[#8F6D2F] font-bold block mb-1 mt-4">
                Примерка вживую
              </span>
              <h3 className="font-serif text-xl text-[#2B2620]">{SHOWROOM.name}</h3>
              <p className="text-xs text-[#2B2620]/80 mt-1 leading-relaxed">
                {SHOWROOM.address}, {SHOWROOM.metro}. {SHOWROOM.hours}.
              </p>
              <p className="text-[11px] text-[#2B2620]/55 mt-1 leading-relaxed">{SHOWROOM.hint}</p>
            </div>

            <div className="space-y-3 text-xs text-[#2B2620]/80 pt-2 border-t border-[#E2E2E2]">
              <a href={CONTACTS.phoneHref} className="flex items-center gap-3 hover:text-[#8F6D2F]">
                <Phone size={16} className="text-[#8F6D2F] shrink-0" />
                <span>{CONTACTS.phone}</span>
              </a>
              <a href={`mailto:${CONTACTS.email}`} className="flex items-center gap-3 hover:text-[#8F6D2F]">
                <Mail size={16} className="text-[#8F6D2F] shrink-0" />
                <span>{CONTACTS.email}</span>
              </a>
              <Link href="/delivery" className="flex items-center gap-3 hover:text-[#8F6D2F]">
                <Truck size={16} className="text-[#8F6D2F] shrink-0" />
                <span>Условия доставки и возврата</span>
              </Link>
            </div>

            <div className="pt-4 border-t border-[#E2E2E2] space-y-2">
              <span className="text-[10px] uppercase tracking-wider text-[#2B2620]/60 block">
                Мессенджеры для быстрой связи:
              </span>
              <div className="flex gap-3">
                <a
                  href={CONTACTS.telegram}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-[#DAB16B] text-[#2B2620] px-4 py-2 rounded-full text-xs uppercase tracking-wider hover:bg-[#C99B4F] transition-colors"
                >
                  Telegram
                </a>
                <a
                  href={CONTACTS.max}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-white border border-[#2B2620]/15 text-[#2B2620] px-4 py-2 rounded-full text-xs uppercase tracking-wider hover:border-[#2B2620] transition-colors"
                >
                  MAX
                </a>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E2E2E2] text-[11px] text-[#2B2620]/55 leading-relaxed">
              {CONTACTS.company}
              <br />
              ИНН {CONTACTS.inn} · ОГРНИП {CONTACTS.ogrnip}
            </div>
          </div>

          {/* Right message form (7 cols) */}
          <div className="md:col-span-7 bg-[#FFFFFF] p-6 sm:p-8 border border-[#E2E2E2] rounded-[24px]">
            <h3 className="font-serif text-2xl text-[#2B2620] mb-2">
              Заказать обратный звонок
            </h3>
            <p className="text-xs text-[#2B2620]/70 mb-6">
              Оставьте ваши контакты, и мы вам перезвоним.
            </p>

            {sent ? (
              <div className="p-6 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs space-y-2">
                <CheckCircle2 size={24} />
                <p className="font-serif text-base font-medium">Сообщение отправлено!</p>
                <p>Мы свяжемся с вами в ближайшее время.</p>
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
                      className="w-full bg-white border border-[#E2E2E2] p-3 text-xs focus:outline-none focus:border-[#DAB16B] rounded-xl"
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
                      className="w-full bg-white border border-[#E2E2E2] p-3 text-xs focus:outline-none focus:border-[#DAB16B] rounded-xl"
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
                    placeholder="Подскажите, как сядут туфли Lana на стопу 27 см?"
                    className="w-full bg-white border border-[#E2E2E2] p-3 text-xs focus:outline-none focus:border-[#DAB16B] rounded-xl"
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
