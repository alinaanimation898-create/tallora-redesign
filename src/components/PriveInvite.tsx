"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { X, Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";
import { SITE_PHOTOS, CONTACTS } from "@/data/mockData";

const KEY = "tallora-prive-invite";
const DELAY_MS = 20_000;
const SNOOZE_DAYS = 7;

/** Privé club invitation: opens 20 s after the visit starts, once per week (or never after joining). */
export default function PriveInvite() {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [name, setName] = useState("");
  const [tg, setTg] = useState("");

  useEffect(() => {
    let state: { joined?: boolean; until?: number } = {};
    try {
      state = JSON.parse(localStorage.getItem(KEY) || "{}");
    } catch {}
    if (state.joined || (state.until && state.until > Date.now())) return;
    const t = setTimeout(() => setOpen(true), DELAY_MS);
    return () => clearTimeout(t);
  }, []);

  const remember = (value: object) => {
    try {
      localStorage.setItem(KEY, JSON.stringify(value));
    } catch {}
  };

  const close = () => {
    setOpen(false);
    if (!sent) remember({ until: Date.now() + SNOOZE_DAYS * 24 * 3600 * 1000 });
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !tg.trim()) return;
    setSent(true);
    remember({ joined: true });
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center p-0 sm:p-6" role="dialog" aria-modal="true" aria-label="Вступить в клуб Tallora Privé">
      <button aria-label="Закрыть" onClick={close} className="absolute inset-0 bg-[#2B2620]/45 backdrop-blur-sm animate-fadeIn cursor-default" />

      <div className="relative w-full sm:max-w-[860px] bg-[#F5F0E8] rounded-t-[28px] sm:rounded-[32px] overflow-hidden shadow-2xl grid grid-cols-1 sm:grid-cols-2 animate-fadeIn max-h-[92svh] overflow-y-auto">
        <div className="relative hidden sm:block min-h-[460px]">
          <Image src={SITE_PHOTOS.redBoots} alt="" fill sizes="430px" className="object-cover object-[50%_40%]" />
        </div>

        <div className="p-7 sm:p-10 flex flex-col justify-center">
          <button onClick={close} aria-label="Закрыть" className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/80 hover:bg-white flex items-center justify-center cursor-pointer">
            <X size={18} />
          </button>

          {sent ? (
            <div className="space-y-5 py-6">
              <CheckCircle2 size={40} className="text-[#20402D]" />
              <h2 className="uppercase font-display text-3xl leading-tight">Добро пожаловать в Privé, {name.trim()}</h2>
              <p className="text-sm text-[#2B2620]/70 leading-relaxed">
                Мы напишем тебе в Telegram и пришлём промокод на 5% на первый заказ
              </p>
              <a
                href={CONTACTS.telegram}
                target="_blank"
                rel="noreferrer"
                className="btn-shine h-14 pl-7 pr-2 rounded-full bg-[#20402D] hover:bg-[#183326] text-white inline-flex items-center justify-between gap-6 text-[12px] uppercase tracking-[0.22em] font-semibold"
              >
                Открыть Telegram
                <span className="w-10 h-10 rounded-full bg-white text-[#2B2620] flex items-center justify-center"><ArrowRight size={16} /></span>
              </a>
            </div>
          ) : (
            <>
              <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.35em] text-[#20402D]">
                <Sparkles size={13} /> Закрытый клуб
              </span>
              <h2 className="mt-4 font-display uppercase text-[64px] sm:text-[80px] leading-[1.1] tracking-[-0.02em]">Privé</h2>
              <p className="mt-4 font-display text-xl leading-snug">
                5% на первый заказ, до 10% бонусами и новинки раньше всех
              </p>

              <form onSubmit={submit} className="mt-7 space-y-3">
                <label className="block">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#2B2620]/60">Имя</span>
                  <input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Как к тебе обращаться"
                    autoComplete="given-name"
                    className="mt-1.5 w-full h-12 px-5 rounded-full bg-white border border-[#2B2620]/10 text-sm focus:outline-none focus:border-[#20402D]"
                  />
                </label>
                <label className="block">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#2B2620]/60">Ник в Telegram</span>
                  <input
                    required
                    value={tg}
                    onChange={(e) => setTg(e.target.value.startsWith("@") || !e.target.value ? e.target.value : "@" + e.target.value)}
                    placeholder="@username"
                    autoComplete="off"
                    className="mt-1.5 w-full h-12 px-5 rounded-full bg-white border border-[#2B2620]/10 text-sm focus:outline-none focus:border-[#20402D]"
                  />
                </label>
                <button
                  type="submit"
                  className="btn-shine w-full h-14 pl-7 pr-2 rounded-full bg-[#20402D] hover:bg-[#183326] text-white flex items-center justify-between text-[12px] uppercase tracking-[0.22em] font-semibold cursor-pointer"
                >
                  Вступить в клуб
                  <span className="w-10 h-10 rounded-full bg-white text-[#2B2620] flex items-center justify-center"><ArrowRight size={16} /></span>
                </button>
                <p className="text-[10px] text-[#2B2620]/50 leading-relaxed">
                  Нажимая кнопку, ты соглашаешься с политикой обработки персональных данных
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
