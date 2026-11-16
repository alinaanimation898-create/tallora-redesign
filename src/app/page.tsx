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

const byId = (id: string) => PRODUCTS.find((p) => p.id === id);

/** Spotlight: real packshots on light backgrounds blend into the page. */
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
  tufli: sitePhoto("tild6634-3032-4464-b162-623562666232"),
  bosonozhki: sitePhoto("tild3433-6461-4166-b136-393765613461"),
  sandali: sitePhoto("tild6638-3263-4430-b561-326366643963"),
  shlepki: sitePhoto("tild3864-3662-4531-b934-363839353366"),
  baletki: sitePhoto("tild3065-6363-4639-a464-373261306363"),
  myuli: sitePhoto("tild3038-3731-4730-b034-376532626334"),
  lofery: sitePhoto("tild3631-3263-4564-b663-356163313664"),
  botilony: sitePhoto("tild3734-6334-4563-a262-333332386333"),
  sapogi: sitePhoto("tild6137-3561-4363-a230-666232616634"),
};

/** Focal point per category photo so the shoes stay centred in every crop. */
const CATEGORY_FOCUS: Record<string, string> = {
  tufli: "50% 75%",
  bosonozhki: "50% 62%",
  sandali: "50% 78%",
  shlepki: "50% 88%",
  baletki: "50% 72%",
  myuli: "50% 82%",
  lofery: "50% 88%",
  botilony: "50% 45%",
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
  lofery: "#DAB16B",
  botilony: "#C9CFC0",
  sapogi: "#E2D6C6",
  botinki: "#D6CBBB",
  krossovki: "#ECE6DC",
};

/** One-line mood for each category panel. */
const CATEGORY_MOOD: Record<string, string> = {
  tufli: "Для входа, который запоминают",
  bosonozhki: "Лето, вечер, загар",
  sandali: "Свобода каждого шага",
  shlepki: "Лёгкость на каждый день",
  baletki: "Парижская лёгкость",
  myuli: "Небрежный шик",
  lofery: "Effortless-шик в городе",
  botilony: "Характер в каждом шаге",
  sapogi: "Вертикаль, которая работает на рост",
  botinki: "Город в твоём ритме",
  krossovki: "Скорость и мех внутри",
};

const ANATOMY = [
  { n: "01", title: "Посадка, в которой хочется жить", text: "Каждую пару мы носим сами: проверяем, как нога чувствует себя к вечеру. Ходишь, бежишь, танцуешь – и забываешь, что на тебе каблук.", spec: "Тест каждой пары", img: sitePhoto("tild3666-3730-4262-b466-393230646133"), pos: "50% 70%" },
  { n: "02", title: "Натуральная кожа, замша и мех", text: "Мягкие материалы, которые дышат, держат форму и красиво стареют вместе с тобой. Формы – дольше одного сезона.", spec: "Кожа · замша · мех", img: sitePhoto("tild3065-3033-4731-b433-326233616138"), pos: "50% 55%" },
  { n: "03", title: "Весь размерный ряд – твой", text: "Каждая модель от 37 до 44, а в карточке – точная длина стельки для каждого размера. Выбираешь уверенно, с первого раза.", spec: "Стелька 23-29.5 см", img: sitePhoto("tild6164-3932-4739-a265-383539303531"), pos: "50% 55%" },
];

const PAIN = ["брала «лишь бы налезло»", "прятала ноги под брюками", "проходила мимо самых красивых пар"];

