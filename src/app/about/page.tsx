"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Heart, Sparkles, Award } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="bg-[#F3F3F3] min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-20">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs uppercase tracking-[0.3em] text-[#8F6D2F] font-semibold block mb-3">
            Манифест TALLORA
          </span>
          <h1 className="font-serif text-4xl sm:text-7xl text-[#2B2620] leading-tight font-light">
            «Высокая — это власть»
          </h1>
          <p className="text-sm sm:text-base text-[#2B2620]/75 mt-6 leading-relaxed">
            Мы не производим «обувь для проблемной ноги». Мы создаём премиальную fashion-обувь для женщин,
            которые выше всех в комнате и этим гордятся.
          </p>
        </div>

        {/* Big Editorial Quote with Founder Photo */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center bg-[#FFFFFF] border border-[#E2E2E2] p-8 sm:p-12">
          <div className="md:col-span-5 relative aspect-[3/4] bg-[#DAB16B] overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1623601980707-d19cca08fb9e?q=80&w=1000&auto=format&fit=crop"
              alt="Основательница TALLORA"
              fill
              className="object-cover"
            />
            <div className="absolute bottom-3 left-3 bg-[#2B2620]/45 text-[#F3F3F3] text-[10px] uppercase tracking-wider px-3 py-1 font-mono">
              Алина · рост 182 см, размер 43
            </div>
          </div>

          <div className="md:col-span-7 space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] text-[#8F6D2F] font-semibold block">
              История создания
            </span>
            <blockquote className="font-serif text-2xl sm:text-3xl text-[#2B2620] leading-snug">
              «Всю юность мне говорили: <br />
              <span className="italic text-[#8F6D2F]">"С твоим ростом каблуки противопоказаны"</span>. <br />
              А в обувных магазинах консультанты отправляли в мужской зал».
            </blockquote>
            <p className="text-xs sm:text-sm text-[#2B2620]/80 leading-relaxed">
              Мужская обувь не садится на женскую стопу. Женская стопа 42-44 размера уже мужской в пятке,
              имеет другой подъем и требует деликатного супинатора. Надевая мужские кеды или грубые ботинки,
              девушка теряет грацию.
            </p>
            <p className="text-xs sm:text-sm text-[#2B2620]/80 leading-relaxed">
              В 2024 году мы объединили итальянских мастеров-колодочников и российских дизайнеров, чтобы создать TALLORA.
              Обувь, в которой высокий рост становится вашим главным оружием.
            </p>
          </div>
        </div>

        {/* 3 Pillars of Production */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#FFFFFF] p-8 border border-[#E2E2E2] space-y-3">
            <span className="font-serif text-2xl text-[#8F6D2F] font-bold">01</span>
            <h3 className="font-serif text-xl text-[#2B2620]">Анатомические колодки</h3>
            <p className="text-xs text-[#2B2620]/70 leading-relaxed">
              Разработаны с нуля под пропорции стопы 25–29 см. Никакого удлинения носа или зажатых пальцев.
            </p>
          </div>

          <div className="bg-[#FFFFFF] p-8 border border-[#E2E2E2] space-y-3">
            <span className="font-serif text-2xl text-[#8F6D2F] font-bold">02</span>
            <h3 className="font-serif text-xl text-[#2B2620]">100% итальянская кожа</h3>
            <p className="text-xs text-[#2B2620]/70 leading-relaxed">
              Кожа шевро, наппа, натуральный чепрак и шелковистая замша. Обувь дышит и подстраивается под стопу.
            </p>
          </div>

          <div className="bg-[#FFFFFF] p-8 border border-[#E2E2E2] space-y-3">
            <span className="font-serif text-2xl text-[#8F6D2F] font-bold">03</span>
            <h3 className="font-serif text-xl text-[#2B2620]">Контроль центра тяжести</h3>
            <p className="text-xs text-[#2B2620]/70 leading-relaxed">
              Каблуки от 5 до 9 см смещены строго под вертикаль позвоночника. Никакой усталости в пояснице.
            </p>
          </div>
        </div>

        {/* CTA to catalog */}
        <div className="bg-[#EFE6D6] text-[#2B2620] p-10 sm:p-14 text-center border border-[#E2E2E2]">
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#2B2620] mb-4">
            Готовы ощутить разницу?
          </h2>
          <p className="text-xs sm:text-sm text-[#2B2620]/70 max-w-xl mx-auto mb-8">
            Закажите первую пару с бесплатной доставкой и примеркой в вашем городе.
          </p>
          <Link
            href="/catalog"
            className="inline-block bg-[#DAB16B] hover:bg-[#C99B4F] text-[#2B2620] px-9 py-4 text-xs uppercase tracking-[0.2em] font-medium transition-colors"
          >
            Смотреть коллекцию (39–44)
          </Link>
        </div>
      </div>
    </div>
  );
}
