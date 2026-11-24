"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Ruler, Truck, RefreshCw, ShieldCheck, ArrowRight, Bell, Plus, X } from "lucide-react";
import { Product, ShoeSize } from "@/types";
import { ruBadge } from "@/lib/badge";
import { PRODUCTS } from "@/data/mockData";
import { useShop } from "@/context/ShopContext";
import ProductCard from "@/components/ProductCard";
import { asset } from "@/lib/asset";

interface Props {
  product: Product;
}

function Accordion({ title, children, open = false }: { title: string; children: React.ReactNode; open?: boolean }) {
  return (
    <details open={open} className="group border-b border-[#2B2620]/12">
      <summary className="flex items-center justify-between py-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
        <span className="font-display uppercase text-[18px] tracking-[0.02em] text-[#2B2620]">{title}</span>
        <Plus size={18} className="text-[#20402D] transition-transform duration-300 group-open:rotate-45" />
      </summary>
      <div className="pb-6 text-[15px] text-[#2B2620]/75 leading-relaxed">{children}</div>
    </details>
  );
}

export default function ProductDetailClient({ product }: Props) {
  const { selectedSize, addToCart, setIsSizeModalOpen, setIsVeraOpen } = useShop();

  const sizes = [...product.sizes].sort((a, b) => a.size - b.size);
  const firstInStock = sizes.find((s) => s.inStock)?.size ?? null;
  const userInStock = selectedSize && sizes.some((s) => s.size === selectedSize && s.inStock) ? selectedSize : null;
  const [chosenSize, setChosenSize] = useState<ShoeSize | null>(userInStock ?? firstInStock);
  const [slide, setSlide] = useState(0);
  const [added, setAdded] = useState(false);
  const [notifyOpen, setNotifyOpen] = useState(false);
  const [notifyContact, setNotifyContact] = useState("");
  const [notifyDone, setNotifyDone] = useState(false);

  const soldOut = sizes.every((s) => !s.inStock);
  const discount = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : 0;
  const model = product.model || product.typeLabel;
  const chosen = sizes.find((s) => s.size === chosenSize);

  const sameModel = PRODUCTS.filter((p) => p.id !== product.id && p.model && p.model === product.model);
  const related = [
    ...sameModel,
    ...PRODUCTS.filter((p) => p.id !== product.id && p.categorySlug === product.categorySlug && !sameModel.includes(p)),
  ].slice(0, 4);

  const add = () => {
    if (!chosenSize) return;
    addToCart(product, chosenSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  };

  const submitNotify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!notifyContact) return;
    setNotifyDone(true);
    setTimeout(() => {
      setNotifyDone(false);
      setNotifyOpen(false);
      setNotifyContact("");
    }, 2500);
  };

  return (
    <div className="bg-[#F3F3F3] min-h-screen pb-24">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8">
        {/* Breadcrumbs */}
        <nav className="py-5 text-[12px] text-[#2B2620]/45 flex items-center gap-2 overflow-hidden whitespace-nowrap">
          <Link href="/" className="hover:text-[#20402D]">Главная</Link>
          <span>/</span>
          <Link href="/catalog" className="hover:text-[#20402D]">Каталог</Link>
          <span>/</span>
          <Link href={`/catalog?category=${product.categorySlug}`} className="hover:text-[#20402D]">{product.category}</Link>
          <span>/</span>
          <span className="text-[#2B2620]/70 truncate">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          {/* Gallery */}
          <div className="lg:col-span-7">
            {/* Mobile: swipe */}
            <div className="lg:hidden -mx-5 sm:-mx-8">
              <div
                className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar"
                onScroll={(e) => {
                  const el = e.currentTarget;
                  setSlide(Math.round(el.scrollLeft / el.clientWidth));
                }}
              >
                {product.images.map((img, i) => (
                  <div key={img} className="relative shrink-0 w-full aspect-[4/5] snap-center">
                    <Image src={img} alt={i === 0 ? product.name : ""} fill preload={i === 0} sizes="100vw" className="object-cover" />
                  </div>
                ))}
              </div>
              <div className="mt-3 flex justify-center gap-1.5">
                {product.images.map((_, i) => (
                  <span key={i} className={`h-[3px] rounded-full transition-all ${i === slide ? "w-6 bg-[#20402D]" : "w-3 bg-[#2B2620]/20"}`} />
                ))}
              </div>
            </div>

            {/* Desktop: editorial grid */}
            <div className="hidden lg:grid grid-cols-2 gap-3">
              {product.images.map((img, i) => (
                <div key={img} className={`relative overflow-hidden rounded-[22px] bg-[#F3F3F3] ${i === 0 ? "col-span-2 aspect-[5/4]" : "aspect-[4/5]"}`}>
                  <Image src={img} alt={i === 0 ? product.name : ""} fill preload={i === 0} sizes={i === 0 ? "58vw" : "29vw"} className="object-cover" />
                  {i === 0 && (product.isNew || product.badge) && (
                    <div className="absolute top-5 left-5 flex gap-1.5">
                      {product.isNew && <span className="bg-white text-[#2B2620] text-[10px] uppercase tracking-[0.18em] px-3 py-1.5 rounded-full font-semibold">Новинка</span>}
                      {product.badge && !/^NEW$/i.test(product.badge) && (
                        <span className="bg-[#20402D] text-white text-[10px] uppercase tracking-[0.18em] px-3 py-1.5 rounded-full font-semibold">{ruBadge(product.badge)}</span>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <span className="text-[11px] uppercase tracking-[0.22em] text-[#2B2620]/50 first-letter:uppercase">
              {product.typeLabel} · {product.color}
            </span>
            <h1 className="mt-3 font-display uppercase text-[clamp(44px,5vw,76px)] leading-[1] tracking-[-0.01em] text-[#2B2620]">{model}</h1>

            <div className="mt-5 flex items-baseline gap-3">
              <span className={`font-display text-[34px] leading-none ${product.oldPrice ? "text-[#20402D]" : "text-[#2B2620]"}`}>
                {product.price.toLocaleString("ru-RU")} ₽
              </span>
              {product.oldPrice && (
                <>
                  <span className="text-[16px] text-[#2B2620]/40 line-through">{product.oldPrice.toLocaleString("ru-RU")} ₽</span>
                  <span className="h-7 px-2.5 rounded-full bg-[#20402D] text-white text-[12px] font-semibold flex items-center">−{discount}%</span>
                </>
              )}
            </div>

            {/* Sizes */}
            <div className="mt-9">
              <div className="flex items-end justify-between mb-3">
                <span className="text-[11px] uppercase tracking-[0.22em] text-[#2B2620]/50">Размер · длина стельки</span>
                <button onClick={() => setIsSizeModalOpen(true)} className="flex items-center gap-1.5 text-[13px] text-[#20402D] hover:underline cursor-pointer">
                  <Ruler size={14} /> Подобрать размер
                </button>
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                {sizes.map((s) => {
                  const active = chosenSize === s.size;
                  return (
                    <button
                      key={s.size}
                      disabled={!s.inStock}
                      onClick={() => setChosenSize(s.size)}
                      className={`h-[62px] rounded-2xl border flex flex-col items-center justify-center transition-colors ${
                        !s.inStock
                          ? "border-transparent bg-[#2B2620]/[0.04] text-[#2B2620]/30 cursor-not-allowed"
                          : active
                          ? "bg-[#20402D] border-[#20402D] text-white"
                          : "bg-white border-[#2B2620]/10 text-[#2B2620] hover:border-[#20402D] cursor-pointer"
                      }`}
                    >
                      <span className={`font-display text-[19px] leading-none ${!s.inStock ? "line-through" : ""}`}>{s.size}</span>
                      {s.lengthCm && <span className={`mt-1 text-[11px] ${active ? "text-white/75" : "opacity-60"}`}>{s.lengthCm} см</span>}
                    </button>
                  );
                })}
              </div>
              <p className="mt-3 flex items-center gap-2 text-[13px] text-[#2B2620]/60">
                <span className="w-1.5 h-1.5 rounded-full bg-[#20402D]" />
                {product.fitHintText}
              </p>
            </div>

            {/* Buy */}
            <div className="mt-8 space-y-3">
              {soldOut ? (
                <button onClick={() => setNotifyOpen(true)} className="w-full h-16 rounded-full bg-[#2B2620] text-white text-[13px] uppercase tracking-[0.2em] font-semibold flex items-center justify-center gap-2 cursor-pointer">
                  <Bell size={16} /> Сообщить о поступлении
                </button>
              ) : (
                <button
                  onClick={add}
                  disabled={!chosenSize}
                  className="btn-shine w-full h-16 rounded-full bg-[#20402D] hover:bg-[#183326] disabled:opacity-40 text-white flex items-center justify-between pl-8 pr-2 transition-colors cursor-pointer"
                >
                  <span className="text-[13px] uppercase tracking-[0.2em] font-semibold">
                    {added ? "Добавлено в корзину" : `В корзину${chosenSize ? ` · ${chosenSize}` : ""}`}
                  </span>
                  <span className="h-12 pl-5 pr-2 rounded-full bg-white text-[#20402D] flex items-center gap-3 font-display text-[18px]">
                    {product.price.toLocaleString("ru-RU")} ₽
                    <span className="w-8 h-8 rounded-full bg-[#20402D] text-white flex items-center justify-center"><ArrowRight size={15} /></span>
                  </span>
                </button>
              )}
              <div className="flex items-center justify-between gap-3">
                <button onClick={() => setIsVeraOpen(true)} className="flex items-center gap-3 text-left cursor-pointer group">
                  <span className="relative w-10 h-10 rounded-full overflow-hidden shrink-0">
                    <Image src={asset("/tallora/vera.webp")} alt="Стилист Вера" fill sizes="40px" className="object-cover" />
                  </span>
                  <span className="text-[13px] leading-tight">
                    <span className="block font-semibold text-[#2B2620] group-hover:text-[#20402D]">Помощь стилиста</span>
                    <span className="text-[#2B2620]/55">Подскажем по посадке и образу</span>
                  </span>
                </button>
                {!soldOut && chosen && !chosen.inStock ? null : !soldOut && (
                  <button onClick={() => setNotifyOpen(true)} className="text-[12px] text-[#2B2620]/55 hover:text-[#20402D] flex items-center gap-1.5 cursor-pointer">
                    <Bell size={13} /> Ждёшь свой размер?
                  </button>
                )}
              </div>
            </div>

            {/* Perks */}
            <div className="mt-8 grid grid-cols-3 gap-2">
              {[
                { icon: RefreshCw, t: "14 дней", d: "на возврат" },
                { icon: Truck, t: "СДЭК", d: "по всей России" },
                { icon: ShieldCheck, t: "Москва", d: "примерка от 3 пар" },
              ].map(({ icon: Icon, t, d }) => (
                <div key={t} className="rounded-2xl bg-white px-3 py-4 text-center">
                  <Icon size={18} className="mx-auto text-[#20402D]" />
                  <span className="mt-2 block font-display uppercase text-[15px] leading-none">{t}</span>
                  <span className="mt-1 block text-[11px] text-[#2B2620]/55">{d}</span>
                </div>
              ))}
            </div>

            {/* Details */}
            <div className="mt-8 border-t border-[#2B2620]/12">
              <Accordion title="О модели" open>
                <p>{product.description}</p>
                <dl className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 text-[14px]">
                  {[
                    ["Цвет", product.color],
                    ["Каблук", product.heelHeight],
                    ["Сезон", product.season],
                    ["Материал", product.material],
                  ].map(([k, v]) => (
                    <div key={k} className="border-t border-[#2B2620]/10 pt-2">
                      <dt className="text-[11px] uppercase tracking-[0.16em] text-[#2B2620]/45">{k}</dt>
                      <dd className="mt-0.5 text-[#2B2620] first-letter:uppercase">{v}</dd>
                    </div>
                  ))}
                </dl>
              </Accordion>
              <Accordion title="Материалы и колодка">
                <ul className="space-y-2">
                  {(product.details.length ? product.details : [product.material]).map((item, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#20402D] shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Accordion>
              <Accordion title="Уход и хранение">
                <p>{product.care}</p>
              </Accordion>
              <Accordion title="Доставка и возврат">
                <p>
                  По всей России – СДЭК до двери или пункта выдачи. По Москве – курьер за 700 ₽, от 3 пар бесплатно и с
                  примеркой. Вернуть пару без следов носки можно в течение 14 дней.{" "}
                  <Link href="/delivery" className="text-[#20402D] underline">Подробнее</Link>
                </p>
              </Accordion>
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-24">
            <div className="flex items-end justify-between gap-4 mb-8">
              <h2 className="font-display uppercase text-[clamp(32px,4vw,56px)] leading-[1.05] text-[#2B2620]">
                {sameModel.length ? <>Другие цвета <span className="text-accent">и похожие</span></> : <>Похожие <span className="text-accent">модели</span></>}
              </h2>
              <Link href={`/catalog?category=${product.categorySlug}`} className="shrink-0 text-[11px] uppercase tracking-[0.22em] font-semibold border-b border-[#2B2620] pb-1 hover:text-[#20402D] hover:border-[#20402D]">
                Все {product.category.toLowerCase()}
              </Link>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-3 sm:gap-x-6 gap-y-10">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Notify modal */}
      {notifyOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4 bg-[#2B2620]/45 backdrop-blur-sm animate-fadeIn" onClick={() => setNotifyOpen(false)}>
          <div className="relative w-full max-w-md bg-white rounded-t-[28px] sm:rounded-[28px] p-7 sm:p-8" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setNotifyOpen(false)} aria-label="Закрыть" className="absolute top-5 right-5 w-10 h-10 rounded-full hover:bg-[#F3F3F3] flex items-center justify-center">
              <X size={18} />
            </button>
            <h3 className="font-display uppercase text-[30px] leading-[1.05] pr-10">
              Сообщим <span className="text-accent">о поступлении</span>
            </h3>
            <p className="mt-3 text-[14px] text-[#2B2620]/65">Оставь почту или телефон – напишем первой, когда {model} появится в нужном размере</p>
            {notifyDone ? (
              <p className="mt-6 rounded-2xl bg-[#20402D] text-white p-4 text-[14px]">Готово! Мы напишем, как только пара появится</p>
            ) : (
              <form onSubmit={submitNotify} className="mt-6 space-y-3">
                <input
                  value={notifyContact}
                  onChange={(e) => setNotifyContact(e.target.value)}
                  placeholder="E-mail или телефон"
                  required
                  className="w-full h-13 px-5 py-4 rounded-full bg-[#F3F3F3] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#20402D]/30"
                />
                <button type="submit" className="w-full h-13 py-4 rounded-full bg-[#20402D] text-white text-[12px] uppercase tracking-[0.2em] font-semibold">
                  Сообщить мне
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
