"use client";

import React from "react";
import Link from "next/link";
import { Truck, RefreshCw, Clock, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function DeliveryPage() {
  return (
    <div className="bg-[#F3F3F3] min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center">
          <span className="text-xs uppercase tracking-[0.25em] text-[#8F6D2F] font-semibold block mb-2">
            Сервис TALLORA
          </span>
          <h1 className="font-serif text-3xl sm:text-6xl text-[#2B2620]">
            Доставка, примерка и обмен
          </h1>
          <p className="text-sm text-[#2B2620]/70 mt-3 max-w-xl mx-auto leading-relaxed">
            Мы делаем всё, чтобы покупка обуви 39–44 размера была безопасной и приятной.
            Бесплатный обмен размера по всей России — без лишних вопросов.
          </p>
        </div>

        {/* 3 cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#FFFFFF] p-6 sm:p-8 border border-[#E2E2E2] space-y-3">
            <div className="w-12 h-12 bg-[#DAB16B] text-[#2B2620] flex items-center justify-center rounded-xs mb-4">
              <Truck size={24} />
            </div>
            <h3 className="font-serif text-xl text-[#2B2620]">Курьер с примеркой</h3>
            <p className="text-xs text-[#2B2620]/75 leading-relaxed">
              15 минут на примерку перед оплатой в Москве и СПб (1–2 дня). Можно заказать 2 смежных размера, чтобы выбрать идеальный.
            </p>
            <span className="text-xs font-semibold text-[#8F6D2F] block pt-2">
              Бесплатно от 15 000 ₽
            </span>
          </div>

          <div className="bg-[#FFFFFF] p-6 sm:p-8 border border-[#E2E2E2] space-y-3">
            <div className="w-12 h-12 bg-[#DAB16B] text-[#2B2620] flex items-center justify-center rounded-xs mb-4">
              <Clock size={24} />
            </div>
            <h3 className="font-serif text-xl text-[#2B2620]">СДЭК & Boxberry</h3>
            <p className="text-xs text-[#2B2620]/75 leading-relaxed">
              Более 5 000 пунктов выдачи с примерочными по всей России и странам СНГ. Срок доставки 2–5 рабочих дней.
            </p>
            <span className="text-xs font-semibold text-[#8F6D2F] block pt-2">
              Отслеживание по трек-номеру
            </span>
          </div>

          <div className="bg-[#FFFFFF] p-6 sm:p-8 border border-[#E2E2E2] space-y-3">
            <div className="w-12 h-12 bg-[#E3C78F] text-[#2B2620] flex items-center justify-center rounded-xs mb-4">
              <RefreshCw size={24} />
            </div>
            <h3 className="font-serif text-xl text-[#2B2620]">Бесплатный обмен</h3>
            <p className="text-xs text-[#2B2620]/75 leading-relaxed">
              Если обувь не села — мы бесплатно пришлем нужный размер через курьера СДЭК за наш счет в течение 14 дней.
            </p>
            <span className="text-xs font-semibold text-[#8F6D2F] block pt-2">
              100% за счет TALLORA
            </span>
          </div>
        </div>

        {/* Exchange steps details */}
        <div className="bg-[#FFFFFF] p-8 sm:p-10 border border-[#E2E2E2] space-y-6">
          <h2 className="font-serif text-2xl text-[#2B2620]">
            Как устроен процесс обмена размера:
          </h2>
          <div className="space-y-4 text-xs sm:text-sm text-[#2B2620]/80">
            <div className="flex items-start gap-3">
              <span className="font-serif font-bold text-base text-[#8F6D2F] shrink-0">1.</span>
              <p>Напишите нам в WhatsApp / Telegram или стилисту Вере в чате: «Хочу обменять на другой размер».</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="font-serif font-bold text-base text-[#8F6D2F] shrink-0">2.</span>
              <p>Мы моментально резервируем нужный размер и формируем бесплатную накладную СДЭК.</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="font-serif font-bold text-base text-[#8F6D2F] shrink-0">3.</span>
              <p>Курьер привозит новую пару прямо к вам или вы передаете неподошедшую пару в ближайший ПВЗ СДЭК без очередей и бланков.</p>
            </div>
          </div>

          <div className="pt-4 border-t border-[#E2E2E2]">
            <Link
              href="/catalog"
              className="inline-block bg-[#DAB16B] text-[#2B2620] px-8 py-3.5 text-xs uppercase tracking-[0.2em] hover:bg-[#C99B4F] transition-colors"
            >
              Перейти к покупкам
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
