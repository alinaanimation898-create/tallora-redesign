"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Ruler, ChevronRight, ChevronLeft, Sparkles, MapPin, Clock } from "lucide-react";
import {
  PRODUCTS,
  CATEGORIES,
  LOOKBOOK_ITEMS,
  SITE_PHOTOS,
  sitePhoto,
  CONTACTS,
  SHOWROOM,
  CLIENT_VOICES,
} from "@/data/mockData";
import ProductCard from "@/components/ProductCard";
import HomeSizeCalculator from "@/components/HomeSizeCalculator";
import Reveal from "@/components/Reveal";
import { useShop } from "@/context/ShopContext";
import { asset } from "@/lib/asset";

const byId = (id: string) => PRODUCTS.find((p) => p.id === id);

/** Silhouettes: hover switches photo and cards, click opens the category. */
const SILHOUETTES = [
  { word: "Туфли", slug: "tufli" },
  { word: "Босоножки", slug: "bosonozhki" },
  { word: "Лоферы", slug: "lofery" },
  { word: "Ботильоны", slug: "botilony" },
  { word: "Сапоги", slug: "sapogi" },
];

/** Lifestyle photos from tallora.ru for the category panels. */
const CATEGORY_PHOTOS: Record<string, string> = {
  tufli: sitePhoto("tild6634-3032-4464-b162-623562666232"),
  bosonozhki: sitePhoto("tild3433-6461-4166-b136-393765613461"),
  sandali: sitePhoto("tild6638-3263-4430-b561-326366643963"),
  shlepki: sitePhoto("tild3864-3662-4531-b934-363839353366"),
  baletki: sitePhoto("tild3065-6363-4639-a464-373261306363"),
  myuli: sitePhoto("tild3038-3731-4730-b034-376532626334"),
  lofery: sitePhoto("tild3631-3263-4564-b663-356163313664"),
  botilony: asset("/tallora/products/982156835802-2.webp"),
  sapogi: sitePhoto("tild6137-3561-4363-a230-666232616634"),
};

/** Silhouettes use their own photo where the category one is too quiet. */
const SIL_PHOTOS: Record<string, { src: string; pos: string }> = {
  botilony: { src: asset("/tallora/products/144014538712-2.webp"), pos: "50% 60%" },
};

/** Photo and category for each client review, so it is clear which pair is meant. */
const VOICE_META = [
  { slug: "tufli", img: sitePhoto("tild6634-3032-4464-b162-623562666232"), pos: "50% 70%" },
  { slug: "lofery", img: sitePhoto("tild3631-3263-4564-b663-356163313664"), pos: "50% 85%" },
  { slug: "tufli", img: sitePhoto("tild3634-6166-4435-b163-376264656364"), pos: "50% 75%" },
  { slug: "botilony", img: sitePhoto("tild3164-3364-4635-b764-363338626462"), pos: "50% 50%" },
  { slug: "botilony", img: asset("/tallora/products/982156835802-2.webp"), pos: "50% 50%" },
];

/** Focal point per category photo so the shoes stay centred in every crop. */
const CATEGORY_FOCUS: Record<string, string> = {
  tufli: "50% 75%",
  bosonozhki: "50% 62%",
  sandali: "50% 78%",
  shlepki: "50% 88%",
  baletki: "50% 72%",
  myuli: "50% 82%",
  lofery: "50% 88%",
  botilony: "50% 10%",
  sapogi: "60% 72%",
};

/** Winter 2026 collection, in the order the brand shows it. */
const WINTER_IDS = [
  "p-740736480683", "p-346260118723", // Monte
  "p-205061014373", "p-666860287283", // Steve
  "p-799212856683", "p-332887618593", // W
  "p-217501969562", "p-807018973242", // Baze
  "p-599342227272", "p-892269508462", // Lora
  "p-236028247762", "p-982156835802", "p-470361396772", // Amira
  "p-144014538712", "p-473954056402", // Selena
];

const PANEL_COLORS: Record<string, string> = {
  tufli: "#E8D3A8",
  bosonozhki: "#F1EADF",
  sandali: "#EADBC4",
  shlepki: "#F4ECE0",
  baletki: "#F6F1EA",
  myuli: "#D9C7AE",
  lofery: "#D7E2DA",
  botilony: "#C9CFC0",
  sapogi: "#E2D6C6",
  botinki: "#D6CBBB",
  krossovki: "#ECE6DC",
};

