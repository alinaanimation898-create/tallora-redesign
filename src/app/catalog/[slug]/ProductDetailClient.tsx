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
import { PRODUCTS, REVIEWS } from "@/data/mockData";
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
  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4);
  const wornWithProducts = PRODUCTS.filter((p) => p.categorySlug !== product.categorySlug).slice(0, 2);

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-[11px] text-[#2B2620]/60 flex items-center gap-2">
        <Link href="/" className="hover:text-[#8F6D2F]">Главная</Link>
        <span>/</span>
        <Link href="/catalog" className="hover:text-[#8F6D2F]">Каталог</Link>
        <span>/</span>
        <Link href={`/catalog?category=${product.categorySlug}`} className="hover:text-[#8F6D2F]">{product.category}</Link>
        <span>/</span>
        <span className="text-[#2B2620] font-medium truncate">{product.name}</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* LEFT: 6-8 PHOTOS GALLERY */}
          <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
            {/* Thumbnails column */}
            <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto max-h-[700px] no-scrollbar shrink-0">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIdx(idx)}
                  className={`relative w-16 h-22 sm:w-20 sm:h-26 border shrink-0 bg-[#EAEAEA] overflow-hidden transition-all ${
                    activeImageIdx === idx
                      ? "border-[#DAB16B] ring-2 ring-[#DAB16B]"
                      : "border-[#E2E2E2] opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image src={img} alt={`view ${idx + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>

            {/* Main Stage Image - 3:4 High Editorial Display */}
            <div className="flex-1">
              <div className="relative aspect-[3/4] w-full bg-[#EAEAEA] border border-[#E2E2E2] overflow-hidden">
                <Image
                  src={product.images[activeImageIdx] || product.images[0]}
                  alt={product.name}
                  fill
                  priority
                  className="object-cover object-center"
                />

                {/* Model Height Reference Overlay Tag */}
                <div className="absolute bottom-4 left-4 bg-[#2B2620]/45 backdrop-blur-md text-[#F3F3F3] px-3 py-1.5 text-xs font-mono">
                  {product.modelInfo.text}
                </div>

                {product.isHit && (
                  <div className="absolute top-4 left-4 bg-[#DAB16B] text-[#2B2620] text-[9px] uppercase tracking-[0.2em] px-3 py-1 font-semibold">
                    Хит продаж
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT: BUYING PANEL & SIZE PICKER */}
          <div className="lg:col-span-5 bg-[#FFFFFF] p-6 sm:p-8 border border-[#E2E2E2] shadow-xs">
            <span className="text-xs uppercase tracking-[0.25em] text-[#8F6D2F] font-semibold block mb-1">
              {product.category} · Каблук {product.heelHeight}
            </span>

            <h1 className="font-serif text-2xl sm:text-4xl text-[#2B2620] leading-tight mb-3">
              {product.name}
            </h1>

            {/* Price & Club Perks */}
            <div className="flex items-baseline justify-between py-3 border-y border-[#E2E2E2] mb-5">
              <div className="flex items-baseline gap-3">
                <span className="font-serif text-3xl font-bold text-[#2B2620]">
                  {product.price.toLocaleString("ru-RU")} ₽
                </span>
                {product.oldPrice && (
                  <span className="text-sm text-[#888888] line-through font-serif">
                    {product.oldPrice.toLocaleString("ru-RU")} ₽
                  </span>
                )}
              </div>
              <span className="text-xs bg-[#DAB16B]/10 text-[#8F6D2F] px-2.5 py-1 font-semibold tracking-wide">
                +{product.clubBonus} баллов PRIVÉ
              </span>
            </div>

            {/* FIT HINT BOX */}
            <div className="bg-[#F3F3F3] p-4 border border-[#D4D4D4] mb-6">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#2B2620] mb-1">
                <span className="w-2 h-2 rounded-full bg-[#DAB16B]" />
                Посадка по колодке:
              </div>
              <p className="text-xs text-[#2B2620]/80 leading-relaxed">
                {product.fitHintText}
              </p>
            </div>

            {/* SIZE SELECTOR WITH LABELS */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase tracking-wider font-semibold text-[#2B2620]">
                  Размер в наличии (39–44):
                </span>
                <button
                  onClick={() => setIsSizeModalOpen(true)}
                  className="text-xs text-[#8F6D2F] underline flex items-center gap-1 hover:opacity-80"
                >
                  <Ruler size={13} />
                  Не знаю размер (калькулятор)
                </button>
              </div>

              <div className="grid grid-cols-6 gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s.size}
                    disabled={!s.inStock}
                    onClick={() => setChosenSize(s.size)}
                    className={`py-3 text-sm font-serif border text-center transition-all relative ${
                      !s.inStock
                        ? "opacity-35 line-through bg-gray-100 border-[#E2E2E2] cursor-not-allowed text-gray-400"
                        : chosenSize === s.size
                        ? "bg-[#DAB16B] text-[#2B2620] border-[#DAB16B] font-bold shadow-xs"
                        : "bg-white text-[#2B2620] border-[#E2E2E2] hover:border-[#2B2620]"
                    }`}
                  >
                    {s.size}
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
                      <span className="text-[#8F6D2F] font-semibold ml-2">
                        — последняя пара!
                      </span>
                    )}
                  </span>
                )}
                <button
                  onClick={() => setNotifyModalOpen(true)}
                  className="text-[#8F6D2F] hover:underline flex items-center gap-1 text-[10px]"
                >
                  <Bell size={11} /> Сообщить о поступлении
                </button>
              </div>
            </div>

            {/* BUY ACTIONS */}
            <div className="space-y-3 mb-6">
              <button
                onClick={handleAddToCart}
                disabled={!chosenSize}
                className="w-full bg-[#DAB16B] hover:bg-[#C99B4F] disabled:opacity-40 text-[#2B2620] py-4 px-6 text-xs uppercase tracking-[0.22em] font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <span>Добавить в корзину ({chosenSize} размер)</span>
                <ArrowRight size={15} />
              </button>

              <button
                onClick={() => setIsVeraOpen(true)}
                className="w-full bg-transparent hover:bg-white text-[#2B2620] border border-[#2B2620]/30 py-3 px-6 text-xs uppercase tracking-[0.18em] transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles size={14} className="text-[#8F6D2F]" />
                <span>Спросить Веру о посадке</span>
              </button>
            </div>

            {/* TRUST & LOGISTICS PERKS */}
            <div className="space-y-3 pt-4 border-t border-[#E2E2E2] text-xs text-[#2B2620]/80">
              <div className="flex items-center gap-3">
                <RefreshCw size={16} className="text-[#8F6D2F] shrink-0" />
                <span><strong>Бесплатный обмен размера</strong> — курьер привезет пару на замену без доплат</span>
              </div>
              <div className="flex items-center gap-3">
                <Truck size={16} className="text-[#8F6D2F] shrink-0" />
                <span><strong>Примерка 15 минут</strong> перед покупкой при курьерской доставке</span>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck size={16} className="text-[#8F6D2F] shrink-0" />
                <span><strong>100% итальянская кожа</strong> наппа и чепрак без токсичного пластика</span>
              </div>
            </div>
          </div>
        </div>

        {/* TABS: Description, Details & Care */}
        <div className="mt-16 bg-[#FFFFFF] p-6 sm:p-10 border border-[#E2E2E2]">
          <div className="flex gap-8 border-b border-[#E2E2E2] pb-3 text-xs uppercase tracking-[0.2em] font-medium">
            <button
              onClick={() => setActiveTab("desc")}
              className={`pb-2 transition-colors relative ${
                activeTab === "desc" ? "text-[#8F6D2F] font-bold" : "text-[#2B2620]/70"
              }`}
            >
              О модели
              {activeTab === "desc" && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#DAB16B]" />}
            </button>
            <button
              onClick={() => setActiveTab("details")}
              className={`pb-2 transition-colors relative ${
                activeTab === "details" ? "text-[#8F6D2F] font-bold" : "text-[#2B2620]/70"
              }`}
            >
              Материалы и колодка
              {activeTab === "details" && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#DAB16B]" />}
            </button>
            <button
              onClick={() => setActiveTab("care")}
              className={`pb-2 transition-colors relative ${
                activeTab === "care" ? "text-[#8F6D2F] font-bold" : "text-[#2B2620]/70"
              }`}
            >
              Уход и хранение
              {activeTab === "care" && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#DAB16B]" />}
            </button>
          </div>

          <div className="pt-6 text-sm leading-relaxed text-[#2B2620]/80">
            {activeTab === "desc" && (
              <div className="space-y-4 max-w-3xl">
                <p>{product.description}</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 text-xs">
                  <div className="bg-[#F3F3F3] p-3 border border-[#E2E2E2]">
                    <span className="text-[#888888] block text-[10px] uppercase">Цвет</span>
                    <strong className="text-[#2B2620]">{product.color}</strong>
                  </div>
                  <div className="bg-[#F3F3F3] p-3 border border-[#E2E2E2]">
                    <span className="text-[#888888] block text-[10px] uppercase">Высота каблука</span>
                    <strong className="text-[#2B2620]">{product.heelHeight}</strong>
                  </div>
                  <div className="bg-[#F3F3F3] p-3 border border-[#E2E2E2]">
                    <span className="text-[#888888] block text-[10px] uppercase">Сезон</span>
                    <strong className="text-[#2B2620]">{product.season}</strong>
                  </div>
                  <div className="bg-[#F3F3F3] p-3 border border-[#E2E2E2]">
                    <span className="text-[#888888] block text-[10px] uppercase">Подошва</span>
                    <strong className="text-[#2B2620]">{product.sole}</strong>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "details" && (
              <ul className="space-y-2.5 max-w-2xl text-xs sm:text-sm">
                {product.details.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <Check size={15} className="text-[#8F6D2F] shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}

            {activeTab === "care" && (
              <div className="max-w-2xl text-xs sm:text-sm space-y-2">
                <p>{product.care}</p>
                <p className="text-[#888888] text-xs">
                  В комплекте с каждой парой идёт хлопковый пыльник и комплект запасных набоек.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* НОСЯТ С ЭТИМ */}
        <section className="mt-20">
          <div className="flex justify-between items-end mb-8">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-[#8F6D2F] font-semibold block mb-1">
                Гардеробная капсула
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl text-[#2B2620]">
                Носят с этим
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
              <span className="text-xs uppercase tracking-[0.25em] text-[#8F6D2F] font-semibold block mb-1">
                Вам может понравиться
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl text-[#2B2620]">
                Похожие модели
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>

        {/* ОТЗЫВЫ ПО ЭТОЙ МОДЕЛИ */}
        <section className="mt-20 bg-[#EAEAEA]/50 p-6 sm:p-10 border border-[#E2E2E2]">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-[#8F6D2F] font-semibold block mb-1">
                Опыт покупательниц
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#2B2620]">
                Отзывы по модели ({product.reviewsCount})
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-serif text-2xl font-bold text-[#2B2620]">
                {product.rating}
              </span>
              <div className="flex text-amber-500">★★★★★</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {REVIEWS.slice(0, 2).map((rev) => (
              <div key={rev.id} className="bg-white p-5 border border-[#E2E2E2] space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <div>
                    <strong className="text-[#2B2620]">{rev.author}</strong>
                    <span className="text-[#8F6D2F] ml-2 font-medium">
                      (рост {rev.height} см, р. {rev.shoeSize})
                    </span>
                  </div>
                  <span className="text-[#888888]">{rev.date}</span>
                </div>
                <p className="text-xs text-[#2B2620]/80 leading-relaxed italic">
                  «{rev.text}»
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* NOTIFY ABOUT SIZE MODAL */}
      {notifyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2B2620]/45 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-md bg-[#FFFFFF] border border-[#E2E2E2] shadow-2xl p-6 sm:p-8">
            <button
              onClick={() => setNotifyModalOpen(false)}
              className="absolute top-4 right-4 text-[#2B2620]/60 hover:text-[#8F6D2F]"
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
                  className="w-full p-3 bg-white border border-[#E2E2E2] text-xs focus:outline-none focus:border-[#DAB16B]"
                />
                <button
                  type="submit"
                  className="w-full bg-[#DAB16B] text-[#2B2620] py-3 text-xs uppercase tracking-wider font-medium"
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
