"use client";

import React from "react";
import Link from "next/link";
import { Truck, RefreshCw, Clock } from "lucide-react";

// Terms from tallora.ru/delivery.
const RETURN_GOOD = [
  ["Срок возврата", "Покупатель вправе вернуть товар надлежащего качества, купленный online или offline, в течение 14 дней с момента получения заказа."],
  ["Состояние товара", "Не ношеный, с сохранёнными товарным видом, потребительскими свойствами, пломбами, фабричными ярлыками и оригинальной упаковкой."],
  ["Документы", "Товарный или кассовый чек, подтверждающий покупку."],
  ["Возврат денег", "После получения и проверки товара — в течение 10 дней."],
  ["Доставка", "Стоимость доставки при возврате товара надлежащего качества не компенсируется: услуга доставки считается оказанной."],
];

const RETURN_DEFECT = [
  ["Гарантийный срок", "Возврат товара ненадлежащего качества возможен в течение всего гарантийного срока, установленного продавцом."],
  ["Дефекты", "Подробно опишите дефект и приложите фотографии товара со всех сторон и фото дефекта."],
  ["Экспертиза", "В случае спора о качестве может быть проведена независимая экспертиза."],
  ["Возмещение", "При подтверждении заводского брака магазин компенсирует стоимость товара и доставки, а также экспертизы, если она проводилась."],
  ["Обмен", "При обнаружении дефектов возможен обмен на аналогичный товар надлежащего качества."],
  ["Претензия", "Требования о возврате или обмене предъявляются в письменной форме в виде заявления (претензии)."],
];

function TermList({ items }: { items: string[][] }) {
  return (
    <dl className="divide-y divide-[#2B2620]/10">
      {items.map(([t, d]) => (
        <div key={t} className="py-4 grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-6">
          <dt className="sm:col-span-4 font-serif italic text-lg text-[#2B2620]">{t}</dt>
          <dd className="sm:col-span-8 text-sm text-[#2B2620]/70 leading-relaxed">{d}</dd>
        </div>
      ))}
    </dl>
  );
}

export default function DeliveryPage() {
  return (
    <div className="bg-[#F3F3F3] min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center">
          <span className="text-xs uppercase tracking-[0.25em] text-[#8F6D2F] font-semibold block mb-2">
            Сервис Tallora
          </span>
          <h1 className="font-serif text-3xl sm:text-6xl text-[#2B2620]">Доставка и возврат</h1>
          <p className="text-sm text-[#2B2620]/70 mt-3 max-w-xl mx-auto leading-relaxed">
            Отправляем заказы по всей стране через надёжного партнёра — СДЭК, а по Москве привозим курьером.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-[24px] p-6 sm:p-8 border border-[#E2E2E2] space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#DAB16B] text-[#2B2620] flex items-center justify-center mb-4">
              <Truck size={22} />
            </div>
            <h3 className="font-serif text-2xl text-[#2B2620]">По всей России</h3>
            <p className="text-xs text-[#2B2620]/75 leading-relaxed">
              Через СДЭК — до двери или до ближайшего пункта выдачи. Стоимость и сроки рассчитываются
              автоматически при оформлении заказа.
            </p>
            <span className="text-xs font-semibold text-[#8F6D2F] block pt-2">2–6 дней по регионам</span>
          </div>

          <div className="bg-white rounded-[24px] p-6 sm:p-8 border border-[#E2E2E2] space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#DAB16B] text-[#2B2620] flex items-center justify-center mb-4">
              <Clock size={22} />
            </div>
            <h3 className="font-serif text-2xl text-[#2B2620]">Курьер по Москве</h3>
            <p className="text-xs text-[#2B2620]/75 leading-relaxed">
              Курьерская доставка — 700 ₽. При заказе от 3 пар — бесплатно и с возможностью примерки:
              сообщите о ней менеджеру при оформлении.
            </p>
            <span className="text-xs font-semibold text-[#8F6D2F] block pt-2">1–2 рабочих дня</span>
          </div>

          <div className="bg-white rounded-[24px] p-6 sm:p-8 border border-[#E2E2E2] space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#E3C78F] text-[#2B2620] flex items-center justify-center mb-4">
              <RefreshCw size={22} />
            </div>
            <h3 className="font-serif text-2xl text-[#2B2620]">Возврат 14 дней</h3>
            <p className="text-xs text-[#2B2620]/75 leading-relaxed">
              Если пара не подошла и не была в носке — верните её в течение 14 дней с момента получения.
              Деньги вернём в течение 10 дней.
            </p>
            <span className="text-xs font-semibold text-[#8F6D2F] block pt-2">Сохраните ярлыки и упаковку</span>
          </div>
        </div>

        <div className="bg-white rounded-[28px] p-8 sm:p-10 border border-[#E2E2E2]">
          <span className="font-display text-xs tracking-[0.3em] text-[#8F6D2F]">01</span>
          <h2 className="font-serif text-3xl text-[#2B2620] mt-1 mb-4">Возврат товара надлежащего качества</h2>
          <TermList items={RETURN_GOOD} />
        </div>

        <div className="bg-white rounded-[28px] p-8 sm:p-10 border border-[#E2E2E2]">
          <span className="font-display text-xs tracking-[0.3em] text-[#8F6D2F]">02</span>
          <h2 className="font-serif text-3xl text-[#2B2620] mt-1 mb-4">Возврат товара ненадлежащего качества</h2>
          <TermList items={RETURN_DEFECT} />
        </div>

        <div className="bg-[#F5F0E8] rounded-[28px] p-8 sm:p-10 border border-[#E2E2E2]">
          <span className="font-display text-xs tracking-[0.3em] text-[#8F6D2F]">03</span>
          <h2 className="font-serif text-3xl text-[#2B2620] mt-1 mb-4">Дополнительно</h2>
          <TermList
            items={[
              ["Отказ до получения", "Покупатель имеет право отказаться от товара до его получения."],
              ["Обратная связь", "Мы оперативно отвечаем на вопросы, связанные с возвратом товара."],
            ]}
          />
          <div className="pt-6">
            <Link
              href="/catalog"
              className="inline-block bg-[#DAB16B] text-[#2B2620] px-8 py-3.5 rounded-full text-xs uppercase tracking-[0.2em] hover:bg-[#C99B4F] transition-colors"
            >
              Перейти к покупкам
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
