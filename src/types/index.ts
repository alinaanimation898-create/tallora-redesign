export type ShoeSize = 37 | 38 | 39 | 40 | 41 | 42 | 43 | 44;

export interface Product {
  id: string;
  slug: string;
  name: string;
  /** "Туфли", "Лоферы с мехом" … */
  typeLabel: string;
  /** Model name, e.g. "Bella"; empty for unnamed models. */
  model: string;
  category: string;
  categorySlug: string;
  price: number;
  oldPrice?: number;
  /** Badge text from the store, e.g. "SALE -30%" or "NEW". */
  badge?: string;
  clubBonus: number;
  color: string;
  colorHex: string;
  heelHeight: string; // e.g. "7 см", "8.5 см", "Без каблука (1.5 см)"
  season: string;
  material: string;
  sole: string;
  fitHint: "exact" | "small" | "large";
  fitHintText: string;
  modelInfo?: {
    height: number;
    shoeSize: number;
    text: string;
  };
  sizes: {
    size: ShoeSize;
    inStock: boolean;
    stockCount: number; // e.g. 1 => "последняя пара в твоём размере"
    /** Insole length for this size, e.g. "26.5". */
    lengthCm?: string;
  }[];
  images: string[];
  description: string;
  details: string[];
  care: string;
  isNew?: boolean;
  isHit?: boolean;
  rating?: number;
  reviewsCount?: number;
  /** Product page on tallora.ru. */
  sourceUrl?: string;
}

export interface CartItem {
  product: Product;
  selectedSize: ShoeSize;
  quantity: number;
}

export interface Review {
  id: string;
  author: string;
  height: number;
  shoeSize: number;
  city: string;
  modelBought: string;
  rating: number;
  date: string;
  text: string;
  photoUrl: string;
}

export interface LookbookItem {
  id: string;
  title: string;
  modelName?: string;
  modelHeight?: number;
  modelShoeSize?: number;
  imageUrl: string;
  quote: string;
  featuredProductId: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: "size" | "delivery" | "payment" | "prive";
}
