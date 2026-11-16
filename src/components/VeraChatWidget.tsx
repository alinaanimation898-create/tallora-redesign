"use client";

import React, { useState, useRef, useEffect } from "react";
import { Sparkles, X, Send, Bot, User, ArrowRight, Check } from "lucide-react";
import { useShop } from "@/context/ShopContext";
import Link from "next/link";

interface Message {
  id: string;
  sender: "vera" | "user";
  text: string;
  time: string;
  action?: {
    type: "size" | "catalog" | "prive";
    label: string;
    value?: any;
  };
}

export default function VeraChatWidget() {
  const { isVeraOpen, setIsVeraOpen, setSelectedSize, setIsSizeModalOpen } = useShop();
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "vera",
      text: "Привет! Я Вера - персональный стилист TALLORA. Помогу подобрать размер от 37 до 44, высоту каблука и модель под ваш образ. Чем могу помочь?",
      time: "только что",
    },
  ]);

  const quickPrompts = [
    "Помоги определить мой размер",
    "Какой каблук выбрать на каждый день?",
    "Подбери модель на вечер",
    "Как работает доставка и возврат?",
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isVeraOpen]);

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: query,
      time: "только что",
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput("");

    // Simulate Vera's intelligent fashion response
    setTimeout(() => {
      let replyText = "Хороший вопрос! Вся наша обувь - из натуральной кожи и замши, размеры от 37 до 44. У каждой модели указана длина стельки для каждого размера. Если нужен живой ответ - напишите нам в Telegram или позвоните: +7 (996) 666-62-49.";
      let action: Message["action"] = undefined;

      const lower = query.toLowerCase();
      if (lower.includes("размер") || lower.includes("см") || lower.includes("длин")) {
        replyText = "Встаньте на лист бумаги, обведите стопу и измерьте расстояние от пятки до большого пальца. Сравните с длиной стельки в карточке модели - между носком и пальцами должно остаться около 5 мм. Давайте откроем калькулятор?";
        action = {
          type: "size",
          label: "Открыть калькулятор стопы",
        };
      } else if (lower.includes("каблук") || lower.includes("рост")) {
        replyText = "Для повседневной носки удобнее 3–5 см - например, туфли Leila на 5 см. Для вечера - 7–9 см: туфли Lana (7 см) или Alla (9 см). Если привыкли к плоской подошве, посмотрите балетки и лоферы.";
        action = {
          type: "catalog",
          label: "Смотреть туфли",
        };
      } else if (lower.includes("вечер") || lower.includes("свидан") || lower.includes("образ")) {
        replyText = "Для вечера рекомендую босоножки Bella или Sindi на каблуке 11 см - в красном, белом или голубом. С платьем миди или брючным костюмом - то, что нужно!";
        action = {
          type: "catalog",
          label: "Смотреть вечернюю капсулу",
        };
      } else if (lower.includes("обмен") || lower.includes("возврат") || lower.includes("доставк")) {
        replyText = "Доставляем по всей России через СДЭК (2–6 дней), по Москве - курьером за 700 ₽, от 3 пар бесплатно и с примеркой. Вернуть пару можно в течение 14 дней, если на ней нет следов носки.";
      }

      const veraReply: Message = {
        id: (Date.now() + 1).toString(),
        sender: "vera",
        text: replyText,
        time: "только что",
        action,
      };

      setMessages((prev) => [...prev, veraReply]);
    }, 600);
  };

  return (
    <>
      {/* Floating Trigger Button in bottom-right corner */}
      {!isVeraOpen && (
        <button
          onClick={() => setIsVeraOpen(true)}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 bg-white text-[#2B2620] px-4 py-3 rounded-full shadow-[0_12px_40px_-12px_rgba(43,38,32,0.35)] border border-[#2B2620]/8 hover:border-[#DAB16B] transition-all group cursor-pointer"
          aria-label="Вера, стилист TALLORA"
        >
          <div className="relative">
            <span className="w-8 h-8 rounded-full bg-[#DAB16B] flex items-center justify-center text-[#2B2620] text-xs font-serif font-bold">
              В
            </span>
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white" />
          </div>
          <div className="text-left hidden sm:block">
            <span className="block text-xs font-semibold tracking-wide">
              <span className="text-[#8F6D2F] font-normal">Стилист</span> Вера
            </span>
            <span className="block text-[10px] text-[#2B2620]/55">
              Подбор размера & образа
            </span>
          </div>
          <Sparkles size={16} className="text-[#B8914A] group-hover:rotate-12 transition-transform" />
        </button>
      )}

      {/* Chat Window Drawer / Popover */}
      {isVeraOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[92vw] sm:w-[420px] h-[580px] max-h-[85vh] bg-[#FFFFFF] border border-[#E2E2E2] shadow-2xl rounded-sm flex flex-col overflow-hidden animate-fadeIn">
          {/* Header */}
          <div className="bg-[#EFE6D6] text-[#2B2620] p-4 flex items-center justify-between border-b border-[#E2E2E2]">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-[#DAB16B] flex items-center justify-center font-serif text-base text-[#2B2620] font-bold">
                  В
                </div>
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-[#2B2620]" />
              </div>
              <div>
                <h3 className="font-serif text-sm tracking-wider uppercase text-[#2B2620]">
                  Стилист Вера
                </h3>
                <p className="text-[10px] text-[#8F6D2F] tracking-widest uppercase">
                  Подбор размера и образа 37–44
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsVeraOpen(false)}
              className="text-[#2B2620]/70 hover:text-[#2B2620] transition-colors p-1"
              aria-label="Закрыть чат"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs bg-[#F3F3F3]/60">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.sender === "vera" && (
                  <div className="w-6 h-6 rounded-full bg-[#DAB16B] text-[#2B2620] font-serif text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    В
                  </div>
                )}
                <div
                  className={`max-w-[80%] p-3 rounded-sm leading-relaxed shadow-xs ${
                    msg.sender === "user"
                      ? "bg-[#DAB16B] text-[#2B2620]"
                      : "bg-[#FFFFFF] text-[#2B2620] border border-[#E2E2E2]"
                  }`}
                >
                  <p>{msg.text}</p>
                  {msg.action && (
                    <div className="mt-2.5 pt-2 border-t border-[#E2E2E2]">
                      {msg.action.type === "size" && (
                        <button
                          onClick={() => {
                            setIsVeraOpen(false);
                            setIsSizeModalOpen(true);
                          }}
                          className="w-full text-center py-1.5 px-3 bg-[#DAB16B] text-[#2B2620] text-[11px] font-medium tracking-wider uppercase hover:bg-[#C99B4F] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <span>{msg.action.label}</span>
                          <ArrowRight size={12} />
                        </button>
                      )}
                      {msg.action.type === "catalog" && (
                        <Link
                          href="/catalog"
                          onClick={() => setIsVeraOpen(false)}
                          className="w-full text-center py-1.5 px-3 bg-[#DAB16B] text-[#2B2620] text-[11px] font-medium tracking-wider uppercase hover:bg-[#C99B4F] transition-colors flex items-center justify-center gap-1.5"
                        >
                          <span>{msg.action.label}</span>
                          <ArrowRight size={12} />
                        </Link>
                      )}
                    </div>
                  )}
                  <span className="text-[9px] text-right block mt-1 opacity-60">
                    {msg.time}
                  </span>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick prompt chips */}
          <div className="p-2.5 bg-[#FFFFFF] border-t border-[#E2E2E2] overflow-x-auto flex gap-1.5 no-scrollbar">
            {quickPrompts.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSend(prompt)}
                className="whitespace-nowrap px-2.5 py-1 text-[10px] border border-[#D4D4D4] bg-[#FFFFFF] rounded-full text-[#2B2620] hover:border-[#DAB16B] hover:text-[#8F6D2F] transition-colors shrink-0"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-[#FFFFFF] border-t border-[#E2E2E2] flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Напишите вопрос Вере..."
              className="flex-1 bg-white border border-[#D4D4D4] px-3 py-2 text-xs text-[#2B2620] placeholder:text-[#999999] focus:outline-none focus:border-[#DAB16B] rounded-xl"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="bg-[#DAB16B] disabled:opacity-40 text-[#2B2620] p-2 hover:bg-[#C99B4F] transition-colors cursor-pointer"
              aria-label="Отправить"
            >
              <Send size={15} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
