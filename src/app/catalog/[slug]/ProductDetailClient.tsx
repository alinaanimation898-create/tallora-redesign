"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Ruler,
  HelpCircle,
  Truck,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Bell,
  Star,
  Check,
  ChevronDown,
} from "lucide-react";
import { Product, ShoeSize } from "@/types";
import { PRODUCTS } from "@/data/mockData";
import { useShop } from "@/context/ShopContext";
import ProductCard from "@/components/ProductCard";

interface Props {
  product: Product;
}

export default function ProductDetailClient({ product }: Props) {
  const {
    selectedSize,
    addToCart,
    setIsSizeModalOpen,
    setIsVeraOpen,
    isPriveMember,
  } = useShop();

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [chosenSize, setChosenSize] = useState<ShoeSize | null>(
    selectedSize || product.sizes.find((s) => s.inStock)?.size || 42
  );
  const [notifyModalOpen, setNotifyModalOpen] = useState(false);
  const [notifyEmail, setNotifyEmail] = useState("");
  const [notifySuccess, setNotifySuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<"desc" | "details" | "care">("desc");

  // Related products
  // Other colours of the same model first, then the rest of the category.
  const sameModel = PRODUCTS.filter((p) => p.id !== product.id && p.model && p.model === product.model);
  const relatedProducts = [
    ...sameModel,
    ...PRODUCTS.filter((p) => p.id !== product.id && p.categorySlug === product.categorySlug && !sameModel.includes(p)),
  ].slice(0, 4);
  const wornWithProducts = PRODUCTS.filter((p) => p.categorySlug !== product.categorySlug && p.isNew).slice(0, 4);
  const sizeNums = product.sizes.map((s) => s.size);
  const sizeRange = sizeNums.length ? `${Math.min(...sizeNums)}–${Math.max(...sizeNums)}` : "";
  const soldOut = product.sizes.every((s) => !s.inStock);

  const handleAddToCart = () => {
    if (chosenSize) {
      addToCart(product, chosenSize);
    }
  };

  const handleNotifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (notifyEmail) {
      setNotifySuccess(true);
      setTimeout(() => {
        setNotifySuccess(false);
        setNotifyModalOpen(false);
        setNotifyEmail("");
      }, 2500);
    }
  };

  return (
    <div className="bg-[#F3F3F3] min-h-screen pb-24">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-4 text-[11px] text-[#2B2620]/60 flex items-center gap-2 overflow-hidden whitespace-nowrap">
        <Link href="/" className="hover:text-[#20402D]">Главная</Link>
        <span>/</span>
        <Link href="/catalog" className="hover:text-[#20402D]">Каталог</Link>
        <span>/</span>
        <Link href={`/catalog?category=${product.categorySlug}`} className="hover:text-[#20402D]">{product.category}</Link>
        <span>/</span>
        <span className="text-[#2B2620] font-medium truncate">{product.name}</span>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pt-2 sm:pt-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
          {/* LEFT: 6-8 PHOTOS GALLERY */}
          <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-3 md:gap-4">
            {/* Thumbnails column */}
            <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto max-h-[700px] no-scrollbar shrink-0">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIdx(idx)}
                  className={`relative w-16 h-20 sm:w-20 sm:h-26 rounded-xl border shrink-0 bg-[#EAEAEA] overflow-hidden transition-all ${
                    activeImageIdx === idx
                      ? "border-[#20402D] ring-1 ring-[#20402D]"
                      : "border-[#E2E2E2] opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image src={img} alt={`${product.name} - фото ${idx + 1}`} fill sizes="80px" className="object-cover" />
                </button>
              ))}
            </div>

            {/* Main Stage Image - 3:4 High Editorial Display */}
            <div className="flex-1">
              <div className="relative aspect-[3/4] w-full bg-[#EAEAEA] rounded-[22px] overflow-hidden">
                <Image
                  src={product.images[activeImageIdx] || product.images[0]}
                  alt={product.name}
                  fill
                  preload
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover object-center"
                />

                {product.badge && (
                  <div className="absolute top-4 left-4 bg-[#20402D] text-white text-[10px] uppercase tracking-[0.2em] px-3 py-1.5 rounded-full font-semibold">
                    {product.badge}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT: BUYING PANEL & SIZE PICKER */}
          <div className="lg:col-span-5 bg-[#FFFFFF] p-5 sm:p-8 rounded-[24px] border border-[#2B2620]/8 lg:sticky lg:top-28">
            <span className="text-xs uppercase tracking-[0.25em] text-[#20402D] font-semibold block mb-1">
              {product.typeLabel} · {product.heelHeight === "Без каблука" ? "без каблука" : `каблук ${product.heelHeight}`}
            </span>

            <h1 className="font-serif text-[34px] sm:text-5xl text-[#2B2620] leading-[1] mb-4">
              {product.typeLabel} <span className="">{product.model}</span>
              <span className="block text-lg sm:text-xl text-[#2B2620]/55 mt-2 first-letter:uppercase">{product.color}</span>
            </h1>

            {/* Price & Club Perks */}
            <div className="flex items-baseline justify-between py-3 border-y border-[#E2E2E2] mb-5">
              <div className="flex items-baseline gap-3">
                <span className="font-display text-3xl text-[#2B2620]">
                  {product.price.toLocaleString("ru-RU")} ₽
                </span>
                {product.oldPrice && (
                  <span className="text-sm text-[#2B2620]/40 line-through font-display">
                    {product.oldPrice.toLocaleString("ru-RU")} ₽
                  </span>
                )}
              </div>
            </div>

            {/* FIT HINT BOX */}
            <div className="bg-[#F5F0E8] p-4 rounded-2xl mb-6">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#2B2620] mb-1">
                <span className="w-2 h-2 rounded-full bg-[#20402D] text-white" />
                Посадка по колодке:
              </div>
              <p className="text-xs text-[#2B2620]/80 leading-relaxed">
                {product.fitHintText}
              </p>
            </div>

            {/* SIZE SELECTOR WITH LABELS */}
            <div className="mb-6">
              <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 mb-3">
                <span className="text-[11px] uppercase tracking-wider font-semibold text-[#2B2620]">
                  Размер · длина стельки{sizeRange && ` (${sizeRange})`}:
                </span>
                <button
                  onClick={() => setIsSizeModalOpen(true)}
                  className="text-xs text-[#20402D] underline flex items-center gap-1 hover:opacity-80"
                >
                  <Ruler size={13} />
                  Подобрать размер в см
                </button>
              </div>

              <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                {[...product.sizes].sort((a, b) => a.size - b.size).map((s) => (
                  <button
                    key={s.size}
                    disabled={!s.inStock}
                    onClick={() => setChosenSize(s.size)}
                    className={`py-2.5 rounded-2xl font-display text-base border text-center transition-all relative ${
                      !s.inStock
                        ? "opacity-35 line-through bg-[#F3F3F3] border-transparent cursor-not-allowed text-[#2B2620]/50"
                        : chosenSize === s.size
                        ? "bg-[#20402D] text-white border-[#20402D] font-bold shadow-xs"
                        : "bg-white text-white border-[#E2E2E2] hover:border-[#2B2620]"
                    }`}
                  >
                    <span className="block">{s.size}</span>
                    {s.lengthCm && <span className="block text-[10px] font-sans opacity-60 no-underline">{s.lengthCm} см</span>}
                    {s.stockCount === 1 && s.inStock && (
                      <span className="absolute -top-1.5 -right-1 w-2.5 h-2.5 rounded-full bg-amber-500" title="Осталась 1 пара!" />
                    )}
                  </button>
                ))}
              </div>

              {/* Status for chosen size */}
              <div className="mt-2.5 flex items-center justify-between text-[11px] text-[#2B2620]/70">
                {chosenSize && (
                  <span>
                    Выбран размер: <strong className="text-[#2B2620]">{chosenSize}</strong>
                    {product.sizes.find((s) => s.size === chosenSize)?.stockCount === 1 && (
                      <span className="text-[#20402D] font-semibold ml-2">
                        – последняя пара!
                      </span>
                    )}
                  </span>
                )}
                <button
                  onClick={() => setNotifyModalOpen(true)}
                  className="text-[#20402D] hover:underline flex items-center gap-1 text-[10px]"
                >
                  <Bell size={11} /> Сообщить о поступлении
                </button>
              </div>
            </div>

            {/* BUY ACTIONS */}
            <div className="space-y-3 mb-6">
              <button
                onClick={handleAddToCart}
                disabled={!chosenSize || soldOut}
                className="w-full h-14 rounded-full bg-[#20402D] hover:bg-[#183326] disabled:opacity-40 text-white px-6 text-[12px] uppercase tracking-[0.2em] font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{soldOut ? "Скоро снова" : `Хочу в ${chosenSize} размере`}</span>
                <ArrowRight size={15} />
              </button>

              <button
                onClick={() => setIsVeraOpen(true)}
                className="w-full h-12 rounded-full bg-transparent hover:bg-[#F5F0E8] text-[#2B2620] border border-[#2B2620]/20 px-6 text-[11px] uppercase tracking-[0.18em] transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles size={14} className="text-[#20402D]" />
                <span>Спросить Веру о посадке</span>
              </button>
            </div>

            {/* TRUST & LOGISTICS PERKS */}
            <div className="space-y-3 pt-4 border-t border-[#E2E2E2] text-xs text-[#2B2620]/80">
              <div className="flex items-center gap-3">
                <RefreshCw size={16} className="text-[#20402D] shrink-0" />
                <span><strong>Возврат 14 дней</strong> – если пара без следов носки</span>
              </div>
              <div className="flex items-center gap-3">
                <Truck size={16} className="text-[#20402D] shrink-0" />
                <span><strong>СДЭК по всей России</strong>, по Москве курьером 700 ₽ - от 3 пар бесплатно и с примеркой</span>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck size={16} className="text-[#20402D] shrink-0" />
                <span><strong>{product.material}</strong></span>
              </div>
            </div>
          </div>
        </div>

        {/* TABS: Description, Details & Care */}
        <div className="mt-16 bg-[#FFFFFF] p-6 sm:p-10 border border-[#E2E2E2] rounded-[24px]">
          <div className="flex gap-8 border-b border-[#E2E2E2] pb-3 text-xs uppercase tracking-[0.2em] font-medium">
            <button
              onClick={() => setActiveTab("desc")}
              className={`pb-2 transition-colors relative ${
                activeTab === "desc" ? "text-[#20402D] font-bold" : "text-[#2B2620]/70"
              }`}
            >
              О модели
              {activeTab === "desc" && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#20402D] text-white" />}
            </button>
            <button
              onClick={() => setActiveTab("details")}
              className={`pb-2 transition-colors relative ${
                activeTab === "details" ? "text-[#20402D] font-bold" : "text-[#2B2620]/70"
              }`}
            >
              Материалы и колодка
              {activeTab === "details" && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#20402D] text-white" />}
            </button>
            <button
              onClick={() => setActiveTab("care")}
              className={`pb-2 transition-colors relative ${
                activeTab === "care" ? "text-[#20402D] font-bold" : "text-[#2B2620]/70"
              }`}
            >
              Уход и хранение
              {activeTab === "care" && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#20402D] text-white" />}
            </button>
          </div>

          <div className="pt-6 text-sm leading-relaxed text-[#2B2620]/80">
            {activeTab === "desc" && (
              <div className="space-y-4 max-w-3xl">
                <p>{product.description}</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 text-xs">
                  <div className="bg-[#F3F3F3] p-3 border border-[#E2E2E2] rounded-2xl">
                    <span className="text-[#888888] block text-[10px] uppercase">Цвет</span>
                    <strong className="text-[#2B2620]">{product.color}</strong>
                  </div>
                  <div className="bg-[#F3F3F3] p-3 border border-[#E2E2E2] rounded-2xl">
                    <span className="text-[#888888] block text-[10px] uppercase">Высота каблука</span>
                    <strong className="text-[#2B2620]">{product.heelHeight}</strong>
                  </div>
                  <div className="bg-[#F3F3F3] p-3 border border-[#E2E2E2] rounded-2xl">
                    <span className="text-[#888888] block text-[10px] uppercase">Сезон</span>
                    <strong className="text-[#2B2620]">{product.season}</strong>
                  </div>
                  <div className="bg-[#F3F3F3] p-3 border border-[#E2E2E2] rounded-2xl">
                    <span className="text-[#888888] block text-[10px] uppercase">Материал</span>
                    <strong className="text-[#2B2620]">{product.material}</strong>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "details" && (
              <ul className="space-y-2.5 max-w-2xl text-xs sm:text-sm">
                {(product.details.length ? product.details : [product.material]).map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <Check size={15} className="text-[#20402D] shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}

            {activeTab === "care" && (
              <div className="max-w-2xl text-xs sm:text-sm space-y-2">
                <p>{product.care}</p>
              </div>
            )}
          </div>
        </div>

        {/* НОСЯТ С ЭТИМ */}
        <section className="mt-20">
          <div className="flex justify-between items-end mb-8">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-[#20402D] font-semibold block mb-1">
                Только что в каталоге
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl text-[#2B2620]">
                Забирай первой
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {wornWithProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>

        {/* ПОХОЖИЕ МОДЕЛИ */}
        <section className="mt-20">
          <div className="flex justify-between items-end mb-8">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-[#20402D] font-semibold block mb-1">
                Вам может понравиться
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl text-[#2B2620]">
                {sameModel.length ? "Другие цвета и похожие" : "Похожие модели"}
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>

      </div>

      {/* NOTIFY ABOUT SIZE MODAL */}
      {notifyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2B2620]/45 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-md bg-[#FFFFFF] border border-[#E2E2E2] shadow-2xl p-6 sm:p-8 rounded-[24px]">
            <button
              onClick={() => setNotifyModalOpen(false)}
              className="absolute top-4 right-4 text-[#2B2620]/60 hover:text-[#20402D]"
            >
              ✕
            </button>
            <h3 className="font-serif text-xl text-[#2B2620] mb-2">
              Сообщить о поступлении
            </h3>
            <p className="text-xs text-[#2B2620]/70 mb-4">
              Оставьте контакты, и мы уведомим вас первым о поступлении нужного размера модели <strong>{product.name}</strong>.
            </p>

            {notifySuccess ? (
              <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs">
                ✓ Спасибо! Мы пришлем персональное уведомление и забронируем пару.
              </div>
            ) : (
              <form onSubmit={handleNotifySubmit} className="space-y-3">
                <input
                  type="email"
                  value={notifyEmail}
                  onChange={(e) => setNotifyEmail(e.target.value)}
                  placeholder="Ваш e-mail или номер телефона"
                  required
                  className="w-full p-3 bg-white border border-[#E2E2E2] text-xs focus:outline-none focus:border-[#20402D] rounded-xl"
                />
                <button
                  type="submit"
                  className="w-full bg-[#20402D] text-white py-3 text-xs uppercase tracking-wider font-medium"
                >
                  Уведомить меня
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
