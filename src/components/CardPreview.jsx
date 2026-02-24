import React from "react";

// 카드번호: 1111 2222 •••• •••• 형태
function formatCardNumberForPreview(raw16 = "") {
  const d = String(raw16).replace(/\D/g, "").slice(0, 16);
  const g1 = d.slice(0, 4);
  const g2 = d.slice(4, 8);
  const has8 = d.length >= 8;

  if (!d) return "1111 2222 •••• ••••";
  if (!has8) return `${g1.padEnd(4, "•")} ${g2.padEnd(4, "•")} •••• ••••`;

  return `${g1} ${g2} •••• ••••`;
}

function formatExpiryForPreview(expiryRaw = "") {
  const d = String(expiryRaw).replace(/\D/g, "").slice(0, 4); // MMYY
  const mm = d.slice(0, 2);
  const yy = d.slice(2, 4);
  if (d.length < 4) return "MM/YY";
  return `${mm}/${yy}`;
}

export default function CardPreview({ cardNumberRaw, holder, expiryRaw }) {
  const name = (holder ?? "").trim() || "NAME";

  return (
    <div className="mb-4">
      <div className="mx-auto w-full max-w-[320px] rounded-xl bg-[#2F2F2F] p-4 shadow">
        <div className="h-4 w-7 rounded bg-[#C9B458]" />
        <div className="mt-8 text-[14px] font-semibold tracking-[0.12em] text-white">
          {formatCardNumberForPreview(cardNumberRaw)}
        </div>

        <div className="mt-4 flex items-end justify-between">
          <div className="text-[12px] font-semibold text-white">{name}</div>
          <div className="text-[12px] font-semibold text-white">
            {formatExpiryForPreview(expiryRaw)}
          </div>
        </div>
      </div>
    </div>
  );
}