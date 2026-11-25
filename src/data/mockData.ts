import { LookbookItem, FAQItem } from "@/types";
import { asset } from "@/lib/asset";

// Real catalog pulled from the Tilda store on tallora.ru.
export { CATEGORIES, PRODUCTS } from "./catalog";

/** Photo from the tallora.ru Tilda pages, saved under public/tallora/site. */
export const sitePhoto = (id: string) => asset(`/tallora/site/${id}.webp`);

export const SITE_PHOTOS = {
  hero: sitePhoto("tild6231-6161-4537-a637-643133663532"),
  heroAlt: sitePhoto("tild3337-3838-4339-b237-666131633363"),
  founder: sitePhoto("tild6565-3134-4965-b364-323131333864"),
  founderWide: sitePhoto("tild3933-3263-4235-b966-343635636233"),
  anatomy: sitePhoto("tild3938-3134-4133-b735-646333343364"),
  prive: sitePhoto("tild6534-3639-4665-b731-356236313236"),
  friends: sitePhoto("tild6232-6532-4935-a239-656666666434"),
  box: sitePhoto("tild6164-3932-4739-a265-383539303531"),
  /** Editorial shots used on the homepage. */
  muse: sitePhoto("tild6133-6135-4861-b566-316666643263"),
  queen: sitePhoto("tild3838-3461-4232-b064-646134636661"),
  power: sitePhoto("tild6634-3062-4132-b736-386465323239"),
  walk: sitePhoto("tild6534-3639-4665-b731-356236313236"),
  redHeel: sitePhoto("tild6166-3566-4462-b133-306361653535"),
  redBoots: sitePhoto("tild3030-3439-4132-b832-356662613731"),
};

/** Showroom where the collection can be tried on (from t.me/tallora). */
export const SHOWROOM = {
  name: "Шоурум ODMO",
  metro: "м. Китай-город, выход 8",
  address: "Большой Трёхсвятительский пер., 2/1 с1",
  hint: "Вход со стороны Малого Трёхсвятительского: чёрные железные ворота на углу с Хитровским, во двор, по красной лестнице - дверь слева",
  hours: "Ежедневно 11:00 - 21:00",
  /** Yandex Maps: embedded map with a pin, and a route link (opens Navigator / Maps on the phone). */
  mapEmbed: "https://yandex.ru/map-widget/v1/?text=" + encodeURIComponent("Москва, Большой Трёхсвятительский переулок, 2/1с1") + "&z=16",
  routeUrl: "https://yandex.ru/maps/?rtext=~" + encodeURIComponent("Москва, Большой Трёхсвятительский переулок, 2/1с1") + "&rtt=auto",
};

/** Real words from clients and bloggers, reposted in t.me/tallora. */
export const CLIENT_VOICES = [
  { text: "Поймать 42 размер как выиграть миллион 🥳 Красивым ногам красивые туфельки", who: "Клиентка, 42 размер", product: "Туфли" },
  { text: "Лоферы с плетёной фактурой: это вообще что-то на идеальном. Очень дорого смотрятся", who: "Блогер, 41 размер", product: "Лоферы" },
  { text: "Нога сидит свободно и комфортно. С юбками миди и длинными тренчами незаменимая пара", who: "Блогер, 41 размер", product: "Туфли" },
  { text: "Увидела рекламу, зашла, выбрала, заказала. Спонтанные покупки всегда самые лучшие", who: "Клиентка", product: "Ботильоны" },
  { text: "Ботильоны под крокодил: на мне 43. Гладкая кожа: на мне 43. Меховые лоферы: на мне 42", who: "Клиентка, 42–43 размер", product: "Ботильоны и лоферы" },
];

export const CONTACTS = {
  phone: "+7 (996) 666-62-49",
  phoneHref: "tel:+79966666249",
  email: "y-yanakova@yandex.ru",
  telegram: "https://t.me/+79966666249",
  max: "https://max.ru/u/f9LHodD0cOINuaagL4vcYAC-tHJdHC0rKCv_JMEDcQw3PbMkWBrRBtrUSic",
  company: "ИП Янакова Я. Е",
  inn: "263215979466",
  ogrnip: "321774600572459",
  founder: "Яна Янакова",
};

