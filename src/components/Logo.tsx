import React from "react";

/**
 * TALLORA one-line wordmark, traced from the brand logo PDF (page 2, without the TL monogram).
 * Uses currentColor, so set colour and size via className (height drives width: ratio ≈ 2.43 : 1).
 */
export default function Logo({ className = "", title = "Tallora" }: { className?: string; title?: string }) {
  const A = "M669 137H686L716 521H700L695 466H660L656 521H640ZM678 243L661 449H694Z";
  return (
    <svg viewBox="519 137 932 384" className={className} fill="currentColor" fillRule="evenodd" role="img" aria-label={title}>
      <title>{title}</title>
      {/* T */}
      <path d="M519 137H596V154H566V521H549V154H519Z" />
      {/* A */}
      <path d={A} />
      {/* L L */}
      <path d="M793 137H809V504H870V521H793Z" />
      <path d="M930 137H946V504H1007V521H930Z" />
      {/* O */}
      <path d="M1096 137H1116Q1144 137 1144 165V493Q1144 521 1116 521H1096Q1068 521 1068 493V165Q1068 137 1096 137ZM1095 154Q1084 154 1084 165V493Q1084 504 1095 504H1117Q1128 504 1128 493V165Q1128 154 1117 154Z" />
      {/* R */}
      <path d="M1221 137H1270Q1297 137 1297 164V438Q1297 466 1269 466L1297 521H1278L1250 466H1237V521H1221ZM1237 154V449H1270Q1281 449 1281 438V165Q1281 154 1270 154Z" />
      {/* A */}
      <path d={A} transform="translate(735 0)" />
    </svg>
  );
}