const ANATOMY = [
  { n: "01", title: "Посадка, в которой хочется жить", text: "Каждую пару мы носим сами: проверяем, как нога чувствует себя к вечеру. Ходишь, бежишь, танцуешь - и забываешь, что на тебе каблук", spec: "Тест каждой пары", img: sitePhoto("tild3666-3730-4262-b466-393230646133"), pos: "50% 70%" },
  { n: "02", title: "Натуральная кожа, замша и мех", text: "Мягкие материалы, которые дышат, держат форму и красиво стареют вместе с тобой. Формы - дольше одного сезона", spec: "Кожа · замша · мех", img: sitePhoto("tild3065-3033-4731-b433-326233616138"), pos: "50% 55%" },
  { n: "03", title: "Весь размерный ряд - твой", text: "Каждая модель от 37 до 44, а в карточке - точная длина стельки для каждого размера. Выбираешь уверенно, с первого раза", spec: "Стелька 23-29.5 см", img: sitePhoto("tild6164-3932-4739-a265-383539303531"), pos: "50% 55%" },
];

function ArrowPill({ children, href, onClick }: { children: React.ReactNode; href?: string; onClick?: () => void }) {
  const cls =
    "btn-shine group h-14 pl-7 pr-2 rounded-full bg-[#20402D] hover:bg-[#183326] text-white inline-flex items-center justify-between gap-6 text-[12px] uppercase tracking-[0.22em] font-semibold transition-colors cursor-pointer";
  const inner = (
    <>
      {children}
      <span className="w-10 h-10 rounded-full bg-white text-[#2B2620] flex items-center justify-center group-hover:rotate-[-45deg] transition-transform duration-500">
        <ArrowRight size={16} />
      </span>
    </>
  );
  return href ? (
    <Link href={href} className={cls}>{inner}</Link>
  ) : (
    <button onClick={onClick} className={cls}>{inner}</button>
  );
}

