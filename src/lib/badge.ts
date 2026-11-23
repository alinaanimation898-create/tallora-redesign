/** Store badges from Tilda ("NEW", "SALE -30%") shown in Russian. */
export function ruBadge(badge?: string | null): string | null {
  if (!badge) return null;
  if (/^\s*new\s*$/i.test(badge)) return "Новинка";
  const sale = badge.match(/(\d+)\s*%/);
  if (/sale/i.test(badge) && sale) return `−${sale[1]}%`;
  return badge;
}
