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
      text: "Привет! Я Вера — персональный стилист TALLORA. Я знаю всё о том, как посадить обувь 39–44 на длинную стопу и подобрать идеальный каблук под высокий рост. Чем могу помочь?",
      time: "только что",
    },
  ]);

  const quickPrompts = [
    "Помоги определить мой размер",
    "Каблук при росте 182 см — не будет перебора?",
    "Подбери модель на вечер",
    "Как работает бесплатный обмен?",
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
      let replyText = "Прекрасный выбор! Вся наша обувь спроектирована специально под пропорции высокой фигуры. Мы не используем пластик, а центр тяжести смещен точно под пятку.";
      let action: Message["action"] = undefined;

      const lower = query.toLowerCase();
      if (lower.includes("размер") || lower.includes("см") || lower.includes("длин")) {
        replyText = "Чтобы размер сел идеально, измерьте длину стопы в см. Например, при 27.2 см мы рекомендуем 42 размер, а при 28 см — 43. Давайте откроем калькулятор?";
        action = {
          type: "size",
          label: "Открыть калькулятор стопы",
        };
      } else if (lower.includes("каблук") || lower.includes("рост")) {
        replyText = "Каблук при высоком росте — это про осанку и власть, а не про прибавку сантиметров! Обратите внимание на наши лодочки Mia (8.5 см) или мюли Stella (6.5 см): колодка держит стопу без завала вперед.";
        action = {
          type: "catalog",
          label: "Смотреть туфли Mia",
        };
      } else if (lower.includes("вечер") || lower.includes("свидан") || lower.includes("образ")) {
        replyText = "Для эффектного вечернего образа рекомендую лаковые лодочки Vivienne глубокого винного цвета или мюли Stella. С черным платьем или брючным костюмом вы будете неотразимы!";
        action = {
          type: "catalog",
          label: "Смотреть вечернюю капсулу",
        };
      } else if (lower.includes("обмен") || lower.includes("возврат") || lower.includes("доставк")) {
        replyText = "У нас 100% бесплатный обмен размера! Курьер привезет нужную пару, или вы можете обменять в СДЭК без доплат. Никакого риска не угадать.";
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
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 bg-[#0E0E0E] text-[#F4EFE8] px-4 py-3 rounded-full shadow-2xl border border-[#C9B8A3]/40 hover:border-[#6B0F1A] hover:bg-[#1A1A1A] transition-all group cursor-pointer"
          aria-label="Вера, стилист TALLORA"
        >
          <div className="relative">
            <span className="w-8 h-8 rounded-full bg-[#6B0F1A] flex items-center justify-center text-[#F4EFE8] text-xs font-serif font-bold">
              В
            </span>
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-[#0E0E0E]" />
          </div>
          <div className="text-left hidden sm:block">
            <span className="block text-xs font-semibold tracking-wide">
              Вера <span className="text-[#C9B8A3] font-normal">· стилист TALLORA</span>
            </span>
            <span className="block text-[10px] text-[#A8957F]">
              Подбор размера & образа
            </span>
          </div>
          <Sparkles size={16} className="text-[#C9B8A3] group-hover:rotate-12 transition-transform" />
        </button>
      )}

      {/* Chat Window Drawer / Popover */}
      {isVeraOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[92vw] sm:w-[420px] h-[580px] max-h-[85vh] bg-[#F9F6F0] border border-[#E2D9CC] shadow-2xl rounded-sm flex flex-col overflow-hidden animate-fadeIn">
          {/* Header */}
          <div className="bg-[#0E0E0E] text-[#F4EFE8] p-4 flex items-center justify-between border-b border-[#222222]">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-[#6B0F1A] flex items-center justify-center font-serif text-base text-[#F4EFE8] font-bold">
                  В
                </div>
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-[#0E0E0E]" />
              </div>
              <div>
                <h3 className="font-serif text-sm tracking-wider uppercase text-[#F4EFE8]">
                  Вера · Fashion-стилист
                </h3>
                <p className="text-[10px] text-[#C9B8A3] tracking-widest uppercase">
                  ИИ-эксперт по колодкам 39–44
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsVeraOpen(false)}
              className="text-[#F4EFE8]/70 hover:text-[#F4EFE8] transition-colors p-1"
              aria-label="Закрыть чат"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs bg-[#F4EFE8]/60">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.sender === "vera" && (
                  <div className="w-6 h-6 rounded-full bg-[#6B0F1A] text-[#F4EFE8] font-serif text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    В
                  </div>
                )}
                <div
                  className={`max-w-[80%] p-3 rounded-sm leading-relaxed shadow-xs ${
                    msg.sender === "user"
                      ? "bg-[#0E0E0E] text-[#F4EFE8]"
                      : "bg-[#FFFFFF] text-[#0E0E0E] border border-[#E2D9CC]"
                  }`}
                >
                  <p>{msg.text}</p>
                  {msg.action && (
                    <div className="mt-2.5 pt-2 border-t border-[#E2D9CC]">
                      {msg.action.type === "size" && (
                        <button
                          onClick={() => {
                            setIsVeraOpen(false);
                            setIsSizeModalOpen(true);
                          }}
                          className="w-full text-center py-1.5 px-3 bg-[#6B0F1A] text-[#F4EFE8] text-[11px] font-medium tracking-wider uppercase hover:bg-[#8E1624] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <span>{msg.action.label}</span>
                          <ArrowRight size={12} />
                        </button>
                      )}
                      {msg.action.type === "catalog" && (
                        <Link
                          href="/catalog"
                          onClick={() => setIsVeraOpen(false)}
                          className="w-full text-center py-1.5 px-3 bg-[#0E0E0E] text-[#F4EFE8] text-[11px] font-medium tracking-wider uppercase hover:bg-[#6B0F1A] transition-colors flex items-center justify-center gap-1.5"
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
          <div className="p-2.5 bg-[#F9F6F0] border-t border-[#E2D9CC] overflow-x-auto flex gap-1.5 no-scrollbar">
            {quickPrompts.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSend(prompt)}
                className="whitespace-nowrap px-2.5 py-1 text-[10px] border border-[#D4C7B5] bg-[#FFFFFF] rounded-full text-[#0E0E0E] hover:border-[#6B0F1A] hover:text-[#6B0F1A] transition-colors shrink-0"
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
            className="p-3 bg-[#F9F6F0] border-t border-[#E2D9CC] flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Напишите вопрос Вере..."
              className="flex-1 bg-white border border-[#D4C7B5] px-3 py-2 text-xs text-[#0E0E0E] placeholder:text-[#999999] focus:outline-none focus:border-[#6B0F1A]"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="bg-[#6B0F1A] disabled:opacity-40 text-[#F4EFE8] p-2 hover:bg-[#8E1624] transition-colors cursor-pointer"
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
