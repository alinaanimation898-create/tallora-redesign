"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CONTACTS, SITE_PHOTOS } from "@/data/mockData";

// Texts from tallora.ru/about and tallora.ru/intervew.
const VALUES = [
  ["Стиль", "Мы понимаем тренды и работаем на опережение."],
  ["Комфорт", "Всё начинается с правильной посадки."],
  ["Качество", "Красота и надёжность – в каждой паре."],
  ["Доступность", "Больше никаких «у нас только до 40»."],
];

const INTERVIEW = [
  {
    q: "Яна, с чего началась история бренда Tallora?",
    a: "С очень личной истории. Я долгое время сталкивалась с тем, что красивой обуви моего размера просто нет. Если у тебя 41–42, то в магазине тебе достаются не пары, а компромиссы. Оставшееся. И это не просто неудобно – это обидно. Обувь – это часть образа, часть уверенности в себе. Я хотела выбирать, как все.",
  },
  {
    q: "Выбираешь – значит, чувствуешь, что заслуживаешь. Это про уважение к себе?",
    a: "Абсолютно. Я не хочу, чтобы женщина в магазине думала: «Ну ладно, хоть что-то налезло». Tallora – как раз про обратное. Ты заходишь и думаешь: «Вот это хочу. И да, это мой размер». Без компромиссов.",
  },
  {
    q: "В какой момент вы решились на запуск бренда?",
    a: "Когда поняла, что если не сделаю – никто не сделает. Мы начали с коллекции, которую сама бы носила. Красивые, минималистичные, удобные модели – без лишнего декора, но с характером. Всё на натуральной коже. И с посадкой, которая действительно продумана.",
  },
  {
    q: "Для кого вы делаете обувь?",
    a: "Для женщин, которые устали выбирать между удобным и стильным. Это может быть высокая девушка, уставшая искать 42 размер. Или мама, которая вечно на ногах, но хочет оставаться в образе. Или предпринимательница, которой важны и детали, и комфорт. Сегодня она в платье на шпильке, завтра – в мюлях и кюлотах. Но она точно не согласна на «что осталось».",
  },
  {
    q: "В вашем тоне чувствуется протест.",
    a: "Наверное, да. Мы не протестуем в лоб. Но мы точно говорим: хватит молчать, что неудобно. Хватит думать, что 43 размер – это редкость. Хватит верить, что женская обувь – это обязательно жертва.",
  },
  {
    q: "Чем отличается ваша обувь?",
    a: "Тем, что она садится как надо. Это главный комплимент, который мы слышим от покупательниц. Мы тестируем каждую пару: смотрим, где натирает, как нога себя чувствует к вечеру. И у нас честный стиль: мы делаем обувь, которая будет актуальна дольше одного сезона.",
  },
  {
    q: "Какое главное чувство должна испытывать женщина, надев обувь Tallora?",
    a: "Лёгкость. Спокойствие. Уверенность. То, что это её. Её стиль. Её размер. Её шаг.",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-[#F3F3F3] min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-20">
        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs uppercase tracking-[0.3em] text-[#8F6D2F] font-semibold block mb-3">
            О бренде Tallora
          </span>
          <h1 className="font-serif text-4xl sm:text-7xl text-[#2B2620] leading-[1.02] font-light">
            Про выбор и свободу <span className="italic text-[#B8914A]">быть собой</span>
          </h1>
          <p className="text-sm sm:text-base text-[#2B2620]/75 mt-6 leading-relaxed">
            Мы создаём стильную и удобную женскую обувь от 37 до 44 размера, чтобы каждая могла носить
            то, что действительно нравится. Всё лучшее – в твоём размере. Внешний вид и посадка
            на одном уровне. Мода – для тебя, и точка.
          </p>
        </div>

        {/* Story */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center bg-white rounded-[32px] border border-[#E2E2E2] p-6 sm:p-12">
          <div className="md:col-span-5 relative aspect-[3/4] rounded-[24px] bg-[#E8E8E8] overflow-hidden">
            <Image
              src={SITE_PHOTOS.founder}
              alt={`${CONTACTS.founder} - основательница Tallora`}
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover"
            />
            <div className="absolute bottom-3 left-3 glass-light text-[#2B2620] text-[10px] uppercase tracking-[0.2em] px-3 py-1.5 rounded-full">
              {CONTACTS.founder} · основательница
            </div>
          </div>

          <div className="md:col-span-7 space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] text-[#8F6D2F] font-semibold block">
              История создания
            </span>
            <blockquote className="font-serif text-2xl sm:text-4xl text-[#2B2620] leading-snug font-light">
              «Да, есть ваш размер». <span className="italic text-[#8F6D2F]">Без стеснения. Без объяснений.</span>{" "}
              Просто потому, что вы этого достойны.
            </blockquote>
            <p className="text-sm text-[#2B2620]/75 leading-relaxed">
              Tallora – это бренд, который появился из личной потребности. Из усталости от компромиссов.
              Мы выбираем натуральные материалы, трендовые и универсальные формы, и – главное – тщательно
              прорабатываем посадку. Обувь радует и глаз, и тело. Мы тестируем каждую
              пару, чтобы в ней можно было жить. Ходить, бежать, танцевать, быть собой.
            </p>
            <p className="text-sm text-[#2B2620]/75 leading-relaxed">
              Мы вдохновляемся реальными женщинами: уверенными, мягкими, спортивными, артистичными. Сегодня
              они в платье, завтра – в дениме и жакете. Но обувь всегда остаётся частью их силы.
            </p>
            <p className="font-serif italic text-xl text-[#8F6D2F]">
              Миссия бренда – сделать моду доступной для всех женщин, независимо от размера ноги.
            </p>
          </div>
        </div>

        {/* Values */}
        <div>
          <h2 className="font-display uppercase text-[clamp(44px,7vw,96px)] leading-[0.85] tracking-[-0.02em] text-[#2B2620] mb-8">
            Наши <span className="font-serif normal-case italic font-light text-[#8F6D2F] tracking-normal">ценности</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {VALUES.map(([t, d], i) => (
              <div key={t} className="bg-white rounded-[24px] p-7 border border-[#E2E2E2] space-y-3">
                <span className="font-display text-xs tracking-[0.3em] text-[#8F6D2F]">0{i + 1}</span>
                <h3 className="font-serif italic text-3xl text-[#2B2620]">{t}</h3>
                <p className="text-sm text-[#2B2620]/65 leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Interview */}
        <div id="interview" className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 scroll-mt-32">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32 space-y-6">
              <span className="text-xs uppercase tracking-[0.3em] text-[#8F6D2F] font-semibold block">Интервью</span>
              <h2 className="font-serif text-4xl sm:text-5xl text-[#2B2620] leading-[1.02] font-light">
                Наша миссия – стиль <span className="italic">и комфорт для каждой</span>
              </h2>
              <p className="text-sm text-[#2B2620]/65 leading-relaxed">
                Разговор с основательницей бренда {CONTACTS.founder}. Всё началось с банального разочарования:
                в магазинах красивые пары заканчивались на 39 размере.
              </p>
              <div className="relative aspect-[4/3] rounded-[24px] overflow-hidden bg-[#E8E8E8]">
                <Image src={SITE_PHOTOS.founderWide} alt="" fill sizes="(max-width: 1024px) 100vw, 30vw" className="object-cover" />
              </div>
            </div>
          </div>
          <div className="lg:col-span-8 divide-y divide-[#2B2620]/12 border-y border-[#2B2620]/12">
            {INTERVIEW.map((item) => (
              <div key={item.q} className="py-8">
                <h3 className="font-serif italic text-2xl text-[#8F6D2F] leading-snug">- {item.q}</h3>
                <p className="mt-3 text-[15px] text-[#2B2620]/80 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-[#EFE6D6] text-[#2B2620] rounded-[32px] p-10 sm:p-14 text-center">
          <h2 className="font-serif text-3xl sm:text-5xl font-light mb-4">
            Tallora – больше, чем обувь <br /><span className="italic">Это выбор себя</span>
          </h2>
          <p className="text-sm text-[#2B2620]/70 max-w-xl mx-auto mb-8">
            Каждая пара создаётся с мыслью о том, чтобы женщина чувствовала: да, это про меня. Мой стиль.
            Мой размер. Моя свобода.
          </p>
          <Link
            href="/catalog"
            className="group inline-flex h-14 pl-7 pr-2 rounded-full bg-[#DAB16B] hover:bg-[#C99B4F] text-[#2B2620] items-center gap-8 text-[12px] uppercase tracking-[0.22em] font-semibold transition-colors"
          >
            Смотреть коллекцию
            <span className="w-10 h-10 rounded-full bg-white flex items-center justify-center group-hover:rotate-[-45deg] transition-transform duration-500">
              <ArrowRight size={16} />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