function ArrowPill({ children, href, onClick }: { children: React.ReactNode; href?: string; onClick?: () => void }) {
  const cls =
    "btn-shine group h-14 pl-7 pr-2 rounded-full bg-[#DAB16B] hover:bg-[#C99B4F] text-[#2B2620] inline-flex items-center justify-between gap-6 text-[12px] uppercase tracking-[0.22em] font-semibold transition-colors cursor-pointer";
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
    <span className={`inline-flex items-center gap-3 text-[10px] sm:text-[11px] uppercase tracking-[0.35em] ${light ? "text-[#F5E6C8]" : "text-[#8F6D2F]"}`}>
      <span className={`w-8 h-px ${light ? "bg-[#F5E6C8]" : "bg-[#C99B4F]"}`} />
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
    const t = setInterval(() => setSpot((s) => (s + 1) % SPOTLIGHT.length), 4200);
    return () => clearInterval(t);
  }, [spotPaused]);

  const scrollRail = (dir: 1 | -1) => {
    const el = railRef.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  const winter = WINTER_IDS.map(byId).filter((p) => p !== undefined);
  const current = SPOTLIGHT[spot];
  const panels = CATEGORIES.filter((c) => c.slug !== "all").map((c) => ({
    ...c,
    image: CATEGORY_PHOTOS[c.slug] ?? ("image" in c ? c.image : undefined),
  }));

  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* ───────────── 1. HERO - text panel + two photos ───────────── */}
      <section className="relative grid grid-cols-1 md:grid-cols-[1.3fr_1fr_1fr] md:h-[100svh] md:min-h-[640px] bg-[#EFE6D6] overflow-hidden">
        <div className="relative min-h-[100svh] md:min-h-0 md:order-2 overflow-hidden">
          <Image src={SITE_PHOTOS.queen} alt="Девушка в кресле выбирает туфли Tallora" fill preload sizes="(max-width: 768px) 100vw, 30vw" className="object-cover object-[50%_40%] slow-zoom" />
          <div className="md:hidden absolute inset-0 bg-gradient-to-t from-[#2B2620]/90 via-[#2B2620]/35 to-[#2B2620]/10" />
        </div>
        <div className="hidden md:block relative md:order-3 overflow-hidden">
          <Image src={SITE_PHOTOS.muse} alt="Девушка среди красных и нюдовых лодочек Tallora" fill sizes="30vw" className="object-cover object-[40%_40%] slow-zoom" />
        </div>

        <div className="absolute inset-0 md:static md:order-1 flex flex-col justify-end px-5 sm:px-8 lg:px-12 xl:px-16 pt-32 pb-10 sm:pb-14 text-white md:text-[#2B2620] md:bg-[linear-gradient(160deg,#F7F2EA_0%,#EFE6D6_55%,#E6D3B0_100%)]">
          <div className="hero-in" style={{ animationDelay: "100ms" }}>
            <span className="inline-flex items-center gap-3 text-[10px] sm:text-[11px] uppercase tracking-[0.35em] text-[#F5E6C8] md:text-[#8F6D2F]">
              <span className="w-8 h-px bg-current" />
              Walk loud · Stay unforgettable
            </span>
          </div>
          <h1 className="mt-5 font-serif font-light leading-[0.9] tracking-[-0.02em] text-[clamp(48px,5.6vw,92px)] [text-shadow:0_2px_30px_rgba(43,38,32,0.45)] md:[text-shadow:none]">
            <span className="hero-in block" style={{ animationDelay: "200ms" }}>Твой размер</span>
            <span className="hero-in block italic" style={{ animationDelay: "320ms" }}>Твоя пара</span>
            <span className="hero-in block italic text-[#E8C88A] md:text-[#B8914A]" style={{ animationDelay: "440ms" }}>Твой момент</span>
          </h1>
          <p className="hero-in mt-7 max-w-sm text-[15px] leading-relaxed text-white/90 md:text-[#2B2620]/70" style={{ animationDelay: "560ms" }}>
            Туфли, ботильоны, лоферы и сапоги 37–44 размера из натуральной кожи. Для женщин, которые
            выбирают себя – каждый день и на любом каблуке.
          </p>
          <div className="hero-in mt-8 flex flex-col sm:flex-row md:flex-col 2xl:flex-row sm:items-start gap-3" style={{ animationDelay: "680ms" }}>
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
              <Eyebrow>Новинки · Monte и Steve уже здесь</Eyebrow>
              <h2 className="mt-4 font-display uppercase text-[clamp(40px,6.5vw,96px)] leading-[0.88] tracking-[-0.02em]">
                Новая коллекция
                <span className="block font-serif normal-case italic font-light tracking-normal text-[#B8914A]">зима 2026</span>
              </h2>
            </div>
            <div className="hidden sm:flex items-center gap-2 shrink-0">
              <button onClick={() => scrollRail(-1)} aria-label="Назад" className="w-12 h-12 rounded-full border border-[#2B2620]/15 hover:bg-white flex items-center justify-center transition-colors cursor-pointer">
                <ChevronLeft size={18} />
              </button>
              <button onClick={() => scrollRail(1)} aria-label="Вперёд" className="w-12 h-12 rounded-full bg-[#DAB16B] hover:bg-[#C99B4F] flex items-center justify-center transition-colors cursor-pointer">
                <ChevronRight size={18} />
              </button>
            </div>
          </Reveal>
        </div>

        <div
          ref={railRef}
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
            <span className="font-serif italic text-4xl leading-none">Весь каталог</span>
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#2B2620]/60">{PRODUCTS.length} моделей · 37–44</span>
            <span className="w-12 h-12 rounded-full bg-white flex items-center justify-center"><ArrowUpRight size={18} /></span>
          </Link>
        </div>
      </section>

      {/* ───────────── 4. MANIFESTO - «Хватит.» ───────────── */}
      <section className="bg-[#F5F0E8] py-20 lg:py-32 px-5 sm:px-8">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <Reveal className="lg:col-span-7">
            <p className="font-serif italic text-[clamp(28px,3.6vw,52px)] leading-[1.1] text-[#2B2620]/45">
              «Ну у тебя просто нога большая…»
            </p>
            <p className="mt-8 text-[15px] sm:text-base text-[#2B2620]/70 max-w-lg leading-relaxed">
              Сколько раз ты это слышала? И сколько раз из-за этого:
            </p>
            <ul className="mt-4 space-y-2">
              {PAIN.map((t) => (
                <li key={t} className="flex items-center gap-4 font-serif text-2xl sm:text-3xl text-[#2B2620]/55">
                  <span aria-hidden className="w-5 h-px bg-[#C99B4F] shrink-0" />
                  <span className="line-through decoration-[#C99B4F] decoration-1">{t}</span>
                </li>
              ))}
            </ul>
            <h2 className="mt-10 font-display uppercase text-[clamp(88px,15vw,220px)] leading-[0.8] tracking-[-0.03em] text-[#2B2620]">
              Хватит
            </h2>
            <p className="mt-8 font-serif text-[clamp(24px,2.6vw,38px)] leading-[1.15] max-w-xl">
              Твоя нога – <span className="italic text-[#8F6D2F]">твоя гордость</span>
              <br />
              Твой рост – <span className="italic text-[#8F6D2F]">твоя сила</span>
            </p>
          </Reveal>
          <Reveal delay={150} className="lg:col-span-5 relative aspect-[4/5] w-full rounded-[28px] overflow-hidden bg-[#E9E4DE]">
            <Image src={SITE_PHOTOS.redHeel} alt="Нога в красной босоножке Tallora на шпильке" fill sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover object-bottom" />
            <span className="absolute top-4 left-4 glass-light text-[#2B2620] text-[10px] uppercase tracking-[0.2em] px-3 py-1.5 rounded-full">
              Натуральная кожа · шпилька
            </span>
          </Reveal>
        </div>
      </section>

      {/* ───────────── 5. SPOTLIGHT ───────────── */}
      <section
        className="relative bg-[#F3F3F3] overflow-hidden"
        onMouseEnter={() => setSpotPaused(true)}
        onMouseLeave={() => setSpotPaused(false)}
      >
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 py-16 lg:py-28 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center lg:min-h-[86vh]">
          <span className="lg:hidden order-0"><Eyebrow>Выбери свой силуэт</Eyebrow></span>
          <div className="lg:col-span-4 relative z-10 order-2 lg:order-1 min-w-0">
            <span className="hidden lg:block mb-6"><Eyebrow>Выбери свой силуэт</Eyebrow></span>
            <ul className="flex lg:flex-col gap-x-5 overflow-x-auto no-scrollbar -mx-5 px-5 lg:mx-0 lg:px-0">
              {SPOTLIGHT.map((s, i) => (
                <li key={s.slug} className="shrink-0">
                  <button
                    onClick={() => setSpot(i)}
                    onMouseEnter={() => setSpot(i)}
                    className={`group flex items-start gap-2 font-display uppercase leading-[0.95] tracking-[-0.01em] text-[34px] sm:text-[56px] lg:text-[clamp(52px,5.4vw,84px)] transition-all duration-500 cursor-pointer ${
                      spot === i ? "text-[#2B2620]" : "text-outline-noir opacity-50 hover:opacity-100"
                    }`}
                  >
                    {s.word}
                    <sup className={`font-sans text-[10px] tracking-normal mt-2 transition-colors ${spot === i ? "text-[#8F6D2F]" : "text-[#2B2620]/40"}`}>
                      0{i + 1}
                    </sup>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-5 relative order-1 lg:order-2 aspect-[5/4] sm:aspect-square lg:aspect-[4/5]">
            <div aria-hidden className="absolute inset-0 flex items-center justify-center font-serif italic text-[#8F6D2F]/10 text-[70vw] lg:text-[20vw] leading-none select-none pointer-events-none">
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
            <div className="absolute -bottom-3 left-0 right-0 flex gap-1.5">
              {SPOTLIGHT.map((s, i) => (
                <span key={s.slug} className="h-[2px] flex-1 bg-[#2B2620]/10 overflow-hidden rounded">
                  <span className={`block h-full bg-[#DAB16B] transition-all ${spot === i ? "w-full duration-[4200ms] ease-linear" : spot > i ? "w-full duration-0" : "w-0 duration-0"}`} />
                </span>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3 order-3 relative z-10">
            <div key={current.slug} className="fade-swap">
              <span className="text-[11px] uppercase tracking-[0.3em] text-[#2B2620]/45">Модель</span>
              <h3 className="font-serif italic text-5xl lg:text-7xl leading-none mt-2">{current.model}</h3>
              <div className="mt-5 grid grid-cols-2 border-y border-[#2B2620]/12">
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
                  <span key={s.size} className={`flex-1 h-9 rounded-full border border-[#2B2620]/15 flex items-center justify-center font-display text-sm ${s.inStock ? "" : "opacity-30 line-through"}`}>
                    {s.size}
                  </span>
                ))}
              </div>
              <div className="mt-6 [&>a]:w-full">
                <ArrowPill href={current.href}>Хочу эту пару</ArrowPill>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── 6. STAND OUT - full-bleed on mobile, split on desktop ───────────── */}
      <section className="relative overflow-hidden bg-[#F5F0E8] lg:grid lg:grid-cols-[1fr_minmax(0,580px)] lg:min-h-[92vh]">
        <div className="relative min-h-[88svh] lg:min-h-0 lg:order-2">
          <Image src={SITE_PHOTOS.walk} alt="Девушка в красных туфлях Tallora выходит из машины" fill sizes="(max-width: 1024px) 100vw, 580px" className="object-cover object-[50%_40%] lg:object-[50%_60%]" />
          <div className="lg:hidden absolute inset-0 bg-gradient-to-t from-[#2B2620]/85 via-[#2B2620]/15 to-transparent" />
        </div>
        <div className="absolute inset-x-0 bottom-0 lg:static lg:order-1 flex items-end lg:items-center">
          <Reveal className="w-full max-w-[760px] lg:ml-auto px-5 sm:px-8 lg:px-16 pb-12 lg:py-20 text-white lg:text-[#2B2620]">
            <span className="inline-flex items-center gap-3 text-[10px] sm:text-[11px] uppercase tracking-[0.35em] text-[#F5E6C8] lg:text-[#8F6D2F]">
              <span className="w-8 h-px bg-current" />
              Туфли на шпильке · 37–44
            </span>
            <h2 className="mt-5 font-display uppercase text-[clamp(64px,9vw,148px)] leading-[0.82] tracking-[-0.03em]">
              Время
              <span className="block font-serif normal-case italic font-light tracking-normal text-[#E8C88A] lg:text-[#B8914A]">выделяться</span>
            </h2>
            <p className="mt-6 max-w-sm text-[15px] text-white/85 lg:text-[#2B2620]/70 leading-relaxed">
              Шаг, который слышно. Каблук, который держит. Пара, которую запоминают – вместе с тобой.
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
            <h2 className="font-display uppercase text-[clamp(44px,8vw,128px)] leading-[0.85] tracking-[-0.02em]">
              На каждый
              <span className="block font-serif normal-case italic font-light text-[#8F6D2F] tracking-normal">выход</span>
            </h2>
            <p className="max-w-xs text-sm text-[#2B2620]/60 leading-relaxed">
              Офис, свидание, бранч, вечеринка до утра. Для каждого сценария – своя пара, и в каждой ты главная.
            </p>
          </Reveal>

          <div className="hidden md:flex h-[72vh] min-h-[520px] gap-2">
            {panels.map((cat, i) => {
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
                  <div className={`absolute inset-x-0 bottom-6 flex flex-col items-center gap-4 transition-opacity duration-500 ${open ? "opacity-0" : "opacity-100"}`}>
                    <span className="font-display uppercase text-2xl tracking-[0.08em] [writing-mode:vertical-rl] rotate-180">{cat.name}</span>
                    <span className="text-[10px] font-semibold">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <div className={`absolute inset-x-0 top-0 p-7 transition-all duration-700 ${open ? "opacity-100 translate-y-0 delay-200" : "opacity-0 -translate-y-6"}`}>
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.3em] opacity-70">
                        {String(i + 1).padStart(2, "0")} · {PRODUCTS.filter((p) => p.categorySlug === cat.slug).length} моделей
                      </span>
                      <h3 className="font-display uppercase text-6xl xl:text-7xl leading-none mt-2 whitespace-nowrap">{cat.name}</h3>
                      <p className="font-serif italic text-xl mt-2 whitespace-nowrap">{CATEGORY_MOOD[cat.slug]}</p>
                    </div>
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
                    <div className="min-w-0">
                      <h3 className={`font-display uppercase leading-none ${wide ? "text-4xl" : "text-[22px]"}`}>{cat.name}</h3>
                      {wide && <p className="font-serif italic text-lg mt-1">{CATEGORY_MOOD[cat.slug]}</p>}
                    </div>
                    <ArrowUpRight size={18} className="shrink-0" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ───────────── 2. MARQUEE ───────────── */}
      <div className="bg-[#DAB16B] text-[#2B2620] py-4 sm:py-6 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-8 sm:gap-10 font-serif italic text-3xl sm:text-5xl font-light">
          {[...Array(4)].map((_, i) => (
            <React.Fragment key={i}>
              <span>Время выделяться</span>
              <span className="font-display not-italic text-xl sm:text-2xl">✦</span>
              <span>Твой рост – твоя сила</span>
              <span className="font-display not-italic text-xl sm:text-2xl">✦</span>
              <span>37 - 44</span>
              <span className="font-display not-italic text-xl sm:text-2xl">✦</span>
              <span>Натуральная кожа</span>
              <span className="font-display not-italic text-xl sm:text-2xl">✦</span>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* ───────────── 8. ANATOMY - three photo cards ───────────── */}
      <section className="bg-[#EAEAEA] py-16 lg:py-28">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
          <Reveal className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 mb-10 lg:mb-14">
            <div>
              <Eyebrow>Анатомия Tallora</Eyebrow>
              <h2 className="mt-5 font-serif font-light text-[clamp(40px,5.5vw,84px)] leading-[0.92] tracking-[-0.02em]">
                Сделано <span className="italic">для тебя</span>
              </h2>
            </div>
          </Reveal>
          <div className="flex md:grid md:grid-cols-3 gap-3 sm:gap-5 overflow-x-auto md:overflow-visible snap-x snap-mandatory no-scrollbar -mx-5 px-5 scroll-px-5 md:mx-0 md:px-0">
            {ANATOMY.map((f, i) => (
              <Reveal key={f.n} delay={i * 100} className="group snap-start shrink-0 w-[80vw] md:w-auto bg-white rounded-[28px] overflow-hidden flex flex-col">
                <div className="relative aspect-[4/5] overflow-hidden bg-[#E8E8E8]">
                  <Image src={f.img} alt={f.title} fill sizes="(max-width: 768px) 80vw, 33vw" style={{ objectPosition: f.pos }} className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105" />
                </div>
                <div className="p-6 sm:p-7 flex flex-col flex-1">
                  <h3 className="font-serif text-[28px] sm:text-3xl leading-tight">{f.title}</h3>
                  <p className="mt-3 text-[15px] text-[#2B2620]/65 leading-relaxed flex-1">{f.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── 9. SIZE CALCULATOR ───────────── */}
      <HomeSizeCalculator />

      {/* ───────────── 13. FOUNDER ───────────── */}
      <section className="bg-[#F3F3F3] py-16 lg:py-32 px-5 sm:px-8">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <Reveal className="lg:col-span-5 relative aspect-[4/5] rounded-[28px] overflow-hidden bg-[#E8E8E8]">
            <Image src={SITE_PHOTOS.founder} alt={`${CONTACTS.founder} - основательница Tallora`} fill sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover" />
            <span className="absolute bottom-4 left-4 glass-light text-[#2B2620] text-[10px] uppercase tracking-[0.2em] px-3 py-1.5 rounded-full">
              {CONTACTS.founder} · основательница
            </span>
          </Reveal>
          <Reveal delay={150} className="lg:col-span-7">
            <Eyebrow>Какое чувство дарит Tallora?</Eyebrow>
            <blockquote className="mt-6 font-serif font-light text-[clamp(34px,4.4vw,68px)] leading-[1.02] tracking-[-0.01em]">
              «Лёгкость. Спокойствие. Уверенность. То, что это её.{" "}
              <span className="italic text-[#8F6D2F]">Её стиль. Её размер. Её шаг.</span>»
            </blockquote>
            <p className="mt-8 text-[15px] text-[#2B2620]/65 leading-relaxed max-w-xl">
              Tallora родилась из личной истории Яны: красивые пары в магазинах заканчивались на 39 размере.
              Сегодня это бренд для женщин, которые выбирают – смело, со вкусом и по своему размеру.
            </p>
            <Link href="/about#interview" className="inline-flex items-center gap-3 mt-8 text-[11px] uppercase tracking-[0.22em] font-semibold border-b border-[#2B2620] pb-1 hover:text-[#8F6D2F] hover:border-[#DAB16B]">
              Читать интервью <ArrowRight size={14} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ───────────── 10. CLIENT VOICES ───────────── */}
      <section className="py-16 lg:py-28 bg-[#F5F0E8]">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
          <Reveal className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-10">
            <div>
              <Eyebrow>Из нашего Telegram</Eyebrow>
              <h2 className="mt-4 font-display uppercase text-[clamp(44px,7vw,110px)] leading-[0.85] tracking-[-0.02em]">
                Вы говорите
              </h2>
            </div>
            <a href="https://t.me/tallora" target="_blank" rel="noreferrer" className="self-start md:self-end text-[11px] uppercase tracking-[0.22em] font-semibold border-b border-[#2B2620] pb-1 hover:text-[#8F6D2F] hover:border-[#DAB16B]">
              Канал t.me/tallora →
            </a>
          </Reveal>
          <div className="flex sm:block gap-3 overflow-x-auto sm:overflow-visible snap-x snap-mandatory no-scrollbar -mx-5 px-5 scroll-px-5 sm:mx-0 sm:px-0 sm:columns-2 lg:columns-3 sm:gap-4 sm:[&>*]:mb-4">
            {CLIENT_VOICES.map((v, i) => (
              <Reveal key={i} delay={(i % 3) * 80} className="snap-start shrink-0 w-[82vw] sm:w-auto break-inside-avoid rounded-[24px] bg-white border border-[#2B2620]/8 p-6 sm:p-7 flex flex-col justify-between">
                <span className="font-serif text-6xl leading-[0.5] text-[#DAB16B] block h-6">“</span>
                <p className="font-serif text-[22px] sm:text-2xl leading-snug">{v.text}</p>
                <div className="mt-5 pt-4 border-t border-[#2B2620]/10 flex items-center justify-between gap-3 text-[10px] uppercase tracking-[0.2em]">
                  <span className="text-[#2B2620]/70">{v.who}</span>
                  <span className="text-[#8F6D2F] text-right">{v.product}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── 11. LOOKBOOK ───────────── */}
      <section className="py-16 lg:py-28">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
          <Reveal className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-8 sm:mb-12">
            <div>
              <Eyebrow>Образы Tallora</Eyebrow>
              <h2 className="mt-4 font-display uppercase text-[clamp(48px,9vw,148px)] leading-[0.82] tracking-[-0.02em]">
                Lookbook
              </h2>
            </div>
            <Link href="/lookbook" className="self-start md:self-end text-[11px] uppercase tracking-[0.22em] font-semibold border-b border-[#2B2620] pb-1 hover:text-[#8F6D2F] hover:border-[#DAB16B]">
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
              <span className="absolute top-4 left-4 bg-white/80 backdrop-blur-md text-[#2B2620] text-[10px] uppercase tracking-[0.2em] px-3 py-1.5 rounded-full">
                {byId(item.featuredProductId)?.name ?? "Tallora"}
              </span>
              <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 text-[#F3F3F3]">
                <span className="font-display text-xs tracking-[0.3em] text-[#E3C78F]">0{i + 1} - Tallora</span>
                <h3 className="font-serif italic text-3xl sm:text-4xl leading-none mt-2">{item.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ───────────── 12. SHOWROOM & COMMUNITY ───────────── */}
      <section className="bg-white py-16 lg:py-28 px-5 sm:px-8">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <Reveal className="lg:col-span-6 relative aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5] rounded-[28px] overflow-hidden bg-[#E8E8E8]">
            <Image src={SITE_PHOTOS.friends} alt="Три девушки в обуви Tallora на Красной площади" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover object-[50%_60%]" />
          </Reveal>
          <div className="lg:col-span-6">
            <Reveal>
              <Eyebrow>Примерка вживую · Москва</Eyebrow>
              <h2 className="mt-5 font-serif font-light text-[clamp(44px,6vw,96px)] leading-[0.9] tracking-[-0.02em]">
                Приходи <span className="italic text-[#B8914A]">примерить</span>
              </h2>
              <p className="mt-6 text-[15px] text-[#2B2620]/70 leading-relaxed max-w-lg">
                Вся коллекция и все размеры ждут тебя в шоуруме. А ещё у нас свои вечеринки: клиентские дни
                на складе, мастер-классы по дефиле и осанке для высоких девушек, съёмки и красивая компания.
              </p>
            </Reveal>
            <Reveal delay={120} className="mt-8 rounded-[24px] bg-[#F5F0E8] p-6 sm:p-7 space-y-4">
              <h3 className="font-display uppercase text-2xl tracking-[0.04em]">{SHOWROOM.name}</h3>
              <div className="flex gap-3 text-sm">
                <MapPin size={18} className="text-[#8F6D2F] shrink-0 mt-0.5" />
                <div>
                  <span className="block font-medium">{SHOWROOM.address}</span>
                  <span className="block text-[#2B2620]/60">{SHOWROOM.metro}</span>
                  <span className="block text-[#2B2620]/60 text-xs mt-1 leading-relaxed">{SHOWROOM.hint}</span>
                </div>
              </div>
              <div className="flex gap-3 text-sm">
                <Clock size={18} className="text-[#8F6D2F] shrink-0" />
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

        <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 w-full -mt-16 pb-14 lg:mt-0 lg:py-24">
          <Reveal>
            <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.35em] text-[#8F6D2F] mb-5">
              <Sparkles size={13} /> Закрытый клуб для своих
            </span>
            <h2 className="font-display uppercase leading-[0.8] tracking-[-0.03em] text-[clamp(88px,17vw,280px)]">Privé</h2>
            <p className="font-serif italic text-[28px] sm:text-4xl font-light mt-4 max-w-xl">
              Первой – к новинкам. Первой – к распродаже. Всегда – со скидкой.
            </p>
            <div className="mt-8 grid grid-cols-3 max-w-xl border-y border-[#2B2620]/15">
              {[
                ["−5%", "на первый заказ"],
                ["до 10%", "бонусами с покупок"],
                ["Early", "доступ к коллекциям"],
              ].map(([v, l]) => (
                <div key={l} className="py-5 pr-3 border-r border-[#2B2620]/15 last:border-r-0 [&:not(:first-child)]:pl-3 sm:[&:not(:first-child)]:pl-4">
                  <span className="font-display text-[28px] sm:text-4xl block">{v}</span>
                  <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.16em] text-[#2B2620]/60 leading-tight block">{l}</span>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <ArrowPill href="/prive">Вступить в клуб</ArrowPill>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
