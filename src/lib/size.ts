import { ShoeSize } from "@/types";

/**
 * Typical Tallora insole length per size (median across the tallora.ru catalog).
 * Exact insole length is listed for every size on each product page.
 */
export const TYPICAL_INSOLE: { size: ShoeSize; cm: number }[] = [
  { size: 37, cm: 24.0 },
  { size: 38, cm: 24.5 },
  { size: 39, cm: 25.5 },
  { size: 40, cm: 26.0 },
  { size: 41, cm: 27.0 },
  { size: 42, cm: 28.0 },
  { size: 43, cm: 28.5 },
  { size: 44, cm: 29.0 },
];

export const FOOT_MIN = 23.0;
export const FOOT_MAX = 29.5;

/** Recommend a size for a foot length: the smallest size whose insole fits the foot. */
export function sizeForFoot(cm: number, width: "narrow" | "standard" | "wide" = "standard") {
  let effective = cm;
  if (width === "wide") effective += 0.3;
  if (width === "narrow") effective -= 0.2;
  const match = TYPICAL_INSOLE.find((s) => s.cm >= effective) ?? TYPICAL_INSOLE[TYPICAL_INSOLE.length - 1];
  return {
    size: match.size,
    insole: match.cm,
    desc: `Стелька ≈ ${match.cm.toFixed(1)} см · точная длина указана у каждой модели`,
  };
}
