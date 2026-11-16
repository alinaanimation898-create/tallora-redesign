"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Ruler, ChevronRight, ChevronLeft, Sparkles } from "lucide-react";
import { PRODUCTS, CATEGORIES, LOOKBOOK_ITEMS, SITE_PHOTOS, sitePhoto, CONTACTS } from "@/data/mockData";
import ProductCard from "@/components/ProductCard";
import HomeSizeCalculator from "@/components/HomeSizeCalculator";
import Reveal from "@/components/Reveal";
import { useShop } from "@/context/ShopContext";

const HERO_IMG = SITE_PHOTOS.hero;
const ANATOMY_IMG = SITE_PHOTOS.anatomy;
const FOUNDER_IMG = SITE_PHOTOS.founder;
const PRIVE_IMG = SITE_PHOTOS.prive;

const byId = (id: string) => PRODUCTS.find((p) => p.id === id);

/** SSENSE-style spotlight: real packshots on light backgrounds blend into the page. */
const SPOTLIGHT_DEF = [
  { word: "Туфли", id: "p-671428309603" },
  { word: "Босоножки", id: "p-768470466472" },
  { word: "Лоферы", id: "p-737994879652" },
  { word: "Ботильоны", id: "p-470361396772" },
  { word: "Сапоги", id: "p-599342227272" },
];
const SPOTLIGHT = SPOTLIGHT_DEF.flatMap((d) => {
  const p = byId(d.id);
  if (!p) return [];
  return [{
    word: d.word,
    slug: p.slug,
    model: p.model || p.typeLabel,
    price: p.price,
    heel: p.heelHeight,
    sizes: p.sizes,
    image: p.images[0],
    href: `/catalog/${p.slug}`,
  }];
});

/** Lifestyle photos from tallora.ru for the category panels. */
const CATEGORY_PHOTOS: Record<string, string> = {
  tufli: sitePhoto("tild6634-3062-4132-b736-386465323239"),
  bosonozhki: sitePhoto("tild3433-6461-4166-b136-393765613461"),
  sandali: sitePhoto("tild6638-3263-4430-b561-326366643963"),
  shlepki: sitePhoto("tild3864-3662-4531-b934-363839353366"),
  baletki: sitePhoto("tild3065-6363-4639-a464-373261306363"),
  myuli: sitePhoto("tild3038-3731-4730-b034-376532626334"),
  lofery: sitePhoto("tild3631-3263-4564-b663-356163313664"),
  botilony: sitePhoto("tild3734-6334-4563-a262-333332386333"),
  sapogi: sitePhoto("tild6137-3561-4363-a230-666232616634"),
};

/** Colour-block panels for categories. */
const PANEL_COLORS: Record<string, string> = {
  tufli: "#E8D3A8",
  bosonozhki: "#F1EADF",
  sandali: "#EADBC4",
  shlepki: "#F4ECE0",
  baletki: "#F6F1EA",
  myuli: "#D9C7AE",
  lofery: "#DAB16B",
  botilony: "#C9CFC0",
  sapogi: "#E2D6C6",
  botinki: "#D6CBBB",
  krossovki: "#ECE6DC",
};
const LIGHT_PANELS = new Set(Object.keys(PANEL_COLORS));

