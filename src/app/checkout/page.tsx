"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ShieldCheck, Truck, CreditCard, ArrowRight, Sparkles, RefreshCw, AlertCircle } from "lucide-react";
import { useShop } from "@/context/ShopContext";

export default function CheckoutPage() {
  const { cart, cartTotal, updateQuantity, removeFromCart, isPriveMember } = useShop();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState<"msk_courier" | "cdek_courier" | "cdek_pvz">("cdek_pvz");
  const [paymentMethod, setPaymentMethod] = useState<"sbp" | "card">("sbp");
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  const priveDiscount = promoApplied ? Math.round(cartTotal * 0.05) : 0;
  const pairs = cart.reduce((n, item) => n + item.quantity, 0);
  // tallora.ru: Moscow courier 700 ₽, free from 3 pairs; CDEK is charged at the carrier's rate.
  const deliveryCost = deliveryMethod === "msk_courier" ? (pairs >= 3 ? 0 : 700) : 0;
  const finalPrice = cartTotal - priveDiscount + deliveryCost;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === "PRIVE5" || promoCode.trim().toUpperCase() === "TALLORA") {
      setPromoApplied(true);
    }
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    const generatedOrder = "TL-" + Math.floor(100000 + Math.random() * 900000);
    setOrderNumber(generatedOrder);
    setOrderComplete(true);
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-[#F3F3F3] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-[#FFFFFF] border border-[#E2E2E2] p-8 sm:p-10 text-center space-y-6 shadow-xl rounded-[24px]">
          <div className="w-16 h-16 rounded-full bg-[#20402D] text-white flex items-center justify-center mx-auto">
            <CheckCircle2 size={36} />
          </div>

          <span className="text-xs uppercase tracking-[0.25em] text-[#20402D] font-semibold block">
            Заказ успешно оформлен!
          </span>

          <h1 className="font-serif text-3xl text-[#2B2620]">
            Номер заказа: <br />
            <span className="text-[#20402D] font-bold">{orderNumber}</span>
          </h1>

          <p className="text-xs text-[#2B2620]/70 leading-relaxed">
            Спасибо, <strong>{name}</strong>! Мы отправили детали заказа и трек-номер на <strong>{email || phone}</strong>.
            Менеджер свяжется с вами, чтобы подтвердить заказ и доставку
          </p>

          <div className="p-4 bg-[#F3F3F3] border border-[#E2E2E2] text-left text-xs space-y-1 rounded-2xl">
            <div className="flex justify-between">
              <span className="text-[#888888]">Сумма к оплате:</span>
              <strong className="text-[#2B2620]">{finalPrice.toLocaleString("ru-RU")} ₽</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-[#888888]">Способ доставки:</span>
              <span>{deliveryMethod === "msk_courier" ? "Курьер по Москве" : "СДЭК"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#888888]">Возврат:</span>
              <span className="text-[#20402D]">14 дней с момента получения</span>
            </div>
          </div>

          <Link
            href="/"
            className="block w-full bg-[#20402D] hover:bg-[#183326] text-white py-4 text-xs uppercase tracking-[0.2em] font-medium transition-colors"
          >
            Вернуться на главную
          </Link>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#F3F3F3] flex items-center justify-center p-4">
        <div className="text-center py-20 space-y-4">
          <h1 className="font-serif text-3xl text-[#2B2620]">Корзина ждёт твою пару</h1>
          <p className="text-xs text-[#2B2620]/60">Туфли, ботильоны, лоферы - 37–44, натуральная кожа</p>
          <Link
            href="/catalog"
            className="inline-block bg-[#20402D] text-white px-8 py-3.5 text-xs uppercase tracking-[0.2em] rounded-full"
          >
            В каталог
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F3F3F3] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10 text-center sm:text-left">
          <span className="text-xs uppercase tracking-[0.25em] text-[#20402D] font-semibold block mb-1">
            Быстрое оформление
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#2B2620]">
            Оформление заказа
          </h1>
          <p className="text-xs text-[#2B2620]/60 mt-1">
            Без обязательной регистрации · СДЭК по всей России · Возврат 14 дней
          </p>
        </div>

        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* LEFT: FORM FIELDS (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            {/* Step 1: Contacts */}
            <div className="bg-[#FFFFFF] p-6 sm:p-8 border border-[#E2E2E2] rounded-[24px]">
              <h2 className="font-serif text-xl text-[#2B2620] mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#20402D] text-white text-xs flex items-center justify-center font-sans font-bold">1</span>
                Контакты получателя
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#2B2620]/70 block mb-1">
                    Ваше имя *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Екатерина"
                    className="w-full p-3 bg-white border border-[#E2E2E2] text-xs focus:outline-none focus:border-[#20402D] rounded-xl"
                  />
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#2B2620]/70 block mb-1">
                    Телефон *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+7 (999) 000-00-00"
                    className="w-full p-3 bg-white border border-[#E2E2E2] text-xs focus:outline-none focus:border-[#20402D] rounded-xl"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-[11px] uppercase tracking-wider text-[#2B2620]/70 block mb-1">
                    E-mail для чека и трек-номера
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ekaterina@example.com"
                    className="w-full p-3 bg-white border border-[#E2E2E2] text-xs focus:outline-none focus:border-[#20402D] rounded-xl"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Delivery */}
            <div className="bg-[#FFFFFF] p-6 sm:p-8 border border-[#E2E2E2] rounded-[24px]">
              <h2 className="font-serif text-xl text-[#2B2620] mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#20402D] text-white text-xs flex items-center justify-center font-sans font-bold">2</span>
                Способ доставки
              </h2>

              <div className="space-y-3 mb-5">
                {[
                  {
                    id: "cdek_pvz",
                    title: "СДЭК - пункт выдачи",
                    desc: "По всей России, 2–6 дней. Стоимость рассчитывается по тарифу СДЭК",
                    price: "По тарифу",
                  },
                  {
                    id: "cdek_courier",
                    title: "СДЭК - до двери",
                    desc: "По всей России, 2–6 дней. Стоимость рассчитывается по тарифу СДЭК",
                    price: "По тарифу",
                  },
                  {
                    id: "msk_courier",
                    title: "Курьер по Москве",
                    desc: "1–2 рабочих дня. От 3 пар - бесплатно и с примеркой",
                    price: pairs >= 3 ? "Бесплатно" : "700 ₽",
                  },
                ].map((d) => (
                  <label
                    key={d.id}
                    className={`flex items-start justify-between p-4 border cursor-pointer transition-all ${
                      deliveryMethod === d.id
                        ? "bg-white border-[#20402D] ring-1 ring-[#20402D]"
                        : "bg-[#F3F3F3] border-[#E2E2E2]"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        name="delivery"
                        checked={deliveryMethod === d.id}
                        onChange={() => setDeliveryMethod(d.id as any)}
                        className="mt-1 accent-[#20402D]"
                      />
                      <div>
                        <strong className="text-xs text-[#2B2620] block">{d.title}</strong>
                        <span className="text-[11px] text-[#2B2620]/70">{d.desc}</span>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-[#20402D] shrink-0 ml-2">
                      {d.price}
                    </span>
                  </label>
                ))}
              </div>

              <div>
                <label className="text-[11px] uppercase tracking-wider text-[#2B2620]/70 block mb-1">
                  Город и адрес доставки *
                </label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="г. Москва, ул. Большая Никитская, д. 14, кв. 22"
                  className="w-full p-3 bg-white border border-[#E2E2E2] text-xs focus:outline-none focus:border-[#20402D] rounded-xl"
                />
              </div>
            </div>

            {/* Step 3: Payment */}
            <div className="bg-[#FFFFFF] p-6 sm:p-8 border border-[#E2E2E2] rounded-[24px]">
              <h2 className="font-serif text-xl text-[#2B2620] mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#20402D] text-white text-xs flex items-center justify-center font-sans font-bold">3</span>
                Способ оплаты
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  {
                    id: "sbp",
                    title: "СБП (по QR-коду)",
                    desc: "Быстро без ввода карты",
                  },
                  {
                    id: "card",
                    title: "Банковская карта",
                    desc: "Онлайн при оформлении",
                  },
                ].map((p) => (
                  <label
                    key={p.id}
                    className={`p-4 border cursor-pointer flex flex-col justify-between transition-all ${
                      paymentMethod === p.id
                        ? "bg-white border-[#20402D] ring-1 ring-[#20402D]"
                        : "bg-[#F3F3F3] border-[#E2E2E2]"
                    }`}
                  >
                    <div>
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === p.id}
                        onChange={() => setPaymentMethod(p.id as any)}
                        className="accent-[#20402D] mb-2"
                      />
                      <strong className="text-xs text-[#2B2620] block">{p.title}</strong>
                    </div>
                    <span className="text-[10px] text-[#2B2620]/60 mt-1">{p.desc}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: ORDER SUMMARY (5 cols) */}
          <div className="lg:col-span-5 bg-[#FFFFFF] p-6 sm:p-8 border border-[#E2E2E2] shadow-md sticky top-28 rounded-[24px]">
            <h2 className="font-serif text-xl text-[#2B2620] pb-3 border-b border-[#E2E2E2] mb-4">
              Ваш заказ
            </h2>

            {/* Items */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1 mb-5">
              {cart.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedSize}`}
                  className="flex gap-3 text-xs pb-3 border-b border-[#E2E2E2]/60"
                >
                  <div className="relative w-14 h-18 bg-[#EAEAEA] shrink-0 border border-[#E2E2E2] overflow-hidden">
                    <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-serif font-medium text-[#2B2620] line-clamp-1">
                      {item.product.name}
                    </h4>
                    <span className="text-[11px] text-[#20402D] font-semibold block mt-0.5">
                      Размер: {item.selectedSize} · {item.quantity} шт
                    </span>
                    <span className="text-xs font-mono font-medium text-[#2B2620] block mt-1">
                      {(item.product.price * item.quantity).toLocaleString("ru-RU")} ₽
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Promo code form */}
            <div className="mb-5 pb-5 border-b border-[#E2E2E2]">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Промокод"
                  className="flex-1 bg-white border border-[#E2E2E2] px-3 py-2 text-xs uppercase rounded-2xl"
                />
                <button
                  type="button"
                  onClick={handleApplyPromo}
                  className="bg-[#20402D] text-white px-4 text-xs uppercase tracking-wider hover:bg-[#183326]"
                >
                  Применить
                </button>
              </div>
              {promoApplied && (
                <span className="text-[11px] text-emerald-700 flex items-center gap-1 mt-1.5 font-medium">
                  <CheckCircle2 size={13} /> Промокод PRIVE5 применён (-5%)
                </span>
              )}
            </div>

            {/* Price lines */}
            <div className="space-y-2 text-xs text-[#2B2620]/80 pb-4 border-b border-[#E2E2E2]">
              <div className="flex justify-between">
                <span>Товары ({cart.length} поз.):</span>
                <span>{cartTotal.toLocaleString("ru-RU")} ₽</span>
              </div>
              {promoApplied && (
                <div className="flex justify-between text-[#20402D] font-semibold">
                  <span>Скидка PRIVÉ (5%):</span>
                  <span>- {priveDiscount.toLocaleString("ru-RU")} ₽</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Доставка:</span>
                <span>{deliveryCost === 0 ? "Бесплатно" : `${deliveryCost} ₽`}</span>
              </div>
            </div>

            {/* Total */}
            <div className="pt-4 pb-6 flex justify-between items-baseline">
              <span className="font-serif text-sm uppercase tracking-wider text-[#2B2620]">Итого:</span>
              <span className="font-serif text-3xl font-bold text-[#2B2620]">
                {finalPrice.toLocaleString("ru-RU")} ₽
              </span>
            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              className="w-full bg-[#20402D] hover:bg-[#183326] text-white py-4 text-xs uppercase tracking-[0.22em] font-medium transition-colors shadow-xl flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Подтвердить заказ</span>
              <ArrowRight size={15} />
            </button>

            <p className="text-[10px] text-[#777777] text-center mt-3 leading-normal">
              Нажимая кнопку, вы соглашаетесь с условиями оферты и политики обработки персональных данных (152-ФЗ)
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
