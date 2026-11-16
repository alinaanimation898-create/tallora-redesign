"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Trash2, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { useShop } from "@/context/ShopContext";

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    cartTotal,
    cartCount,
    isPriveMember,
  } = useShop();

  const cartPairs = cartCount;

  if (!isCartOpen) return null;

  // 5% prive discount mock
  const priveDiscount = isPriveMember ? Math.round(cartTotal * 0.05) : 0;
  const finalTotal = cartTotal - priveDiscount;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fadeIn">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-[#2B2620]/45 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FFFFFF] border-l border-[#E2E2E2] shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-5 border-b border-[#E2E2E2] flex items-center justify-between bg-[#F3F3F3]">
            <div className="flex items-center gap-2">
              <h2 className="font-serif text-lg tracking-wider uppercase text-[#2B2620]">
                Корзина
              </h2>
              <span className="text-xs text-[#2B2620]/60">({cartCount} шт.)</span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="text-[#2B2620]/60 hover:text-[#8F6D2F] transition-colors p-1"
              aria-label="Закрыть"
            >
              <X size={22} />
            </button>
          </div>

          {/* Delivery progress bar */}
          <div className="bg-[#EFE6D6] text-[#2B2620] px-5 py-2.5 text-[11px] flex items-center justify-between">
            {cartPairs >= 3 ? (
              <span className="text-[#8F6D2F] flex items-center gap-1.5 font-medium">
                <ShieldCheck size={14} /> По Москве — бесплатная доставка и примерка
              </span>
            ) : (
              <span>
                Ещё {3 - cartPairs} {3 - cartPairs === 1 ? "пара" : "пары"} — и доставка по Москве бесплатно, с примеркой
              </span>
            )}
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <p className="font-serif text-xl text-[#2B2620]/70">В корзине пока пусто</p>
                <p className="text-xs text-[#2B2620]/50 max-w-xs mx-auto">
                  Выберите вашу идеальную пару в каталоге или воспользуйтесь подбором размера
                </p>
                <Link
                  href="/catalog"
                  onClick={() => setIsCartOpen(false)}
                  className="inline-block bg-[#DAB16B] text-[#2B2620] px-6 py-3 text-xs uppercase tracking-[0.2em] hover:bg-[#C99B4F] transition-colors"
                >
                  В каталог
                </Link>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedSize}`}
                  className="flex gap-4 p-3 bg-white border border-[#E2E2E2] rounded-xs"
                >
                  <div className="relative w-20 h-24 bg-[#EAEAEA] shrink-0 border border-[#E2E2E2] overflow-hidden">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <Link
                          href={`/catalog/${item.product.slug}`}
                          onClick={() => setIsCartOpen(false)}
                          className="font-serif text-sm text-[#2B2620] hover:text-[#8F6D2F] line-clamp-1"
                        >
                          {item.product.name}
                        </Link>
                        <button
                          onClick={() => removeFromCart(item.product.id, item.selectedSize)}
                          className="text-gray-400 hover:text-[#8F6D2F] transition-colors p-1"
                          aria-label="Удалить"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>

                      <div className="flex items-center gap-2 mt-1 text-xs">
                        <span className="font-semibold px-2 py-0.5 bg-[#F3F3F3] border border-[#E2E2E2] text-[#8F6D2F]">
                          Размер: {item.selectedSize}
                        </span>
                        <span className="text-[#888888]">{item.product.heelHeight}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#F0ECE1]">
                      {/* Quantity counter */}
                      <div className="flex items-center border border-[#E2E2E2]">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.selectedSize, -1)}
                          className="w-6 h-6 flex items-center justify-center text-xs hover:bg-[#F3F3F3]"
                        >
                          -
                        </button>
                        <span className="w-7 text-center text-xs font-mono">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.selectedSize, 1)}
                          className="w-6 h-6 flex items-center justify-center text-xs hover:bg-[#F3F3F3]"
                        >
                          +
                        </button>
                      </div>

                      <span className="font-serif text-sm font-bold text-[#2B2620]">
                        {(item.product.price * item.quantity).toLocaleString("ru-RU")} ₽
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout button */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-[#E2E2E2] bg-[#F3F3F3] space-y-3">
              {isPriveMember && (
                <div className="flex justify-between items-center text-xs text-[#8F6D2F] bg-[#DAB16B]/10 p-2.5 border border-[#DAB16B]/30">
                  <span className="flex items-center gap-1 font-medium">
                    <Sparkles size={13} /> Скидка TALLORA PRIVÉ (5%):
                  </span>
                  <span className="font-semibold">- {priveDiscount.toLocaleString("ru-RU")} ₽</span>
                </div>
              )}

              <div className="flex justify-between items-baseline pt-1">
                <span className="text-xs uppercase tracking-wider text-[#2B2620]/70">Итого к оплате:</span>
                <span className="font-serif text-2xl font-bold text-[#2B2620]">
                  {finalTotal.toLocaleString("ru-RU")} ₽
                </span>
              </div>

              <p className="text-[10px] text-[#888888] text-center">
                СДЭК по всей России · Возврат 14 дней
              </p>

              <Link
                href="/checkout"
                onClick={() => setIsCartOpen(false)}
                className="w-full bg-[#DAB16B] hover:bg-[#C99B4F] text-[#2B2620] py-4 px-6 text-xs uppercase tracking-[0.2em] font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg"
              >
                <span>Оформить заказ в 1 клик</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