export default function HomePage() {
  const { setIsSizeModalOpen } = useShop();
  const [sliderIndex, setSliderIndex] = useState(0);
  const [spot, setSpot] = useState(0);
  const [spotPaused, setSpotPaused] = useState(false);
  const [openPanel, setOpenPanel] = useState("tufli");

  useEffect(() => {
    if (spotPaused) return;
    const t = setInterval(() => setSpot((s) => (s + 1) % SPOTLIGHT.length), 4200);
    return () => clearInterval(t);
  }, [spotPaused]);

  const maxSlide = Math.max(1, PRODUCTS.filter((p) => p.isNew).length - 3);
  const nextSlide = () => setSliderIndex((p) => (p + 1) % maxSlide);
  const prevSlide = () => setSliderIndex((p) => (p - 1 + maxSlide) % maxSlide);

  const heroProducts = ["p-671428309603", "p-351869054452", "p-850261346142"].map(byId).filter((p) => p !== undefined);
  const newArrivals = PRODUCTS.filter((p) => p.isNew);
  const current = SPOTLIGHT[spot];
  const panels = CATEGORIES.filter((c) => c.slug !== "all").map((c) => ({
    ...c,
    image: CATEGORY_PHOTOS[c.slug] ?? ("image" in c ? c.image : undefined),
  }));

  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* ───────────── 1. HERO ───────────── */}
      <section className="relative min-h-[100svh] bg-[#F5F0E8] text-[#2B2620] overflow-hidden">
        {/* Photo */}
        <div className="absolute inset-0 lg:left-[36%] lg:right-[15%] z-0 overflow-hidden">
          <Image
            src={HERO_IMG}
            alt="Модель в красных слингбэках Tallora с пакетом бренда"
            fill
            preload
            sizes="(max-width: 1024px) 100vw, 56vw"
            className="object-cover object-[50%_60%] slow-zoom"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#F5F0E8] via-[#F5F0E8]/30 to-transparent lg:via-transparent" />
          <div className="hidden lg:block absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-[#F5F0E8] to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#F5F0E8] via-transparent to-[#F5F0E8]/50" />
          <div className="absolute inset-0 bg-[#F5F0E8]/55 lg:bg-transparent" />
        </div>

        {/* Giant outlined size */}
        <div
          aria-hidden
          className="absolute -left-[3vw] top-[14vh] z-0 font-display font-medium leading-[0.8] text-outline-noir select-none pointer-events-none text-[52vw] lg:text-[34vw] tracking-[-0.04em] opacity-[0.12]"
        >
          43
        </div>

        {/* Vertical caption */}
        <div className="hidden lg:flex absolute left-[60%] top-[30%] z-10 items-center gap-2 glass-light rounded-full pl-1.5 pr-4 py-1.5 text-[10px] tracking-[0.2em] uppercase text-[#2B2620]">
          <span className="w-6 h-6 rounded-full bg-[#C99B4F] flex items-center justify-center font-display text-[10px] tracking-normal">44</span>
          Размеры 37 — 44
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 min-h-[100svh] flex flex-col justify-end pt-40 pb-10 lg:pb-14">
          <div className="max-w-3xl">
            <div className="hero-in inline-flex items-center gap-3 mb-7" style={{ animationDelay: "100ms" }}>
              <span className="w-10 h-px bg-[#C99B4F]" />
              <span className="text-[11px] uppercase tracking-[0.35em] text-[#8F6D2F]">
                Обувь для высоких девушек
              </span>
            </div>

            <h1 className="font-serif font-light leading-[0.86] tracking-[-0.02em] text-[clamp(64px,11vw,176px)]">
              <span className="hero-in block" style={{ animationDelay: "200ms" }}>Ты выше.</span>
              <span className="hero-in block italic" style={{ animationDelay: "350ms" }}>
                Твоя обувь
              </span>
              <span className="hero-in block italic text-[#B8914A]" style={{ animationDelay: "500ms" }}>
                тоже.
              </span>
            </h1>

            <p
              className="hero-in mt-8 max-w-md text-[15px] leading-relaxed text-[#2B2620]/70"
              style={{ animationDelay: "650ms" }}
            >
              Когда обувь подчёркивает рост, а не сковывает его. Туфли, лоферы, босоножки и сапоги
              37–44 размера из натуральной кожи и замши. Без пластика. Без боли. Без компромиссов.
            </p>

            <div className="hero-in mt-9 flex flex-col sm:flex-row gap-3" style={{ animationDelay: "800ms" }}>
              <Link
                href="/catalog"
                className="group h-14 pl-7 pr-2 rounded-full bg-[#DAB16B] hover:bg-[#C99B4F] text-[#2B2620] flex items-center justify-between gap-6 text-[12px] uppercase tracking-[0.22em] font-semibold transition-colors"
              >
                Смотреть коллекцию
                <span className="w-10 h-10 rounded-full bg-white text-[#2B2620] flex items-center justify-center group-hover:rotate-[-45deg] transition-transform duration-500">
                  <ArrowRight size={16} />
                </span>
              </Link>
              <button
                onClick={() => setIsSizeModalOpen(true)}
                className="h-14 px-7 rounded-full glass-light hover:bg-white text-[12px] uppercase tracking-[0.22em] font-semibold flex items-center justify-center gap-2.5 transition-colors cursor-pointer"
              >
                <Ruler size={15} />
                Мой размер в см
              </button>
            </div>
          </div>

          {/* Floating glass-light product cards */}
          <div className="mt-12 lg:mt-0 lg:absolute lg:right-8 lg:bottom-14 flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible no-scrollbar -mx-5 px-5 lg:mx-0 lg:px-0">
            {heroProducts.map((p, i) => (
              <Link
                key={p.id}
                href={`/catalog/${p.slug}`}
                className={`hero-in group glass-light rounded-[22px] p-2 w-[168px] lg:w-[178px] shrink-0 hover:bg-white transition-colors ${
                  i === 2 ? "lg:hidden" : ""
                } ${i === 0 ? "lg:-translate-x-10" : ""}`}
                style={{ animationDelay: `${950 + i * 120}ms` }}
              >
                <div className="relative aspect-[4/5] rounded-[16px] overflow-hidden">
                  <Image src={p.images[0]} alt={p.name} fill sizes="170px" className="object-cover group-hover:scale-110 transition-transform duration-700" />
                  <span className="absolute top-2 left-2 text-[9px] uppercase tracking-[0.2em] bg-white/80 backdrop-blur px-2 py-1 rounded-full">
                    {p.heelHeight}
                  </span>
                </div>
                <div className="flex items-end justify-between px-1.5 pt-2.5 pb-1">
                  <div>
                    <span className="block font-serif italic text-xl leading-none">{p.model}</span>
                    <span className="text-[10px] uppercase tracking-[0.18em] text-[#2B2620]/60">{p.typeLabel}</span>
                  </div>
                  <span className="font-display text-sm">{(p.price / 1000).toFixed(1)}k ₽</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── 2. RED MARQUEE ───────────── */}
      <div className="bg-[#DAB16B] text-[#2B2620] py-5 sm:py-7 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-10 font-serif italic text-4xl sm:text-6xl font-light">
          {[...Array(4)].map((_, i) => (
            <React.Fragment key={i}>
              <span>Без пластика. Без боли.</span>
              <span className="font-display not-italic text-2xl sm:text-3xl">✦</span>
              <span>Без компромиссов.</span>
              <span className="font-display not-italic text-2xl sm:text-3xl">✦</span>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* ───────────── 3. SPOTLIGHT (stacked type) ───────────── */}
      <section
        className="relative bg-[#F3F3F3] overflow-hidden"
        onMouseEnter={() => setSpotPaused(true)}
        onMouseLeave={() => setSpotPaused(false)}
      >
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 py-20 lg:py-28 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center min-h-[86vh]">
          {/* Stacked category words */}
          <div className="lg:col-span-4 relative z-10 order-2 lg:order-1">
            <span className="text-[11px] uppercase tracking-[0.35em] text-[#8F6D2F] block mb-6">
              Выбери силуэт
            </span>
            <ul className="flex lg:flex-col gap-x-5 gap-y-0 overflow-x-auto no-scrollbar">
              {SPOTLIGHT.map((s, i) => (
                <li key={s.slug} className="shrink-0">
                  <button
                    onClick={() => setSpot(i)}
                    onMouseEnter={() => setSpot(i)}
                    className={`group flex items-start gap-3 font-display uppercase leading-[0.95] tracking-[-0.01em] text-[44px] sm:text-[64px] lg:text-[clamp(52px,5.4vw,84px)] transition-all duration-500 cursor-pointer ${
                      spot === i ? "text-[#2B2620]" : "text-outline-noir opacity-50 hover:opacity-100"
                    }`}
                  >
                    {s.word}
                    <sup className={`font-sans text-[11px] tracking-normal mt-3 transition-colors ${spot === i ? "text-[#8F6D2F]" : "text-[#2B2620]/40"}`}>
                      0{i + 1}
                    </sup>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Shoe */}
          <div className="lg:col-span-5 relative order-1 lg:order-2 aspect-square lg:aspect-[4/5]">
            <div
              aria-hidden
              className="absolute inset-0 flex items-center justify-center font-serif italic text-[#8F6D2F]/10 text-[42vw] lg:text-[20vw] leading-none select-none pointer-events-none"
            >
              {current.model.charAt(0)}
            </div>
            <div key={current.slug} className="absolute inset-0 fade-swap">
              <Image
                src={current.image}
                alt={`${current.word} ${current.model}`}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-contain mix-blend-multiply [mask-image:radial-gradient(ellipse_at_center,black_58%,transparent_78%)]"
              />
            </div>
            {/* Progress */}
            <div className="absolute -bottom-4 left-0 right-0 flex gap-1.5">
              {SPOTLIGHT.map((s, i) => (
                <span key={s.slug} className="h-[2px] flex-1 bg-[#2B2620]/10 overflow-hidden rounded">
                  <span
                    className={`block h-full bg-[#DAB16B] transition-all ${spot === i ? "w-full duration-[4200ms] ease-linear" : spot > i ? "w-full duration-0" : "w-0 duration-0"}`}
                  />
                </span>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="lg:col-span-3 order-3 relative z-10">
            <div key={current.slug} className="fade-swap">
              <span className="text-[11px] uppercase tracking-[0.3em] text-[#2B2620]/45">Модель</span>
              <h3 className="font-serif italic text-6xl lg:text-7xl leading-none mt-2">{current.model}</h3>
              <div className="mt-6 grid grid-cols-2 border-y border-[#2B2620]/12">
                <div className="py-4 pr-4 border-r border-[#2B2620]/12">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#2B2620]/45 block">Цена</span>
                  <span className="font-display text-2xl">{current.price.toLocaleString("ru-RU")} ₽</span>
                </div>
                <div className="py-4 pl-4">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#2B2620]/45 block">Каблук</span>
                  <span className="font-display text-2xl">{current.heel}</span>
                </div>
              </div>
              <div className="flex gap-1.5 mt-5">
                {current.sizes.map((s) => (
                  <span
                    key={s.size}
                    className={`flex-1 h-9 rounded-full border border-[#2B2620]/15 flex items-center justify-center font-display text-sm ${s.inStock ? "" : "opacity-30 line-through"}`}
                  >
                    {s.size}
                  </span>
                ))}
              </div>
              <Link
                href={current.href}
                className="group mt-6 h-14 pl-7 pr-2 rounded-full bg-[#DAB16B] hover:bg-[#C99B4F] text-[#2B2620] flex items-center justify-between text-[12px] uppercase tracking-[0.22em] font-semibold transition-colors"
              >
                Примерить
                <span className="w-10 h-10 rounded-full bg-white text-[#2B2620] flex items-center justify-center group-hover:rotate-[-45deg] transition-transform duration-500">
                  <ArrowRight size={16} />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── 4. COLOUR-BLOCK CATEGORIES ───────────── */}
      <section className="bg-white text-[#2B2620] py-20 lg:py-28">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
          <Reveal className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <h2 className="font-display uppercase text-[clamp(48px,8vw,128px)] leading-[0.85] tracking-[-0.02em]">
              Капсулы
              <span className="block font-serif normal-case italic font-light text-[#8F6D2F] tracking-normal">
                на каждый выход
              </span>
            </h2>
            <p className="max-w-xs text-sm text-[#2B2620]/60 leading-relaxed">
              От шлепок и балеток до ботильонов и сапог — для повседневной жизни и особых случаев. Размеры 37–44.
            </p>
          </Reveal>

          {/* Desktop accordion */}
          <div className="hidden md:flex h-[72vh] min-h-[520px] gap-2">
            {panels.map((cat, i) => {
              const open = openPanel === cat.slug;
              const color = PANEL_COLORS[cat.slug] ?? "#2A2A2E";
              const light = LIGHT_PANELS.has(cat.slug);
              return (
                <Link
                  key={cat.slug}
                  href={`/catalog?category=${cat.slug}`}
                  onMouseEnter={() => setOpenPanel(cat.slug)}
                  onFocus={() => setOpenPanel(cat.slug)}
                  className="relative overflow-hidden rounded-[22px] transition-[flex-grow] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{ flexGrow: open ? 5 : 1, flexBasis: 0, backgroundColor: color }}
                >
                  {cat.image && (
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      sizes="50vw"
                      className={`object-cover transition-all duration-700 ${open ? "opacity-100 scale-100" : "opacity-35 grayscale scale-110 mix-blend-multiply"}`}
                    />
                  )}
                  <div
                    className="absolute inset-0 transition-opacity duration-700"
                    style={{ backgroundColor: color, opacity: open ? 0 : 0.35 }}
                  />
                  <div
                    className="absolute inset-0 transition-opacity duration-700"
                    style={{ background: `linear-gradient(to top, ${color} 0%, transparent 55%)`, opacity: open ? 0.9 : 0 }}
                  />
                  {/* Vertical label when closed */}
                  <div
                    className={`absolute inset-x-0 bottom-6 flex flex-col items-center gap-4 transition-opacity duration-500 ${open ? "opacity-0" : "opacity-100"} ${light ? "text-[#2B2620]" : "text-[#2B2620]"}`}
                  >
                    <span className="font-display uppercase text-2xl tracking-[0.08em] [writing-mode:vertical-rl] rotate-180">
                      {cat.name}
                    </span>
                    <span className="text-[10px] font-semibold">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  {/* Open content */}
                  <div
                    className={`absolute inset-x-0 bottom-0 p-7 flex items-end justify-between gap-4 transition-all duration-700 ${open ? "opacity-100 translate-y-0 delay-200" : "opacity-0 translate-y-6"} ${light ? "text-[#2B2620]" : "text-[#2B2620]"}`}
                  >
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.3em] opacity-70">{String(i + 1).padStart(2, "0")} · {PRODUCTS.filter((p) => p.categorySlug === cat.slug).length} моделей</span>
                      <h3 className="font-display uppercase text-6xl xl:text-7xl leading-none mt-2 whitespace-nowrap">{cat.name}</h3>
                    </div>
                    <span className={`w-14 h-14 shrink-0 rounded-full flex items-center justify-center bg-white text-[#2B2620]`}>
                      <ArrowUpRight size={20} />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Mobile snap cards */}
          <div className="md:hidden flex gap-3 overflow-x-auto snap-x snap-mandatory scroll-px-5 no-scrollbar -mx-5 px-5">
            {panels.map((cat) => {
              const color = PANEL_COLORS[cat.slug] ?? "#2A2A2E";
              const light = LIGHT_PANELS.has(cat.slug);
              return (
                <Link
                  key={cat.slug}
                  href={`/catalog?category=${cat.slug}`}
                  className="relative snap-start shrink-0 w-[72vw] aspect-[3/4] rounded-[22px] overflow-hidden"
                  style={{ backgroundColor: color }}
                >
                  {cat.image && <Image src={cat.image} alt={cat.name} fill sizes="72vw" className="object-cover" />}
                  <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${color} 5%, transparent 60%)` }} />
                  <div className={`absolute bottom-5 left-5 right-5 flex items-end justify-between ${light ? "text-[#2B2620]" : "text-[#2B2620]"}`}>
                    <h3 className="font-display uppercase text-4xl leading-none">{cat.name}</h3>
                    <ArrowUpRight size={22} />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ───────────── 5. BESTSELLERS ───────────── */}
      <section className="py-20 lg:py-28 px-5 sm:px-8 max-w-[1400px] mx-auto w-full">
        <Reveal className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-[11px] uppercase tracking-[0.35em] text-[#8F6D2F] block mb-4">
              Только что в каталоге
            </span>
            <h2 className="font-serif font-light text-[clamp(48px,7vw,104px)] leading-[0.9] tracking-[-0.02em]">
              Новинки <span className="italic">сезона</span>
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/catalog"
              className="mr-3 text-[11px] uppercase tracking-[0.22em] font-semibold border-b border-[#2B2620] pb-1 hover:text-[#8F6D2F] hover:border-[#DAB16B] transition-colors"
            >
              Весь каталог · {PRODUCTS.length}
            </Link>
            <button
              onClick={prevSlide}
              className="w-12 h-12 rounded-full border border-[#2B2620]/15 hover:bg-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Назад"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={nextSlide}
              className="w-12 h-12 rounded-full bg-[#DAB16B] text-[#2B2620] hover:bg-[#C99B4F] flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Вперед"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-12">
          {newArrivals.slice(sliderIndex, sliderIndex + 4).map((product, i) => (
            <Reveal key={product.id} delay={i * 90}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ───────────── 6. MANIFESTO / ANATOMY ───────────── */}
      <section className="bg-[#EAEAEA] py-20 lg:py-28">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <Reveal>
                <span className="text-[11px] uppercase tracking-[0.35em] text-[#8F6D2F] block mb-5">Анатомия Tallora</span>
                <h2 className="font-serif font-light text-[clamp(44px,5.5vw,84px)] leading-[0.92] tracking-[-0.02em]">
                  Сделано <span className="italic">для тебя.</span>
                  <br />
                  Без компромиссов.
                </h2>
              </Reveal>
              <Reveal delay={150} className="relative mt-10 aspect-[4/5] rounded-[28px] overflow-hidden">
                <Image src={ANATOMY_IMG} alt="Бежевые туфли Tallora Leila крупным планом" fill sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover" />
                <div className="absolute bottom-4 left-4 right-4 glass-light rounded-2xl px-4 py-3 flex items-center justify-between">
                  <span className="text-[11px] uppercase tracking-[0.2em]">Натуральная кожа</span>
                  <span className="font-display text-sm text-[#8F6D2F]">Размеры 37–44</span>
                </div>
              </Reveal>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col">
            {[
              {
                n: "01",
                title: "Посадка, которая продумана",
                text: "Мы тестируем каждую пару: смотрим, где натирает и как нога чувствует себя к вечеру. В ней можно не просто стоять — а жить: ходить, бежать, танцевать.",
                spec: "Тест каждой пары",
              },
              {
                n: "02",
                title: "Натуральная кожа и замша",
                text: "Натуральные материалы, трендовые и универсальные формы. Обувь должна радовать не только глаз, но и тело — и служить дольше одного сезона.",
                spec: "Кожа · замша · мех",
              },
              {
                n: "03",
                title: "Больше никаких «у нас только до 40»",
                text: "Каждая пара создаётся от 37 до 44 размера, а в карточке указана длина стельки для каждого размера — без гаданий.",
                spec: "Стелька 23–29.5 см",
              },
            ].map((f, i) => (
              <Reveal key={f.n} delay={i * 100} className="group border-t border-[#2B2620]/15 py-10 lg:py-14 grid grid-cols-12 gap-4">
                <div className="col-span-12 sm:col-span-3">
                  <span className="font-display text-[88px] lg:text-[120px] leading-[0.8] text-outline-noir group-hover:text-[#8F6D2F] transition-colors duration-500">
                    {f.n}
                  </span>
                </div>
                <div className="col-span-12 sm:col-span-9">
                  <h3 className="font-serif text-4xl lg:text-5xl leading-tight">{f.title}</h3>
                  <p className="mt-4 text-[15px] text-[#2B2620]/65 leading-relaxed max-w-lg">{f.text}</p>
                  <span className="inline-block mt-6 text-[10px] uppercase tracking-[0.25em] px-4 py-2 rounded-full border border-[#2B2620]/20">
                    {f.spec}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── 7. SIZE CALCULATOR ───────────── */}
      <HomeSizeCalculator />

      {/* ───────────── 8. LOOKBOOK ───────────── */}
      <section className="py-20 lg:py-28">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
          <Reveal className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-[11px] uppercase tracking-[0.35em] text-[#8F6D2F] block mb-4">Lookbook</span>
              <h2 className="font-display uppercase text-[clamp(52px,9vw,148px)] leading-[0.82] tracking-[-0.02em]">
                Власть
                <span className="block font-serif normal-case italic font-light tracking-normal">вертикали</span>
              </h2>
            </div>
            <Link
              href="/lookbook"
              className="self-start md:self-end text-[11px] uppercase tracking-[0.22em] font-semibold border-b border-[#2B2620] pb-1 hover:text-[#8F6D2F] hover:border-[#DAB16B]"
            >
              Все образы →
            </Link>
          </Reveal>
        </div>

        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-px-5 sm:scroll-px-8 no-scrollbar px-5 sm:px-8 lg:px-[max(2rem,calc((100vw_-_1400px)/2_+_2rem))]">
          {LOOKBOOK_ITEMS.map((item, i) => (
            <Link
              href="/lookbook"
              key={item.id}
              className={`group relative snap-start shrink-0 w-[78vw] sm:w-[44vw] lg:w-[30vw] aspect-[3/4.4] rounded-[26px] overflow-hidden bg-[#E8E8E8] ${i % 2 === 1 ? "lg:mt-16" : ""}`}
            >
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 80vw, 30vw"
                className="object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2B2620]/75 via-[#2B2620]/5 to-transparent" />
              <span className="absolute top-4 left-4 bg-white/80 backdrop-blur-md text-[#2B2620] text-[10px] uppercase tracking-[0.2em] px-3 py-1.5 rounded-full">
                {byId(item.featuredProductId)?.name ?? "Tallora"}
              </span>
              <div className="absolute bottom-0 inset-x-0 p-6 text-[#F3F3F3]">
                <span className="font-display text-xs tracking-[0.3em] text-[#E3C78F]">0{i + 1} — Tallora</span>
                <h3 className="font-serif italic text-4xl leading-none mt-2">{item.title}</h3>
                <p className="text-sm text-[#F3F3F3]/70 mt-3 line-clamp-2 max-h-0 group-hover:max-h-20 transition-all duration-700 overflow-hidden">
                  «{item.quote}»
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ───────────── 9. ONE YEAR / VALUES ───────────── */}
      <section className="bg-[#F3F3F3] text-[#2B2620] py-20 lg:py-28 px-5 sm:px-8 relative">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <Reveal className="lg:col-span-5 relative aspect-[4/5] rounded-[28px] overflow-hidden bg-[#E8E8E8]">
            <Image src={SITE_PHOTOS.friends} alt="Три девушки в обуви Tallora на прогулке" fill sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover" />
          </Reveal>
          <div className="lg:col-span-7">
            <Reveal>
              <span className="text-[11px] uppercase tracking-[0.35em] text-[#8F6D2F] block mb-5">Спасибо, что вы с нами</span>
              <h2 className="font-serif font-light text-[clamp(52px,7vw,112px)] leading-[0.88] tracking-[-0.02em]">
                Нам <span className="italic text-[#B8914A]">1 год!</span>
              </h2>
              <p className="mt-6 text-[15px] text-[#2B2620]/65 leading-relaxed max-w-xl">
                Мы ценим, уважаем и слышим наших клиентов. Вместе с вами мы создаём бренд Tallora —
                без компромиссов и навязанных стандартов.
              </p>
            </Reveal>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                ["Стиль", "Мы понимаем тренды и работаем на опережение."],
                ["Комфорт", "Всё начинается с правильной посадки."],
                ["Качество", "Обувь должна быть не только красивой, но и надёжной."],
                ["Доступность", "Больше никаких «у нас только до 40»."],
              ].map(([t, d], i) => (
                <Reveal key={t} delay={i * 80} className="rounded-[22px] bg-white border border-[#2B2620]/8 p-6 hover:border-[#DAB16B]/60 transition-colors">
                  <span className="font-display text-xs tracking-[0.3em] text-[#8F6D2F]">0{i + 1}</span>
                  <h3 className="font-serif italic text-3xl mt-2">{t}</h3>
                  <p className="text-sm text-[#2B2620]/60 mt-2 leading-relaxed">{d}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── 10. FOUNDER ───────────── */}
      <section className="py-20 lg:py-32 px-5 sm:px-8 max-w-[1400px] mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <Reveal className="lg:col-span-5 relative aspect-[4/5] rounded-[28px] overflow-hidden bg-[#E8E8E8]">
            <Image src={FOUNDER_IMG} alt={`${CONTACTS.founder} — основательница Tallora`} fill sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover" />
            <span className="absolute bottom-4 left-4 glass-light text-[#2B2620] text-[10px] uppercase tracking-[0.2em] px-3 py-1.5 rounded-full">
              {CONTACTS.founder} · основательница
            </span>
          </Reveal>

          <Reveal delay={150} className="lg:col-span-7">
            <span className="text-[11px] uppercase tracking-[0.35em] text-[#8F6D2F] block mb-6">Слово основательницы</span>
            <blockquote className="font-serif font-light text-[clamp(32px,4vw,60px)] leading-[1.05] tracking-[-0.01em]">
              «Мы здесь, чтобы каждая женщина могла выбрать обувь своего размера и чувствовать себя комфортно, <span className="italic text-[#8F6D2F]">а не довольствоваться остатками</span>»
            </blockquote>
            <p className="mt-8 text-[15px] text-[#2B2620]/65 leading-relaxed max-w-xl">
              В магазинах красивые пары заканчивались на 39 размере. А если 41 и находился — то в
              странной расцветке и с ощущением, что это остатки. Tallora — это когда ты надеваешь
              и чувствуешь: мне удобно, мне красиво, я могу быть собой.
            </p>
            <Link
              href="/about#interview"
              className="inline-flex items-center gap-3 mt-8 text-[11px] uppercase tracking-[0.22em] font-semibold border-b border-[#2B2620] pb-1 hover:text-[#8F6D2F] hover:border-[#DAB16B]"
            >
              Читать интервью <ArrowRight size={14} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ───────────── 11. PRIVÉ ───────────── */}
      <section className="relative min-h-[88vh] flex items-center bg-[#F5F0E8] text-[#2B2620] overflow-hidden">
        <div className="absolute inset-0 lg:left-[42%]">
          <Image src={PRIVE_IMG} alt="" fill sizes="(max-width: 1024px) 100vw, 58vw" className="object-cover object-[50%_30%]" />
          <div className="hidden lg:block absolute inset-y-0 left-0 w-2/5 bg-gradient-to-r from-[#F5F0E8] to-transparent" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#F5F0E8] via-[#F5F0E8]/60 to-transparent lg:via-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#F5F0E8]/70 via-transparent to-transparent lg:hidden" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 w-full py-24">
          <Reveal>
            <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.35em] text-[#8F6D2F] mb-6">
              <Sparkles size={13} /> Закрытый клуб
            </span>
            <h2 className="font-display uppercase leading-[0.8] tracking-[-0.03em] text-[clamp(88px,17vw,280px)]">
              Privé
            </h2>
            <p className="font-serif italic text-3xl sm:text-4xl font-light mt-4 max-w-xl text-[#2B2620]/90">
              Ваш личный доступ к миру Tallora.
            </p>
            <div className="mt-10 grid grid-cols-3 max-w-xl border-y border-[#2B2620]/15">
              {[
                ["−5%", "на первый заказ"],
                ["до 10%", "бонусами с покупок"],
                ["Early", "доступ к коллекциям"],
              ].map(([v, l]) => (
                <div key={l} className="py-5 pr-3 border-r border-[#2B2620]/15 last:border-r-0 pl-0 [&:not(:first-child)]:pl-4">
                  <span className="font-display text-3xl sm:text-4xl block">{v}</span>
                  <span className="text-[10px] uppercase tracking-[0.18em] text-[#2B2620]/60">{l}</span>
                </div>
              ))}
            </div>
            <Link
              href="/prive"
              className="group mt-10 inline-flex h-14 pl-7 pr-2 rounded-full bg-[#DAB16B] text-[#2B2620] hover:bg-[#C99B4F] items-center gap-8 text-[12px] uppercase tracking-[0.22em] font-semibold transition-colors"
            >
              Вступить в клуб
              <span className="w-10 h-10 rounded-full bg-white text-[#2B2620] flex items-center justify-center group-hover:rotate-[-45deg] transition-all duration-500">
                <ArrowRight size={16} />
              </span>
            </Link>
          </Reveal>
        </div>
      </section>

    </div>
  );
}
