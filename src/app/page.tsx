"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Ruler, Sparkles, ChevronRight, ChevronLeft, ShieldCheck, Heart, Award, Check } from "lucide-react";
import { PRODUCTS, CATEGORIES, LOOKBOOK_ITEMS, REVIEWS, FAQ_LIST } from "@/data/mockData";
import ProductCard from "@/components/ProductCard";
import HomeSizeCalculator from "@/components/HomeSizeCalculator";
import { useShop } from "@/context/ShopContext";

export default function HomePage() {
  const { setIsSizeModalOpen, setIsVeraOpen } = useShop();
  const [sliderIndex, setSliderIndex] = useState(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const nextSlide = () => {
    setSliderIndex((prev) => (prev + 1) % (PRODUCTS.length - 2));
  };
  const prevSlide = () => {
    setSliderIndex((prev) => (prev - 1 + (PRODUCTS.length - 2)) % (PRODUCTS.length - 2));
  };

  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* 1. ПЕРВЫЙ ЭКРАН (HERO) */}
      <section className="relative min-h-[92vh] flex items-center justify-center bg-[#0E0E0E] text-[#F4EFE8] overflow-hidden">
        {/* Background Fashion Visual with high editorial aspect */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2000&auto=format&fit=crop"
            alt="TALLORA Fashion Editorial"
            fill
            priority
            className="object-cover object-top opacity-55 scale-105 transition-transform duration-1000"
          />
          {/* Gradients to blend */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E0E] via-transparent to-[#0E0E0E]/60" />
          <div className="absolute inset-0 bg-[#0E0E0E]/25" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center py-24 sm:py-32 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-[#C9B8A3]/40 bg-[#0E0E0E]/60 backdrop-blur-md rounded-full text-[11px] uppercase tracking-[0.25em] text-[#C9B8A3] mb-6">
            <Sparkles size={12} className="text-[#C9B8A3]" />
            <span>Коллекция обуви для высоких девушек · 39–44</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-7xl lg:text-8xl font-light tracking-tight text-[#F4EFE8] leading-[1.08] mb-6 max-w-4xl">
            Ты выше. <br />
            <span className="italic font-normal text-[#C9B8A3]">Твоя обувь тоже.</span>
          </h1>

          <p className="text-sm sm:text-base text-[#F4EFE8]/80 max-w-xl mx-auto leading-relaxed mb-10 font-light">
            Забудьте о компромиссах мужских полок и бесформенной обуви. Сексуальные силуэты,
            итальянская кожа и анатомическая колодка под стопу от 25 до 29 см.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Link
              href="/catalog"
              className="w-full sm:w-auto bg-[#6B0F1A] hover:bg-[#8E1624] text-[#F4EFE8] px-9 py-4 text-xs uppercase tracking-[0.22em] font-medium transition-all shadow-xl flex items-center justify-center gap-2.5 cursor-pointer group"
            >
              <span>Смотреть коллекцию</span>
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </Link>

            <button
              onClick={() => setIsSizeModalOpen(true)}
              className="w-full sm:w-auto bg-[#F4EFE8]/10 hover:bg-[#F4EFE8] text-[#F4EFE8] hover:text-[#0E0E0E] border border-[#F4EFE8]/40 hover:border-[#F4EFE8] px-8 py-4 text-xs uppercase tracking-[0.22em] font-medium transition-all backdrop-blur-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <Ruler size={15} />
              <span>Подобрать размер (см)</span>
            </button>
          </div>

          {/* Model caption tag on hero */}
          <div className="mt-14 text-[10px] uppercase tracking-[0.25em] text-[#C9B8A3]/70 font-mono">
            На фото: Полина (рост 181 см, туфли Mia, размер 43)
          </div>
        </div>
      </section>

      {/* 2. БЕГУЩАЯ СТРОКА */}
      <div className="bg-[#6B0F1A] text-[#F4EFE8] py-3 overflow-hidden border-y border-[#520B14]">
        <div className="animate-marquee whitespace-nowrap text-xs uppercase tracking-[0.25em] font-medium flex items-center gap-8">
          {[...Array(4)].map((_, i) => (
            <React.Fragment key={i}>
              <span>Размеры 39–44</span>
              <span className="opacity-40">·</span>
              <span>Без пластика и синтетики</span>
              <span className="opacity-40">·</span>
              <span>100% бесплатный обмен размера</span>
              <span className="opacity-40">·</span>
              <span>Примерка перед покупкой по РФ</span>
              <span className="opacity-40">·</span>
              <span>ИИ-стилист Вера всегда онлайн</span>
              <span className="opacity-40">·</span>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* 3. СЛАЙДЕР ХИТОВ / НОВИНОК */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#6B0F1A] font-semibold block mb-2">
              Выбор высоких девушек
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#0E0E0E]">
              Хиты и новинки коллекции
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={prevSlide}
              className="w-11 h-11 rounded-full border border-[#D4C7B5] hover:border-[#6B0F1A] hover:bg-[#6B0F1A] hover:text-[#F4EFE8] flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Назад"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextSlide}
              className="w-11 h-11 rounded-full border border-[#D4C7B5] hover:border-[#6B0F1A] hover:bg-[#6B0F1A] hover:text-[#F4EFE8] flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Вперед"
            >
              <ChevronRight size={20} />
            </button>
            <Link
              href="/catalog"
              className="ml-4 text-xs uppercase tracking-[0.2em] font-medium text-[#6B0F1A] hover:underline hidden md:inline-block"
            >
              Весь каталог ({PRODUCTS.length}) →
            </Link>
          </div>
        </div>

        {/* Responsive Grid Slider */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRODUCTS.slice(sliderIndex, sliderIndex + 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 4. ВЕРТИКАЛЬНЫЕ ПЛИТКИ КАТЕГОРИЙ */}
      <section className="py-20 bg-[#ECE4D8]/60 border-y border-[#E2D9CC] px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-[0.25em] text-[#6B0F1A] font-semibold block mb-2">
              Капсулы под любой повод
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#0E0E0E]">
              Категории обуви
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {CATEGORIES.filter((c) => c.slug !== "all").map((cat) => (
              <Link
                key={cat.slug}
                href={`/catalog?category=${cat.slug}`}
                className="group relative aspect-[3/4] overflow-hidden bg-[#0E0E0E] block border border-[#D4C7B5]"
              >
                {cat.image && (
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    sizes="(max-width: 640px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110 opacity-80 group-hover:opacity-90"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E0E] via-transparent to-transparent opacity-85" />
                <div className="absolute bottom-4 left-4 right-4 text-left">
                  <span className="text-[10px] tracking-widest uppercase text-[#C9B8A3] block mb-0.5">
                    Размеры 39–44
                  </span>
                  <h3 className="font-serif text-lg sm:text-2xl text-[#F4EFE8] group-hover:text-[#C9B8A3] transition-colors">
                    {cat.name}
                  </h3>
                  <span className="text-[11px] text-[#F4EFE8]/70 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform mt-1">
                    Смотреть пары <ArrowRight size={12} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. «СДЕЛАНО ДЛЯ ТЕБЯ» — 3 ФАКТА */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-[#6B0F1A] font-semibold block mb-2">
            Анатомия TALLORA
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#0E0E0E]">
            Сделано для тебя. Без компромиссов.
          </h2>
          <p className="text-sm text-[#0E0E0E]/70 mt-3">
            Мы не просто увеличиваем стандартную 37 колодку в фотошопе. Мы пересобрали обувь с нуля.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#F9F6F0] p-8 border border-[#E2D9CC] flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 bg-[#6B0F1A] text-[#F4EFE8] font-serif text-xl flex items-center justify-center font-bold mb-6">
                01
              </div>
              <h3 className="font-serif text-xl text-[#0E0E0E] mb-3">
                Колодка под длинную стопу
              </h3>
              <p className="text-xs text-[#0E0E0E]/70 leading-relaxed">
                Специальный угол наклона и выверенная ширина пучковой части. Пальцы не сжимаются в
                гармошку, а визуально нога выглядит на 1–2 размера компактнее за счет архитектуры мыса.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-[#E2D9CC] text-[11px] font-mono text-[#6B0F1A]">
              Ширина пучков: 94–108 мм
            </div>
          </div>

          <div className="bg-[#F9F6F0] p-8 border border-[#E2D9CC] flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 bg-[#0E0E0E] text-[#F4EFE8] font-serif text-xl flex items-center justify-center font-bold mb-6">
                02
              </div>
              <h3 className="font-serif text-xl text-[#0E0E0E] mb-3">
                100% итальянская кожа
              </h3>
              <p className="text-xs text-[#0E0E0E]/70 leading-relaxed">
                Никакого жесткого кожзама и дубового пластика. Только пластичная телячья кожа наппа,
                шелковистая замша и дышащая подкладка, которая подстраивается под тепло вашей стопы.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-[#E2D9CC] text-[11px] font-mono text-[#0E0E0E]/70">
              Выделка Nappa & Шевро
            </div>
          </div>

          <div className="bg-[#F9F6F0] p-8 border border-[#E2D9CC] flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 bg-[#C9B8A3] text-[#0E0E0E] font-serif text-xl flex items-center justify-center font-bold mb-6">
                03
              </div>
              <h3 className="font-serif text-xl text-[#0E0E0E] mb-3">
                Пропорции каблука под высокий рост
              </h3>
              <p className="text-xs text-[#0E0E0E]/70 leading-relaxed">
                Ось каблука смещена строго под физиологический центр пятки. Вы держите осанку легко,
                без усталости в пояснице и без страха казаться «слишком высокой».
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-[#E2D9CC] text-[11px] font-mono text-[#6B0F1A]">
              Смещение оси тяжести на 4 мм
            </div>
          </div>
        </div>
      </section>

      {/* 6. МИНИ-КАЛЬКУЛЯТОР РАЗМЕРА НА ГЛАВНОЙ */}
      <HomeSizeCalculator />

      {/* 7. LOOKBOOK */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-14 gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#6B0F1A] font-semibold block mb-2">
              Fashion Editorial
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#0E0E0E]">
              Lookbook: Власть вертикали
            </h2>
          </div>
          <Link
            href="/lookbook"
            className="text-xs uppercase tracking-[0.2em] font-medium text-[#6B0F1A] hover:underline"
          >
            Смотреть все образы →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {LOOKBOOK_ITEMS.map((item) => (
            <div key={item.id} className="group relative flex flex-col">
              <div className="relative aspect-[9/16] overflow-hidden bg-[#0E0E0E] border border-[#E2D9CC]">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E0E]/90 via-transparent to-transparent" />

                <div className="absolute bottom-4 left-4 right-4 text-[#F4EFE8]">
                  <span className="bg-[#6B0F1A] text-[9px] uppercase tracking-wider px-2 py-0.5 font-mono mb-2 inline-block">
                    рост {item.modelHeight} см · размер {item.modelShoeSize}
                  </span>
                  <h4 className="font-serif text-lg leading-snug mb-1">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-[#C9B8A3] italic line-clamp-2">
                    «{item.quote}»
                  </p>
                  <Link
                    href="/catalog"
                    className="mt-3 text-[10px] uppercase tracking-widest text-[#F4EFE8] underline inline-block"
                  >
                    Купить образ →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. ОТЗЫВЫ С ФОТО, РОСТОМ И РАЗМЕРОМ */}
      <section className="py-20 bg-[#ECE4D8]/50 border-y border-[#E2D9CC] px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-[0.25em] text-[#6B0F1A] font-semibold block mb-2">
              Честные истории
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#0E0E0E]">
              Отзывы высоких девушек
            </h2>
            <p className="text-xs text-[#0E0E0E]/70 mt-2">
              Каждый отзыв — с указанием реального роста и размера стопы.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {REVIEWS.map((rev) => (
              <div
                key={rev.id}
                className="bg-[#F9F6F0] p-6 sm:p-8 border border-[#E2D9CC] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex text-amber-500">
                      {[...Array(rev.rating)].map((_, i) => (
                        <span key={i}>★</span>
                      ))}
                    </div>
                    <span className="text-[10px] text-[#888888]">{rev.date}</span>
                  </div>

                  <p className="text-xs text-[#0E0E0E]/80 leading-relaxed italic mb-6">
                    «{rev.text}»
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-[#E2D9CC]">
                  <div className="relative w-12 h-14 bg-[#0E0E0E] shrink-0 border border-[#E2D9CC] overflow-hidden">
                    <Image src={rev.photoUrl} alt={rev.author} fill className="object-cover" />
                  </div>
                  <div>
                    <h4 className="font-serif text-sm font-semibold text-[#0E0E0E]">
                      {rev.author}
                    </h4>
                    <span className="text-[11px] text-[#6B0F1A] font-medium block">
                      Рост {rev.height} см · Размер {rev.shoeSize}
                    </span>
                    <span className="text-[10px] text-[#888888]">{rev.modelBought}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. ЦИТАТА ОСНОВАТЕЛЬНИЦЫ */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 relative aspect-[3/4] border border-[#E2D9CC] bg-[#0E0E0E]">
            <Image
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop"
              alt="Основательница TALLORA"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
            <div className="absolute bottom-3 left-3 bg-[#0E0E0E]/85 text-[#F4EFE8] text-[10px] uppercase tracking-wider px-3 py-1">
              Основательница TALLORA · рост 182 см, р. 43
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] text-[#6B0F1A] font-semibold block">
              Слово основательницы
            </span>
            <blockquote className="font-serif text-2xl sm:text-4xl text-[#0E0E0E] leading-snug font-light">
              «Я устала заходить в бутики и слышать дежурное: <em>«Женского 43 у нас нет, посмотрите в мужском отделе»</em>.
            </blockquote>
            <p className="text-sm text-[#0E0E0E]/80 leading-relaxed">
              Мужская обувь не предназначена для женской стопы. Она широкая в пятке, грубая в отделке
              и лишена сексуальности. TALLORA родилась из бунта против компромиссов. Высокая женщина —
              это символ мощи, подиумной красоты и грации. Мы заслуживаем носить туфли мечты.
            </p>
            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium text-[#6B0F1A] hover:underline"
              >
                <span>Читать историю бренда полностью</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 10. БЛОК КЛУБА TALLORA PRIVÉ */}
      <section className="bg-[#6B0F1A] text-[#F4EFE8] py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-black/20 rounded-full text-[11px] uppercase tracking-[0.25em] text-[#C9B8A3]">
            <Award size={13} />
            Закрытое сообщество
          </div>

          <h2 className="font-serif text-3xl sm:text-6xl font-light text-[#F4EFE8]">
            Клуб TALLORA PRIVÉ
          </h2>

          <p className="text-sm sm:text-base text-[#F4EFE8]/80 max-w-2xl mx-auto leading-relaxed font-light">
            Присоединяйтесь к сообществу высоких женщин. Получите <strong className="text-white font-semibold">5% скидку на первый заказ</strong>,
            до 10% бонусами с каждой пары и закрытый ранний доступ к новым дропам до официального релиза.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/prive"
              className="bg-[#0E0E0E] hover:bg-[#1A1A1A] text-[#F4EFE8] px-8 py-4 text-xs uppercase tracking-[0.2em] font-medium transition-colors shadow-xl"
            >
              Вступить в клуб и получить 5%
            </Link>
          </div>
        </div>
      </section>

      {/* 11. FAQ */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-[#6B0F1A] font-semibold block mb-2">
            Ответы на вопросы
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#0E0E0E]">
            Часто задаваемые вопросы
          </h2>
        </div>

        <div className="space-y-4">
          {FAQ_LIST.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div
                key={idx}
                className="border border-[#E2D9CC] bg-[#F9F6F0] transition-colors"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="font-serif text-base sm:text-lg text-[#0E0E0E]">
                    {faq.question}
                  </span>
                  <span className="text-[#6B0F1A] font-mono text-xl shrink-0">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
                {isOpen && (
                  <div className="px-5 pb-6 text-xs sm:text-sm text-[#0E0E0E]/75 leading-relaxed border-t border-[#E2D9CC]/50 pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
