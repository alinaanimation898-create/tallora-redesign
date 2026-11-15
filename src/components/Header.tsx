"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, Ruler, Menu, X, Sparkles, ChevronDown } from "lucide-react";
import { useShop } from "@/context/ShopContext";
import { ShoeSize } from "@/types";

export default function Header() {
  const pathname = usePathname();
  const {
    selectedSize,
    setSelectedSize,
    cartCount,
    setIsCartOpen,
    setIsSizeModalOpen,
    setIsVeraOpen,
  } = useShop();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sizeDropdownOpen, setSizeDropdownOpen] = useState(false);

  const navLinks = [
    { href: "/catalog", label: "Каталог" },
    { href: "/lookbook", label: "Lookbook" },
    { href: "/size-guide", label: "Гид по размерам" },
    { href: "/prive", label: "Клуб PRIVÉ" },
    { href: "/about", label: "О бренде" },
  ];

  const sizes: ShoeSize[] = [39, 40, 41, 42, 43, 44];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#F4EFE8]/90 backdrop-blur-md border-b border-[#E2D9CC] transition-all">
      {/* Top micro bar for high fashion alert */}
      <div className="bg-[#0E0E0E] text-[#F4EFE8] text-[11px] tracking-[0.2em] uppercase py-1.5 px-4 text-center flex items-center justify-center gap-3">
        <span>Бесплатный обмен размера по РФ</span>
        <span className="opacity-40">|</span>
        <button
          onClick={() => setIsSizeModalOpen(true)}
          className="underline hover:text-[#C9B8A3] transition-colors cursor-pointer"
        >
          Калькулятор стопы (39–44)
        </button>
        <span className="opacity-40 hidden sm:inline">|</span>
        <span className="text-[#C9B8A3] hidden sm:inline">-5% на первый заказ в TALLORA PRIVÉ</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Left: Mobile hamburger & desktop main links */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#0E0E0E] hover:text-[#6B0F1A]"
            aria-label="Меню"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <nav className="hidden lg:flex items-center space-x-7 text-xs uppercase tracking-[0.18em] font-medium text-[#0E0E0E]/80">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`hover:text-[#6B0F1A] transition-colors relative py-1 ${
                    isActive ? "text-[#6B0F1A] font-semibold" : ""
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#6B0F1A]" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Center: Brand Logo */}
        <div className="text-center">
          <Link href="/" className="group inline-block">
            <h1 className="font-serif text-3xl sm:text-4xl tracking-[0.22em] font-medium text-[#0E0E0E] uppercase group-hover:text-[#6B0F1A] transition-colors">
              TALLORA
            </h1>
            <p className="text-[9px] tracking-[0.35em] text-[#6B0F1A] font-semibold uppercase -mt-0.5">
              39 — 44
            </p>
          </Link>
        </div>

        {/* Right: Size selector pill, Vera stylist trigger, Cart */}
        <div className="flex items-center gap-3 sm:gap-5">
          {/* Persistent Selected Size Dropdown / Button */}
          <div className="relative hidden sm:block">
            <button
              onClick={() => setSizeDropdownOpen(!sizeDropdownOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 border border-[#0E0E0E]/20 rounded-full text-xs tracking-wider uppercase hover:border-[#6B0F1A] transition-all bg-[#F9F6F0]"
            >
              <Ruler size={13} className="text-[#6B0F1A]" />
              <span className="font-medium text-[#0E0E0E]">
                {selectedSize ? `Размер: ${selectedSize}` : "Мой размер"}
              </span>
              <ChevronDown size={12} className="text-[#0E0E0E]/60" />
            </button>

            {sizeDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-[#F9F6F0] border border-[#E2D9CC] shadow-xl p-3 rounded-sm z-50 animate-fadeIn">
                <p className="text-[10px] tracking-widest uppercase text-[#0E0E0E]/60 mb-2">
                  Фильтровать каталог:
                </p>
                <div className="grid grid-cols-3 gap-1.5 mb-2">
                  {sizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => {
                        setSelectedSize(sz === selectedSize ? null : sz);
                        setSizeDropdownOpen(false);
                      }}
                      className={`py-1 text-xs font-serif transition-colors rounded ${
                        selectedSize === sz
                          ? "bg-[#6B0F1A] text-[#F4EFE8]"
                          : "border border-[#E2D9CC] hover:border-[#0E0E0E] text-[#0E0E0E]"
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
                  className="w-full text-center text-[10px] tracking-wider uppercase text-[#6B0F1A] hover:underline pt-1 border-t border-[#E2D9CC]"
                >
                  Калькулятор стопы (см)
                </button>
              </div>
            )}
          </div>

          {/* Quick AI Stylist button */}
          <button
            onClick={() => setIsVeraOpen(true)}
            className="hidden md:flex items-center gap-1.5 text-xs text-[#0E0E0E]/80 hover:text-[#6B0F1A] transition-colors"
            title="Спросить стилиста Веру"
          >
            <Sparkles size={15} className="text-[#6B0F1A]" />
            <span className="hidden xl:inline tracking-wider uppercase text-[11px]">Вера</span>
          </button>

          {/* Cart Icon & Badge */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-[#0E0E0E] hover:text-[#6B0F1A] transition-colors cursor-pointer"
            aria-label="Корзина"
          >
            <ShoppingBag size={21} strokeWidth={1.7} />
            {cartCount > 0 && (
              <span className="absolute top-1 right-0 w-4 h-4 rounded-full bg-[#6B0F1A] text-[#F4EFE8] text-[9px] font-bold flex items-center justify-center animate-pulse">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#F9F6F0] border-b border-[#E2D9CC] px-6 py-6 animate-fadeIn">
          {/* Mobile size selector bar */}
          <div className="mb-6 pb-5 border-b border-[#E2D9CC]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] tracking-widest uppercase font-medium text-[#0E0E0E]/70">
                Твой размер:
              </span>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsSizeModalOpen(true);
                }}
                className="text-[11px] tracking-wider uppercase text-[#6B0F1A] underline"
              >
                Как измерить стопу?
              </button>
            </div>
            <div className="grid grid-cols-6 gap-2">
              {sizes.map((sz) => (
                <button
                  key={sz}
                  onClick={() => {
                    setSelectedSize(selectedSize === sz ? null : sz);
                  }}
                  className={`py-2 text-sm font-serif border text-center transition-all ${
                    selectedSize === sz
                      ? "bg-[#6B0F1A] text-[#F4EFE8] border-[#6B0F1A]"
                      : "border-[#E2D9CC] bg-[#F4EFE8] text-[#0E0E0E]"
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>

          <nav className="flex flex-col space-y-4 text-sm uppercase tracking-[0.2em] font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-[#0E0E0E] hover:text-[#6B0F1A] py-1 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsVeraOpen(true);
              }}
              className="text-left text-[#6B0F1A] py-1 flex items-center gap-2 uppercase tracking-[0.2em]"
            >
              <Sparkles size={16} />
              ИИ-стилист Вера
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