function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-3 text-[10px] sm:text-[11px] uppercase tracking-[0.35em] ${light ? "text-[#DCEBE1]" : "text-[#20402D]"}`}>
      <span className={`w-8 h-px ${light ? "bg-[#DCEBE1]" : "bg-[#183326]"}`} />
      {children}
    </span>
  );
}

export default function HomePage() {
  const { setIsSizeModalOpen } = useShop();
  const [spot, setSpot] = useState(0);
  const [spotPaused, setSpotPaused] = useState(false);
  const [openPanel, setOpenPanel] = useState("tufli");
  const railRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (spotPaused) return;
    const t = setInterval(() => setSpot((s) => (s + 1) % SILHOUETTES.length), 4200);
    return () => clearInterval(t);
  }, [spotPaused]);

  const [railPaused, setRailPaused] = useState(false);
  const scrollRail = (dir: 1 | -1) => {
    const el = railRef.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    const step = card ? card.offsetWidth + 20 : el.clientWidth * 0.8;
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 8;
    const atStart = el.scrollLeft <= 8;
    if (dir === 1 && atEnd) el.scrollTo({ left: 0, behavior: "smooth" });
    else if (dir === -1 && atStart) el.scrollTo({ left: el.scrollWidth, behavior: "smooth" });
    else el.scrollBy({ left: dir * step, behavior: "smooth" });
  };
  useEffect(() => {
    if (railPaused) return;
    const t = setInterval(() => scrollRail(1), 3800);
    return () => clearInterval(t);
  }, [railPaused]);

  const winter = WINTER_IDS.map(byId).filter((p) => p !== undefined);
  const sil = SILHOUETTES[spot];
  const silProducts = PRODUCTS.filter((p) => p.categorySlug === sil.slug && p.sizes.some((z) => z.inStock)).slice(0, 2);
  const panels = CATEGORIES.filter((c) => c.slug !== "all").map((c) => ({
    ...c,
    image: CATEGORY_PHOTOS[c.slug] ?? ("image" in c ? c.image : undefined),
  }));

  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* ───────────── 1. HERO - text panel + one photo ───────────── */}
      <section className="relative grid grid-cols-1 md:grid-cols-2 md:min-h-[100svh] bg-[#EFE6D6] overflow-hidden">
        <div className="relative min-h-[100svh] md:min-h-0 md:order-2 overflow-hidden">
          <Image src={SITE_PHOTOS.muse} alt="Девушка среди красных и нюдовых лодочек Tallora" fill preload sizes="(max-width: 768px) 100vw, 50vw" className="object-cover object-[40%_35%] slow-zoom" />
          <div className="md:hidden absolute inset-0 bg-gradient-to-t from-[#2B2620]/90 via-[#2B2620]/35 to-[#2B2620]/10" />
        </div>

        <div className="absolute inset-0 md:static md:order-1 flex flex-col justify-end px-5 sm:px-8 lg:px-12 xl:px-16 pt-32 pb-10 sm:pb-14 text-white md:text-[#2B2620] md:bg-[linear-gradient(160deg,#F7F2EA_0%,#EFE6D6_55%,#E6D3B0_100%)]">
          <h1 className="uppercase mt-5 font-display leading-[1.1] tracking-[-0.02em] text-[clamp(46px,5.4vw,92px)] whitespace-nowrap [text-shadow:0_2px_30px_rgba(43,38,32,0.45)] md:[text-shadow:none]">
            <span className="hero-in block" style={{ animationDelay: "200ms" }}>Твой размер</span>
            <span className="hero-in block " style={{ animationDelay: "320ms" }}>Твоя пара</span>
            <span className="hero-in block text-accent-light md:text-accent" style={{ animationDelay: "440ms" }}>Твой момент</span>
          </h1>
          <p className="hero-in mt-9 max-w-sm text-[15px] leading-relaxed text-white/90 md:text-[#2B2620]/70" style={{ animationDelay: "560ms" }}>
            Туфли, ботильоны, лоферы и сапоги 37–44 размера из натуральной кожи. Для женщин, которые
            выбирают себя каждый день и на любом каблуке
          </p>
          <div className="hero-in mt-10 flex flex-col sm:flex-row md:flex-col lg:flex-row lg:flex-wrap sm:items-start gap-3" style={{ animationDelay: "680ms" }}>
            <ArrowPill href="/catalog">Выбрать свою пару</ArrowPill>
            <button
              onClick={() => setIsSizeModalOpen(true)}
              className="h-14 px-7 rounded-full border border-white/50 bg-white/10 backdrop-blur-md text-white md:border-[#2B2620]/25 md:bg-transparent md:text-[#2B2620] hover:bg-white hover:text-[#2B2620] text-[12px] uppercase tracking-[0.22em] font-semibold flex items-center justify-center gap-2.5 transition-colors cursor-pointer"
            >
              <Ruler size={15} />
              Подобрать размер
            </button>
          </div>
        </div>
      </section>

      {/* ───────────── 3. NEW IN - rail ───────────── */}
      <section className="py-16 lg:py-24">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
          <Reveal className="flex items-end justify-between gap-6 mb-8 sm:mb-10">
            <div>
              <h2 className="font-display uppercase text-[clamp(40px,6.5vw,96px)] leading-[1.1] tracking-[-0.02em]">
                Новая коллекция
                <span className="block text-accent">зима 2026</span>
              </h2>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button onClick={() => scrollRail(-1)} aria-label="Назад" className="w-12 h-12 rounded-full border border-[#2B2620]/15 hover:bg-white flex items-center justify-center transition-colors cursor-pointer">
                <ChevronLeft size={18} />
              </button>
              <button onClick={() => scrollRail(1)} aria-label="Вперёд" className="w-12 h-12 rounded-full bg-[#20402D] hover:bg-[#183326] flex items-center justify-center transition-colors cursor-pointer text-white">
                <ChevronRight size={18} />
              </button>
            </div>
          </Reveal>
        </div>

        <div
          ref={railRef}
          onMouseEnter={() => setRailPaused(true)}
          onMouseLeave={() => setRailPaused(false)}
          onTouchStart={() => setRailPaused(true)}
          className="flex gap-4 sm:gap-5 overflow-x-auto snap-x snap-mandatory no-scrollbar px-5 sm:px-8 scroll-px-5 sm:scroll-px-8 lg:px-[max(2rem,calc((100vw_-_1400px)/2_+_2rem))] lg:scroll-px-[max(2rem,calc((100vw_-_1400px)/2_+_2rem))]"
        >
          {winter.map((product) => (
            <div key={product.id} className="snap-start shrink-0 w-[68vw] sm:w-[42vw] md:w-[30vw] lg:w-[23%]">
              <ProductCard product={product} />
            </div>
          ))}
          <Link
            href="/catalog"
            className="snap-start shrink-0 w-[68vw] sm:w-[42vw] md:w-[30vw] lg:w-[23%] aspect-[3/4] rounded-[22px] bg-[#EFE6D6] flex flex-col items-center justify-center gap-4 text-center p-6 hover:bg-[#E8D3A8] transition-colors"
          >
            <span className="font-display text-4xl leading-none">Весь каталог</span>
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#2B2620]/60">{PRODUCTS.length} моделей · 37–44</span>
            <span className="w-12 h-12 rounded-full bg-white flex items-center justify-center"><ArrowUpRight size={18} /></span>
          </Link>
        </div>
      </section>

      {/* ───────────── 13. FOUNDER ───────────── */}
      <section className="bg-[#F5F0E8] py-16 lg:py-28 px-5 sm:px-8">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <Reveal className="lg:col-span-5 relative aspect-[4/5] rounded-[28px] overflow-hidden bg-[#E8E8E8]">
            <Image src={SITE_PHOTOS.founder} alt={`${CONTACTS.founder} - основательница Tallora`} fill sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover" />
            <span className="absolute bottom-4 left-4 glass-light text-[#2B2620] text-[10px] uppercase tracking-[0.2em] px-3 py-1.5 rounded-full">
              {CONTACTS.founder} · основательница
            </span>
          </Reveal>
          <Reveal delay={150} className="lg:col-span-7">
            <Eyebrow>Какое чувство дарит Tallora?</Eyebrow>
            <blockquote className="mt-6 font-display font-light text-[clamp(34px,4.4vw,68px)] leading-[1.02] tracking-[-0.01em]">
              «Лёгкость. Спокойствие. Уверенность. То, что это её.{" "}
              <span className="text-[#20402D]">Её стиль. Её размер. Её шаг</span>»
            </blockquote>
            <p className="mt-8 text-[15px] text-[#2B2620]/65 leading-relaxed max-w-xl">
              Tallora родилась из личной истории Яны: красивые пары в магазинах заканчивались на 39 размере.
              Сегодня это бренд для женщин, которые выбирают - смело, со вкусом и по своему размеру
            </p>
            <Link href="/about#interview" className="inline-flex items-center gap-3 mt-8 text-[11px] uppercase tracking-[0.22em] font-semibold border-b border-[#2B2620] pb-1 hover:text-[#20402D] hover:border-[#20402D]">
              Читать интервью <ArrowRight size={14} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ───────────── 5. SILHOUETTES ───────────── */}
      <section
        className="relative bg-[#F5F0E8] overflow-hidden"
        onMouseEnter={() => setSpotPaused(true)}
        onMouseLeave={() => setSpotPaused(false)}
      >
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          <div className="lg:col-span-4 min-w-0">
            <Eyebrow>Выбери свой силуэт</Eyebrow>
            <ul className="mt-6 flex lg:flex-col gap-x-5 overflow-x-auto no-scrollbar -mx-5 px-5 lg:mx-0 lg:px-0">
              {SILHOUETTES.map((s, i) => (
                <li key={s.slug} className="shrink-0">
                  <Link
                    href={`/catalog?category=${s.slug}`}
                    onMouseEnter={() => setSpot(i)}
                    onFocus={() => setSpot(i)}
                    className={`group flex items-start gap-2 font-display uppercase leading-[0.95] tracking-[-0.01em] text-[34px] sm:text-[56px] lg:text-[clamp(52px,5.4vw,84px)] transition-all duration-500 ${
                      spot === i ? "text-[#2B2620]" : "text-outline-noir opacity-50 hover:opacity-100"
                    }`}
                  >
                    {s.word}
                    <ArrowUpRight size={22} className={`mt-2 transition-opacity ${spot === i ? "opacity-100 text-[#20402D]" : "opacity-0"}`} />
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex gap-1.5 max-w-xs">
              {SILHOUETTES.map((s, i) => (
                <button key={s.slug} onClick={() => setSpot(i)} aria-label={s.word} className="h-[3px] flex-1 bg-[#2B2620]/10 overflow-hidden rounded cursor-pointer">
                  <span className={`block h-full bg-[#20402D] transition-all ${spot === i ? "w-full duration-[4200ms] ease-linear" : spot > i ? "w-full duration-0" : "w-0 duration-0"}`} />
                </button>
              ))}
            </div>
          </div>

          <Link href={`/catalog?category=${sil.slug}`} className="lg:col-span-4 relative aspect-[4/5] rounded-[28px] overflow-hidden bg-[#E8E8E8] block">
            <div key={sil.slug} className="absolute inset-0 fade-swap">
              <Image src={SIL_PHOTOS[sil.slug]?.src ?? CATEGORY_PHOTOS[sil.slug]} alt={sil.word} fill sizes="(max-width: 1024px) 100vw, 33vw" style={{ objectPosition: SIL_PHOTOS[sil.slug]?.pos ?? CATEGORY_FOCUS[sil.slug] ?? "50% 50%" }} className="object-cover" />
            </div>
            <span className="absolute bottom-4 left-4 right-4 h-12 rounded-full bg-white/90 backdrop-blur flex items-center justify-between pl-5 pr-1.5 text-[11px] uppercase tracking-[0.2em] font-semibold">
              Все {sil.word.toLowerCase()}
              <span className="w-9 h-9 rounded-full bg-[#20402D] text-white flex items-center justify-center"><ArrowUpRight size={16} /></span>
            </span>
          </Link>

          <div key={sil.slug} className="lg:col-span-4 grid grid-cols-2 gap-3 sm:gap-4 fade-swap">
            {silProducts.map((p) => (
              <div key={p.id} className="bg-white rounded-[24px] p-2.5 sm:p-3 pb-4 shadow-[0_18px_40px_-28px_rgba(43,38,32,0.45)]">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── 6. STAND OUT - full-bleed on mobile, split on desktop ───────────── */}
      <section className="relative overflow-hidden bg-[#F5F0E8] lg:grid lg:grid-cols-[1fr_auto]">
        <div className="relative min-h-[88svh] lg:min-h-0 lg:order-2 lg:h-[min(92vh,980px)] lg:aspect-[781/1400]">
          <Image src={SITE_PHOTOS.walk} alt="Девушка в красных туфлях Tallora выходит из машины" fill sizes="(max-width: 1024px) 100vw, 560px" className="object-cover object-[50%_40%] lg:object-center" />
          <div className="lg:hidden absolute inset-0 bg-gradient-to-t from-[#2B2620]/85 via-[#2B2620]/15 to-transparent" />
        </div>
        <div className="absolute inset-x-0 bottom-0 lg:static lg:order-1 flex items-end lg:items-center">
          <Reveal className="w-full max-w-[700px] lg:ml-auto px-5 sm:px-8 lg:px-14 xl:px-20 pb-12 lg:py-20 text-white lg:text-[#2B2620] min-w-0">
            <h2 className="font-display uppercase text-[clamp(56px,7vw,116px)] leading-[1.1] tracking-[-0.02em]">
              Время
              <span className="block text-accent-light lg:text-accent">выделяться</span>
            </h2>
            <p className="mt-6 max-w-sm text-[15px] text-white/85 lg:text-[#2B2620]/70 leading-relaxed">
              Шаг, который слышно. Каблук, который держит. Пара, которую запоминают - вместе с тобой
            </p>
            <div className="mt-8">
              <ArrowPill href="/catalog?category=tufli">Смотреть туфли</ArrowPill>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───────────── 7. CATEGORIES ───────────── */}
      <section className="bg-white text-[#2B2620] py-16 lg:py-28">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
          <Reveal className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-8 sm:mb-12">
            <h2 className="font-display uppercase text-[clamp(44px,8vw,128px)] leading-[1.1] tracking-[-0.02em]">
              На каждый
              <span className="block text-accent">выход</span>
            </h2>
            <p className="max-w-xs text-sm text-[#2B2620]/60 leading-relaxed">
              Офис, свидание, бранч, вечеринка до утра. Для каждого сценария - своя пара, и в каждой ты главная
            </p>
          </Reveal>

          <div className="hidden md:flex h-[72vh] min-h-[520px] gap-2">
            {panels.map((cat) => {
              const open = openPanel === cat.slug;
              const color = PANEL_COLORS[cat.slug] ?? "#EFE6D6";
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
                    <Image src={cat.image} alt={cat.name} fill sizes="50vw" style={{ objectPosition: CATEGORY_FOCUS[cat.slug] ?? "50% 50%" }} className={`object-cover transition-all duration-700 ${open ? "opacity-100 scale-100" : "opacity-35 grayscale scale-110 mix-blend-multiply"}`} />
                  )}
                  <div className="absolute inset-0 transition-opacity duration-700" style={{ backgroundColor: color, opacity: open ? 0 : 0.35 }} />
                  <div className="absolute inset-0 transition-opacity duration-700" style={{ background: `linear-gradient(to bottom, ${color} 0%, transparent 45%)`, opacity: open ? 0.95 : 0 }} />
                  <div className={`absolute inset-x-0 bottom-6 flex flex-col items-center transition-opacity duration-500 ${open ? "opacity-0" : "opacity-100"}`}>
                    <span className="font-display uppercase text-2xl tracking-[0.08em] [writing-mode:vertical-rl] rotate-180">{cat.name}</span>
                  </div>
                  <div className={`absolute inset-x-0 top-0 p-7 transition-all duration-700 ${open ? "opacity-100 translate-y-0 delay-200" : "opacity-0 -translate-y-6"}`}>
                    <h3 className="font-display uppercase text-6xl xl:text-7xl leading-none whitespace-nowrap">{cat.name}</h3>
                  </div>
                  <span className={`absolute bottom-6 right-6 w-14 h-14 rounded-full flex items-center justify-center bg-white text-[#2B2620] transition-opacity duration-500 ${open ? "opacity-100" : "opacity-0"}`}>
                    <ArrowUpRight size={20} />
                  </span>
                </Link>
              );
            })}
          </div>

          {/* Mobile: two-column tiles, everything visible without sideways scroll */}
          <div className="md:hidden grid grid-cols-2 gap-3">
            {panels.map((cat, i) => {
              const color = PANEL_COLORS[cat.slug] ?? "#EFE6D6";
              const wide = i === 0;
              return (
                <Link
                  key={cat.slug}
                  href={`/catalog?category=${cat.slug}`}
                  className={`relative rounded-[20px] overflow-hidden ${wide ? "col-span-2 aspect-[4/3]" : "aspect-[3/4]"}`}
                  style={{ backgroundColor: color }}
                >
                  {cat.image && <Image src={cat.image} alt={cat.name} fill sizes={wide ? "100vw" : "50vw"} style={{ objectPosition: CATEGORY_FOCUS[cat.slug] ?? "50% 50%" }} className="object-cover" />}
                  <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, ${color} 6%, transparent 45%)` }} />
                  <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2">
                    <h3 className={`font-display uppercase leading-none ${wide ? "text-4xl" : "text-[22px]"}`}>{cat.name}</h3>
                    <ArrowUpRight size={18} className="shrink-0" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ───────────── 2. MARQUEE ───────────── */}
      <div className="bg-[#20402D] text-white py-4 sm:py-6 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-8 sm:gap-10 font-display text-3xl sm:text-5xl font-light">
          {[...Array(4)].map((_, i) => (
            <React.Fragment key={i}>
              <span>Время выделяться</span>
              <span className="font-display text-xl sm:text-2xl">✦</span>
              <span>Твой рост - твоя сила</span>
              <span className="font-display text-xl sm:text-2xl">✦</span>
              <span>37 - 44</span>
              <span className="font-display text-xl sm:text-2xl">✦</span>
              <span>Натуральная кожа</span>
              <span className="font-display text-xl sm:text-2xl">✦</span>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* ───────────── 8. ANATOMY - photo + three promises ───────────── */}
      <section className="bg-white py-16 lg:py-28">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <Reveal className="lg:col-span-5 relative aspect-[4/5] rounded-[28px] overflow-hidden bg-[#E9E4DE]">
            <Image src={SITE_PHOTOS.redHeel} alt="Нога в красной босоножке Tallora на шпильке" fill sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover object-bottom" />
          </Reveal>
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow>Почему Tallora</Eyebrow>
              <h2 className="mt-5 font-display uppercase text-[clamp(44px,6vw,96px)] leading-[1.1] tracking-[-0.01em]">
                Сделано <span className="text-accent">для тебя</span>
              </h2>
            </Reveal>
            <div className="mt-10 border-t border-[#2B2620]/12">
              {ANATOMY.map((f, i) => (
                <Reveal key={f.n} delay={i * 100} className="py-7 border-b border-[#2B2620]/12 grid grid-cols-[48px_1fr] sm:grid-cols-[72px_1fr] gap-x-3">
                  <span className="font-display text-[28px] sm:text-[36px] leading-none text-[#20402D]">{f.n}</span>
                  <div>
                    <h3 className="font-display uppercase text-[24px] sm:text-[30px] leading-tight">{f.title}</h3>
                    <p className="mt-2 text-[15px] sm:text-[16px] text-[#2B2620]/65 leading-relaxed max-w-xl">{f.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── 9. SIZE CALCULATOR ───────────── */}
      <HomeSizeCalculator />

      {/* ───────────── 10. REVIEWS - messages from the Telegram channel ───────────── */}
      <section className="py-16 lg:py-28 bg-[#F5F0E8]">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
          <Reveal className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-16 items-end mb-10 sm:mb-14">
            <div className="lg:col-span-7">
              <Eyebrow>Отзывы</Eyebrow>
              <h2 className="mt-5 font-display uppercase text-[clamp(44px,7vw,112px)] leading-[1.1] tracking-[-0.01em]">
                Что говорят <span className="text-accent">клиентки</span>
              </h2>
            </div>
            <div className="lg:col-span-5">
              <p className="text-[15px] sm:text-[16px] text-[#2B2620]/70 leading-relaxed max-w-md">
                Настоящие сообщения от клиенток и блогеров, которые носят Tallora. Мы собираем их в нашем Telegram-канале
              </p>
              <a href="https://t.me/tallora" target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] font-semibold border-b border-[#2B2620] pb-1 hover:text-[#20402D] hover:border-[#20402D]">
                Читать все в Telegram <ArrowUpRight size={14} />
              </a>
            </div>
          </Reveal>

          <div className="columns-1 md:columns-2 lg:columns-3 gap-5 [&>*]:mb-5">
            {CLIENT_VOICES.map((v, i) => {
              const meta = VOICE_META[i % VOICE_META.length];
              return (
                <Reveal key={i} delay={(i % 3) * 90} className="break-inside-avoid">
                  <figure>
                    <blockquote className="relative bg-white rounded-[26px] rounded-bl-[6px] p-6 sm:p-7 shadow-[0_18px_40px_-30px_rgba(43,38,32,0.5)]">
                      <span aria-hidden className="block font-display text-[56px] leading-[0.6] text-[#20402D] h-7">“</span>
                      <p className="mt-2 text-[18px] sm:text-[19px] leading-[1.5] text-[#2B2620]">{v.text}</p>
                      <Link href={`/catalog?category=${meta.slug}`} className="mt-5 inline-flex items-center gap-2 h-9 pl-3.5 pr-2 rounded-full bg-[#F5F0E8] text-[11px] uppercase tracking-[0.16em] text-[#2B2620] hover:bg-[#20402D] hover:text-white transition-colors">
                        {v.product} <ArrowUpRight size={13} />
                      </Link>
                    </blockquote>
                    <figcaption className="mt-3 ml-1 flex items-center gap-3">
                      <span className="w-10 h-10 shrink-0 rounded-full bg-[#20402D] text-white flex items-center justify-center font-display text-[17px]">
                        {v.who.charAt(0)}
                      </span>
                      <span className="text-[13px] text-[#2B2620]/70 leading-tight">
                        <span className="block font-semibold text-[#2B2620]">{v.who.split(",")[0]}</span>
                        {v.who.includes(",") ? v.who.split(",").slice(1).join(",").trim() : "Telegram Tallora"}
                      </span>
                    </figcaption>
                  </figure>
                </Reveal>
              );
            })}
            <Reveal className="break-inside-avoid">
              <a href={CONTACTS.telegram} target="_blank" rel="noreferrer" className="group block rounded-[26px] bg-[#20402D] text-white p-7 sm:p-8">
                <span className="text-[11px] uppercase tracking-[0.22em] text-white/70">Уже носишь Tallora?</span>
                <span className="mt-4 block font-display uppercase text-[34px] leading-[1.02]">Расскажи о своей паре</span>
                <span className="mt-6 inline-flex items-center gap-2 h-11 pl-5 pr-2 rounded-full bg-white text-[#20402D] text-[11px] uppercase tracking-[0.18em] font-semibold">
                  Написать в Telegram
                  <span className="w-7 h-7 rounded-full bg-[#20402D] text-white flex items-center justify-center group-hover:rotate-[-45deg] transition-transform"><ArrowRight size={13} /></span>
                </span>
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ───────────── 11. LOOKBOOK ───────────── */}
      <section className="py-16 lg:py-28">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
          <Reveal className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-8 sm:mb-12">
            <div>
              <h2 className="font-display uppercase text-[clamp(48px,9vw,148px)] leading-[1.1] tracking-[-0.02em]">
                Lookbook
              </h2>
            </div>
            <Link href="/lookbook" className="self-start md:self-end text-[11px] uppercase tracking-[0.22em] font-semibold border-b border-[#2B2620] pb-1 hover:text-[#20402D] hover:border-[#20402D]">
              Все образы →
            </Link>
          </Reveal>
        </div>

        <div className="flex gap-3 sm:gap-4 overflow-x-auto snap-x snap-mandatory scroll-px-5 sm:scroll-px-8 no-scrollbar px-5 sm:px-8 lg:px-[max(2rem,calc((100vw_-_1400px)/2_+_2rem))]">
          {LOOKBOOK_ITEMS.map((item, i) => (
            <Link
              href="/lookbook"
              key={item.id}
              className={`group relative snap-start shrink-0 w-[78vw] sm:w-[44vw] lg:w-[30vw] aspect-[3/4.4] rounded-[24px] overflow-hidden bg-[#E8E8E8] ${i % 2 === 1 ? "lg:mt-16" : ""}`}
            >
              <Image src={item.imageUrl} alt={item.title} fill sizes="(max-width: 640px) 80vw, 30vw" className="object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2B2620]/75 via-[#2B2620]/5 to-transparent" />
              <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 text-[#F3F3F3]">
                <span className="block w-8 h-px bg-white/70 mb-4" />
                <h3 className="font-display text-[30px] sm:text-[38px] leading-[1.05]">
                  <span className="block font-sans text-[11px] uppercase tracking-[0.3em] text-white/70 mb-2">{byId(item.featuredProductId)?.typeLabel}</span>
                  {byId(item.featuredProductId)?.model}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ───────────── 12. SHOWROOM & COMMUNITY ───────────── */}
      <section className="bg-white py-16 lg:py-28 px-5 sm:px-8">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <Reveal className="lg:col-span-6 relative aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5] rounded-[28px] overflow-hidden bg-[#E8E8E8]">
            <Image src={SITE_PHOTOS.queen} alt="Девушка в кресле примеряет туфли Tallora" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover object-[50%_40%]" />
          </Reveal>
          <div className="lg:col-span-6">
            <Reveal>
              <Eyebrow>Примерка вживую в Москве</Eyebrow>
              <h2 className="uppercase mt-5 font-display text-[clamp(44px,6vw,96px)] leading-[1.1] tracking-[-0.02em]">
                Приходи <span className="text-accent">примерить</span>
              </h2>
              <p className="mt-6 text-[15px] text-[#2B2620]/70 leading-relaxed max-w-lg">
                Вся коллекция и все размеры ждут тебя в шоуруме. А ещё у нас свои вечеринки: клиентские дни
                на складе, мастер-классы по дефиле и осанке для высоких девушек, съёмки и красивая компания
              </p>
            </Reveal>
            <Reveal delay={120} className="mt-8 rounded-[24px] bg-[#F5F0E8] p-6 sm:p-7 space-y-4">
              <h3 className="font-display uppercase text-2xl tracking-[0.04em]">{SHOWROOM.name}</h3>
              <div className="flex gap-3 text-sm">
                <MapPin size={18} className="text-[#20402D] shrink-0 mt-0.5" />
                <div>
                  <span className="block font-medium">{SHOWROOM.address}</span>
                  <span className="block text-[#2B2620]/60">{SHOWROOM.metro}</span>
                  <span className="block text-[#2B2620]/60 text-xs mt-1 leading-relaxed">{SHOWROOM.hint}</span>
                </div>
              </div>
              <div className="flex gap-3 text-sm">
                <Clock size={18} className="text-[#20402D] shrink-0" />
                <span>{SHOWROOM.hours}</span>
              </div>
            </Reveal>
            <Reveal delay={200} className="mt-6 flex flex-col sm:flex-row gap-3">
              <ArrowPill href="/contacts">Как добраться</ArrowPill>
              <a href={CONTACTS.telegram} target="_blank" rel="noreferrer" className="h-14 px-7 rounded-full border border-[#2B2620]/20 hover:border-[#2B2620] text-[12px] uppercase tracking-[0.22em] font-semibold flex items-center justify-center transition-colors">
                Подобрать пару в Telegram
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ───────────── 14. PRIVÉ ───────────── */}
      <section className="relative lg:min-h-[88vh] lg:flex lg:items-center bg-[#F5F0E8] text-[#2B2620] overflow-hidden">
        <div className="relative h-[64svh] lg:h-auto lg:absolute lg:inset-y-0 lg:right-0 lg:w-[48%]">
          <Image src={SITE_PHOTOS.redBoots} alt="Девушка в замшевых сапогах Tallora" fill sizes="(max-width: 1024px) 100vw, 48vw" className="object-cover object-[50%_25%] lg:object-[50%_55%]" />
          <div className="hidden lg:block absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-[#F5F0E8] to-transparent" />
          <div className="lg:hidden absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#F5F0E8] to-transparent" />
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 w-full -mt-16 pb-16 lg:mt-0 lg:py-28">
          <Reveal className="lg:max-w-[46%]">
            <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.35em] text-[#20402D]">
              <Sparkles size={13} /> Закрытый клуб для своих
            </span>
            <h2 className="mt-6 font-display uppercase leading-[1.1] tracking-[-0.03em] text-[clamp(88px,13vw,200px)]">Privé</h2>
            <p className="mt-8 font-display uppercase text-[26px] sm:text-[34px] leading-[1.25]">
              Новинки раньше всех
              <br />
              Распродажи первой
              <br />
              <span className="text-accent">Скидка всегда</span>
            </p>
            <div className="mt-12 grid grid-cols-3 max-w-xl border-t border-[#2B2620]/15">
              {[
                ["5%", "на первый заказ"],
                ["до 10%", "бонусами с покупок"],
                ["Первой", "о новых коллекциях"],
              ].map(([v, l]) => (
                <div key={l} className="pt-5 pr-3 sm:pr-5 [&:not(:first-child)]:pl-3 sm:[&:not(:first-child)]:pl-5 [&:not(:first-child)]:border-l border-[#2B2620]/15">
                  <span className="font-display uppercase text-[30px] sm:text-[44px] leading-none block text-accent">{v}</span>
                  <span className="mt-3 text-[10px] sm:text-[11px] uppercase tracking-[0.14em] text-[#2B2620]/65 leading-snug block">{l}</span>
                </div>
              ))}
            </div>
            <div className="mt-12">
              <ArrowPill href="/prive">Вступить в клуб</ArrowPill>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