export const LOOKBOOK_ITEMS: LookbookItem[] = [
  { id: "look-1", title: "Вечер в чёрном", imageUrl: sitePhoto("tild3634-6166-4435-b163-376264656364"), quote: "Лаконичный силуэт и острый мыс - обувь, которая собирает образ", featuredProductId: "p-671428309603" },
  { id: "look-2", title: "Вдвоём", imageUrl: sitePhoto("tild6636-3539-4537-b462-356437373762"), quote: "Красный акцент и чёрная классика - Alla в двух настроениях", featuredProductId: "p-747696605602" },
  { id: "look-3", title: "Мягкий шаг", imageUrl: sitePhoto("tild3630-3561-4438-b061-356439323462"), quote: "Слингбэки на низком каблуке - для дня, который длится до ночи", featuredProductId: "p-367548660702" },
  { id: "look-4", title: "Белый лён", imageUrl: sitePhoto("tild3166-6662-4538-a633-623137356662"), quote: "Сабо с пряжками и светлый костюм - лето без компромиссов", featuredProductId: "p-326773683492" },
  { id: "look-5", title: "Арка", imageUrl: sitePhoto("tild3237-3137-4536-b766-333061616666"), quote: "Высокие сапоги Lora - вертикаль, которая работает на рост", featuredProductId: "p-892269508462" },
  { id: "look-6", title: "Кружево", imageUrl: sitePhoto("tild6631-3933-4939-b631-623364356563"), quote: "Белые Bella на 11 см - для особых случаев и летних вечеров", featuredProductId: "p-118903698162" },
  { id: "look-7", title: "Сетка", imageUrl: sitePhoto("tild3836-3532-4164-a463-356330666664"), quote: "Балетки Jane в сетку - лёгкость к платью миди", featuredProductId: "p-466848509862" },
];

// FAQ from tallora.ru (homepage + delivery page).
export const FAQ_LIST: FAQItem[] = [
  { question: "Как выбрать размер?", answer: "Измерьте длину стопы и сравните с нашей таблицей размеров: у каждой модели указана длина стельки для каждого размера. Если есть сомнения - напишите нам, поможем подобрать", category: "size" },
  { question: "Можно ли примерить?", answer: "Да, примерка доступна при доставке по Москве - по предварительной договорённости, при заказе от 3 пар. Для других городов оформите заказ с доставкой СДЭК и верните пару в течение 14 дней", category: "delivery" },
  { question: "Как работает доставка?", answer: "По всей России - через СДЭК, до двери или до пункта выдачи; стоимость и сроки рассчитываются при оформлении. По Москве - курьером за 700 ₽, от 3 пар бесплатно. Сроки: 1–2 рабочих дня по Москве, 2–6 дней по регионам", category: "delivery" },
  { question: "Можно ли вернуть обувь?", answer: "Да, в течение 14 дней с момента получения, если пара без следов носки и сохранены товарный вид, ярлыки и упаковка. Деньги возвращаем в течение 10 дней после проверки. Стоимость доставки при возврате товара надлежащего качества остаётся за покупателем", category: "delivery" },
  { question: "Как ухаживать за обувью?", answer: "Чистите обувь мягкой щёткой и используйте специальные средства для ухода. Храните в сухом месте - так пара прослужит дольше", category: "size" },
  { question: "Что даёт клуб Tallora Privé?", answer: "Скидка 5% на первый заказ, ранний доступ к новым коллекциям и до 10% бонусами с покупок", category: "prive" },
];

// Insole length by size, computed from all models in the tallora.ru catalog.
export const SIZE_TABLE = [
  { size: 37, lengthCm: "23.0 - 25.0", typical: "24.0" },
  { size: 38, lengthCm: "24.0 - 25.5", typical: "24.5" },
  { size: 39, lengthCm: "24.5 - 26.0", typical: "25.5" },
  { size: 40, lengthCm: "25.0 - 27.0", typical: "26.0" },
  { size: 41, lengthCm: "26.0 - 27.8", typical: "27.0" },
  { size: 42, lengthCm: "26.5 - 28.5", typical: "28.0" },
  { size: 43, lengthCm: "28.0 - 29.0", typical: "28.5" },
  { size: 44, lengthCm: "28.5 - 29.5", typical: "29.0" },
];
