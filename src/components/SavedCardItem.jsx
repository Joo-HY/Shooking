import React from "react";

function formatFirst8ToPreview(first8 = "") {
  const d = String(first8).replace(/\D/g, "").slice(0, 8);
  const g1 = d.slice(0, 4).padEnd(4, "•");
  const g2 = d.slice(4, 8).padEnd(4, "•");
  // 시안: 1111 2222 •••• ••••
  return `${g1} ${g2} •••• ••••`;
}

export default function SavedCardItem({ card }) {
  const numberLine = formatFirst8ToPreview(card.first8);
  const name = (card.holder ?? "").trim() || "NAME";
  const expiry = card.expiryMM && card.expiryYY ? `${card.expiryMM}/${card.expiryYY}` : "MM/YY";

  return (
    <div className="w-full max-w-[320px] rounded-xl bg-[#2F2F2F] p-4 shadow">
      <div className="h-4 w-7 rounded bg-[#C9B458]" />
      <div className="mt-8 text-[14px] font-semibold tracking-[0.12em] text-white">
        {numberLine}
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div className="text-[12px] font-semibold text-white">{name}</div>
        <div className="text-[12px] font-semibold text-white">{expiry}</div>
      </div>
    </div>
  );
}