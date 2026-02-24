import React from "react";
import { onlyDigits } from "../utils/input";

export default function CardNumberInput({
  value,
  onChange,
  onBlur,
  onFocus,
  className = "",
  disabled = false,
}) {

  // 화면 표시용 (마스킹 포함)
  const formatMasked = (raw) => {
    const digits = raw.replace(/\D/g, "").slice(0, 16);

    const g1 = digits.slice(0, 4);
    const g2 = digits.slice(4, 8);
    const g3 = digits.length > 8 ? "••••" : digits.slice(8, 12);
    const g4 = digits.length > 12 ? "••••" : digits.slice(12, 16);

    return [g1, g2, g3, g4].filter(Boolean).join("-");
  };

  const handleChange = (e) => {
    const digits = onlyDigits(e.target.value).slice(0, 16);
    onChange(digits); // 실제 값은 raw digits 유지
  };

  return (
    <input
      type="text"
      inputMode="numeric"
      value={formatMasked(value)}
      onChange={handleChange}
      onBlur={onBlur}
      onFocus={onFocus}
      disabled={disabled}
      className={`border p-2 rounded w-full ${className}`}
    />
  );
}