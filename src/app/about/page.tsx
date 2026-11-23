"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CONTACTS, SITE_PHOTOS } from "@/data/mockData";

// Texts from tallora.ru/about and tallora.ru/intervew.
const VALUES = [
  ["Стиль", "Мы понимаем тренды и работаем на опережение"],
  ["Комфорт", "Всё начинается с правильной посадки"],
  ["Качество", "Красота и надёжность - в каждой паре"],
  ["Доступность", "Больше никаких «у нас только до 40»"],
];

const INTERVIEW = [
  {
    q: "Яна, с чего началась история бренда Tallora?",
    a: "С очень личной истории. Я долгое время сталкивалась с тем, что красивой обуви моего размера просто нет. Если у тебя 41–42, то в магазине тебе достаются не пары, а компромиссы. Оставшееся. И это не просто неудобно - это обидно. Обувь - это часть образа, часть уверенности в себе. Я хотела выбирать, как все",
  },
  {
    q: "Выбираешь - значит, чувствуешь, что заслуживаешь. Это про уважение к себе?",
    a: "Абсолютно. Я не хочу, чтобы женщина в магазине думала: «Ну ладно, хоть что-то налезло». Tallora - как раз про обратное. Ты заходишь и думаешь: «Вот это хочу. И да, это мой размер». Без компромиссов",
  },
  {
    q: "В какой момент вы решились на запуск бренда?",
    a: "Когда поняла, что если не сделаю - никто не сделает. Мы начали с коллекции, которую сама бы носила. Красивые, минималистичные, удобные модели - без лишнего декора, но с характером. Всё на натуральной коже. И с посадкой, которая действительно продумана",
  },
  {
    q: "Для кого вы делаете обувь?",
    a: "Для женщин, которые устали выбирать между удобным и стильным. Это может быть высокая девушка, уставшая искать 42 размер. Или мама, которая вечно на ногах, но хочет оставаться в образе. Или предпринимательница, которой важны и детали, и комфорт. Сегодня она в платье на шпильке, завтра - в мюлях и кюлотах. Но она точно не согласна на «что осталось»",
  },
  {
    q: "В вашем тоне чувствуется протест",
    a: "Наверное, да. Мы не протестуем в лоб. Но мы точно говорим: хватит молчать, что неудобно. Хватит думать, что 43 размер - это редкость. Хватит верить, что женская обувь - это обязательно жертва",
  },
  {
    q: "Чем отличается ваша обувь?",
    a: "Тем, что она садится как надо. Это главный комплимент, который мы слышим от покупательниц. Мы тестируем каждую пару: смотрим, где натирает, как нога себя чувствует к вечеру. И у нас честный стиль: мы делаем обувь, которая будет актуальна дольше одного сезона",
  },
  {
    q: "Какое главное чувство должна испытывать женщина, надев обувь Tallora?",
    a: "Лёгкость. Спокойствие. Уверенность. То, что это её. Её стиль. Её размер. Её шаг",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-[#F3F3F3] min-h-screen">
      {/* Hero */}
      <section className="max-w-[1400px] mx-auto px-5 sm:px-8 pt-10 sm:pt-16 pb-16 lg:pb-24 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-end">
        <div className="lg:col-span-7">
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#2B2620]/50">О бренде Tallora</span>
          <h1 className="mt-4 font-display uppercase text-[clamp(44px,6vw,96px)] leading-[0.88] tracking-[-0.02em] text-[#2B2620]">
            Про выбор и свободу <span className="text-[#20402D]">быть собой</span>
          </h1>
          <p className="mt-8 text-[16px] sm:text-[17px] text-[#2B2620]/70 leading-relaxed max-w-xl">
            Мы создаём стильную и удобную женскую обувь от 37 до 44 размера, чтобы каждая могла носить то, что
            действительно нравится. Всё лучшее – в твоём размере. Внешний вид и посадка на одном уровне
          </p>
        </div>
        <div className="lg:col-span-5 relative aspect-[4/5] rounded-[28px] bg-[#E8E8E8] overflow-hidden">
          <Image src={SITE_PHOTOS.founder} alt={`${CONTACTS.founder} – основательница Tallora`} fill preload sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover" />
          <span className="absolute bottom-4 left-4 bg-white/90 backdrop-blur text-[#2B2620] text-[10px] uppercase tracking-[0.2em] px-3 py-1.5 rounded-full">
            {CONTACTS.founder} · основательница
          </span>
        </div>
      </section>

      {/* Story */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-5">
            <span className="text-[11px] uppercase tracking-[0.3em] text-[#2B2620]/50">История создания</span>
            <p className="mt-5 font-display uppercase text-[clamp(30px,3.4vw,50px)] leading-[1.02] text-[#2B2620]">
              «Да, есть ваш размер». <span className="text-[#20402D]">Без стеснения. Без объяснений</span>
            </p>
          </div>
          <div className="lg:col-span-7 space-y-5 text-[16px] text-[#2B2620]/75 leading-relaxed lg:pt-10">
            <p>
              Tallora – бренд, который появился из личной потребности. Из усталости от компромиссов. Мы выбираем
              натуральные материалы, трендовые и универсальные формы и тщательно прорабатываем посадку. Каждую пару мы
              тестируем, чтобы в ней можно было жить: ходить, бежать, танцевать, быть собой
            </p>
            <p>
              Мы вдохновляемся реальными женщинами: уверенными, мягкими, спортивными, артистичными. Сегодня они в
              платье, завтра – в дениме и жакете. Обувь всегда остаётся частью их силы
            </p>
            <p className="pt-3 border-t border-[#2B2620]/10 font-display uppercase text-[20px] sm:text-[24px] leading-snug text-[#20402D]">
              Миссия – сделать моду доступной для всех женщин, независимо от размера ноги
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="max-w-[1400px] mx-auto px-5 sm:px-8 py-16 lg:py-24">
        <h2 className="font-display uppercase text-[clamp(44px,6.5vw,104px)] leading-[0.86] tracking-[-0.02em] text-[#2B2620]">
          Наши <span className="text-[#20402D]">ценности</span>
        </h2>
        <div className="mt-10 lg:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-[#2B2620]/15">
          {VALUES.map(([t, d], i) => (
            <div
              key={t}
              className="py-8 sm:pr-8 lg:px-8 lg:first:pl-0 border-b sm:border-b-0 lg:border-l lg:first:border-l-0 border-[#2B2620]/15 sm:[&:nth-child(-n+2)]:border-b lg:[&:nth-child(-n+2)]:border-b-0"
            >
              <span className="font-display text-[13px] tracking-[0.2em] text-[#20402D]">0{i + 1}</span>
              <h3 className="mt-6 font-display uppercase text-[34px] lg:text-[40px] leading-none text-[#2B2620]">{t}</h3>
              <p className="mt-4 text-[15px] text-[#2B2620]/65 leading-relaxed max-w-[260px]">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Interview */}
      <section id="interview" className="bg-white py-16 lg:py-24 scroll-mt-28">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32 space-y-6">
              <span className="text-[11px] uppercase tracking-[0.3em] text-[#2B2620]/50">Интервью</span>
              <h2 className="font-display uppercase text-[clamp(36px,3.6vw,56px)] leading-[0.95] text-[#2B2620]">
                Стиль и комфорт <span className="text-[#20402D]">для каждой</span>
              </h2>
              <p className="text-[15px] text-[#2B2620]/65 leading-relaxed">
                Разговор с основательницей бренда {CONTACTS.founder}. Всё началось с банального разочарования: в
                магазинах красивые пары заканчивались на 39 размере
              </p>
              <div className="relative aspect-[4/3] rounded-[24px] overflow-hidden bg-[#E8E8E8]">
                <Image src={SITE_PHOTOS.founderWide} alt="" fill sizes="(max-width: 1024px) 100vw, 30vw" className="object-cover" />
              </div>
            </div>
          </div>
          <div className="lg:col-span-8 border-t border-[#2B2620]/12">
            {INTERVIEW.map((item, i) => (
              <div key={item.q} className="py-8 border-b border-[#2B2620]/12 grid grid-cols-[40px_1fr] sm:grid-cols-[56px_1fr] gap-x-2">
                <span className="font-display text-[13px] tracking-[0.2em] text-[#20402D] pt-1.5">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="font-display uppercase text-[20px] sm:text-[24px] leading-tight text-[#2B2620]">{item.q}</h3>
                  <p className="mt-3 text-[15px] sm:text-[16px] text-[#2B2620]/75 leading-relaxed">{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#20402D] text-white py-16 lg:py-24 px-5 sm:px-8">
        <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row lg:items-end justify-between gap-10">
          <div>
            <h2 className="font-display uppercase text-[clamp(40px,6vw,96px)] leading-[0.88] tracking-[-0.02em]">
              Больше, чем обувь
              <span className="block text-[#BFD8C6]">Это выбор себя</span>
            </h2>
            <p className="mt-6 text-[16px] text-white/75 max-w-lg leading-relaxed">
              Каждая пара создаётся с мыслью, чтобы женщина чувствовала: да, это про меня. Мой стиль. Мой размер. Моя свобода
            </p>
          </div>
          <Link
            href="/catalog"
            className="group shrink-0 self-start lg:self-end inline-flex h-14 pl-7 pr-2 rounded-full bg-white text-[#20402D] items-center gap-8 text-[12px] uppercase tracking-[0.22em] font-semibold"
          >
            Смотреть коллекцию
            <span className="w-10 h-10 rounded-full bg-[#20402D] text-white flex items-center justify-center group-hover:rotate-[-45deg] transition-transform duration-500">
              <ArrowRight size={16} />
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}
