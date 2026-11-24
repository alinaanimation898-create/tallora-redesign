"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ShoppingBag, Ruler, Menu, X, ChevronDown } from "lucide-react";
import { useShop } from "@/context/ShopContext";
import Logo from "@/components/Logo";
import { ShoeSize } from "@/types";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const {
    selectedSize,
    setSelectedSize,
    cartCount,
    setIsCartOpen,
    setIsSizeModalOpen,
  } = useShop();

  /** Picking a size anywhere in the header opens the catalog filtered by it. */
  const pickSize = (sz: ShoeSize) => {
    setSelectedSize(sz);
    setSizeDropdownOpen(false);
    setMobileMenuOpen(false);
    router.push("/catalog");
  };

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sizeDropdownOpen, setSizeDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isHome = pathname === "/";
  const onDark = false;
  void scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: "/catalog", label: "Каталог" },
    { href: "/lookbook", label: "Lookbook" },
    { href: "/size-guide", label: "Размеры" },
    { href: "/prive", label: "Privé" },
    { href: "/about", label: "О бренде" },
  ];

  const sizes: ShoeSize[] = [37, 38, 39, 40, 41, 42, 43, 44];

  const ink = onDark ? "text-[#F3F3F3]" : "text-[#2B2620]";

  return (
    <header className={`${isHome ? "fixed" : "sticky"} top-0 inset-x-0 z-40 w-full`}>
      {/* Micro ticker */}
      <div className="bg-[#EFE6D6] text-[#2B2620]/80 text-[10px] tracking-[0.28em] uppercase py-2 overflow-hidden">
        <div className="animate-marquee-slow whitespace-nowrap flex gap-12">
          {[...Array(2)].map((_, k) => (
            <div key={k} className="flex gap-12 shrink-0">
              {[...Array(3)].map((__, i) => (
                <React.Fragment key={i}>
                  <span>Размеры 37 - 44</span>
                  <span className="text-[#20402D]">●</span>
                  <button onClick={() => setIsSizeModalOpen(true)} className="uppercase hover:text-[#20402D] cursor-pointer">
                    Калькулятор стопы
                  </button>
                  <span className="text-[#20402D]">●</span>
                  <span>Доставка СДЭК по всей России</span>
                  <span className="text-[#20402D]">●</span>
                  <span className="text-[#20402D]">−5% на первый заказ в клубе Tallora Privé</span>
                  <span className="text-[#20402D]">●</span>
                </React.Fragment>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[#FFFFFF]/88 backdrop-blur-xl border-b border-[#2B2620]/8">
        <div className="max-w-[1400px] mx-auto h-14 sm:h-16 flex items-center justify-between px-3 sm:px-8">
          {/* Left: burger + nav */}
          <div className="flex items-center gap-6 flex-1">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden p-2 ${ink}`}
              aria-label="Меню"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            <nav className={`hidden lg:flex items-center gap-1 text-[11px] uppercase tracking-[0.2em] font-medium ${ink}`}>
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3.5 py-2 rounded-full transition-colors ${
                      isActive
                        ? onDark
                          ? "bg-[#F3F3F3] text-[#2B2620]"
                          : "bg-[#20402D] text-white"
                        : onDark
                        ? "hover:bg-white/10"
                        : "hover:bg-[#2B2620]/5"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Center: logo */}
          <Link href="/" aria-label="Tallora - на главную" className={`flex items-center hover:text-[#20402D] transition-colors ${ink}`}>
            <Logo className="h-[20px] sm:h-[28px] w-auto" />
          </Link>

          {/* Right: size, Vera, cart */}
          <div className="flex items-center justify-end gap-1.5 sm:gap-2 flex-1">
            <div className="relative hidden sm:block">
              <button
                onClick={() => setSizeDropdownOpen(!sizeDropdownOpen)}
                className={`flex items-center gap-1.5 pl-3 pr-2.5 h-10 rounded-full text-[11px] tracking-[0.16em] uppercase font-medium transition-all border ${
                  onDark
                    ? "border-white/25 text-[#F3F3F3] hover:bg-white/10"
                    : "border-[#2B2620]/15 text-[#2B2620] hover:border-[#2B2620]"
                }`}
              >
                <Ruler size={13} className="text-[#183326]" />
                <span>{selectedSize ? `Размер ${selectedSize}` : "Подобрать размер"}</span>
                <ChevronDown size={12} className="opacity-60" />
              </button>

              {sizeDropdownOpen && (
                <div className="absolute right-0 mt-3 w-60 bg-[#FFFFFF] border border-[#2B2620]/10 shadow-2xl p-4 rounded-2xl z-50 animate-fadeIn">
                  <p className="text-[10px] tracking-[0.2em] uppercase text-[#2B2620]/50 mb-3">
                    Показывать мой размер
                  </p>
                  <div className="grid grid-cols-4 gap-1.5 mb-3">
                    {sizes.map((sz) => (
                      <button
                        key={sz}
                        onClick={() => pickSize(sz)}
                        className={`h-10 rounded-full font-display text-base transition-colors ${
                          selectedSize === sz
                            ? "bg-[#20402D] text-white"
                            : "border border-[#2B2620]/12 hover:border-[#2B2620] text-[#2B2620]"
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => {
                      setSizeDropdownOpen(false);
                      setIsSizeModalOpen(true);
                    }}
                    className="w-full text-center text-[10px] tracking-[0.18em] uppercase text-[#20402D] hover:underline pt-3 border-t border-[#2B2620]/8"
                  >
                    Посчитать размер в см
                  </button>
                </div>
              )}
            </div>


            <button
              onClick={() => setIsCartOpen(true)}
              className={`relative w-10 h-10 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                "bg-[#20402D] text-white hover:bg-[#183326]"
              }`}
              aria-label="Корзина"
            >
              <ShoppingBag size={17} strokeWidth={1.8} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 rounded-full bg-[#2B2620] text-white text-[10px] font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden mx-3 mt-2 rounded-3xl bg-white max-h-[calc(100svh-120px)] overflow-y-auto text-[#2B2620] border border-[#2B2620]/8 px-6 py-7 animate-fadeIn shadow-2xl">
          <nav className="flex flex-col">
            {navLinks.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-baseline justify-between py-2 border-b border-[#2B2620]/10 group"
              >
                <span className="font-display uppercase text-4xl tracking-tight group-hover:text-[#20402D] transition-colors">
                  {link.label}
                </span>
                <span className="font-display text-sm text-[#20402D]">0{i + 1}</span>
              </Link>
            ))}
          </nav>

          <div className="mt-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#2B2620]/55">Твой размер</span>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsSizeModalOpen(true);
                }}
                className="text-[10px] tracking-[0.18em] uppercase text-[#20402D] underline"
              >
                Как измерить?
              </button>
            </div>
            <div className="grid grid-cols-4 gap-1.5">
              {sizes.map((sz) => (
                <button
                  key={sz}
                  onClick={() => pickSize(sz)}
                  className={`h-11 rounded-full font-display text-base transition-all ${
                    selectedSize === sz ? "bg-[#20402D] text-white" : "border border-[#2B2620]/15"
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>

        </div>
      )}
    </header>
  );
}
