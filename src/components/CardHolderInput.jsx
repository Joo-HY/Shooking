import React from "react";
import { onlyDigits } from "../utils/input";

export default function ExpiryInput({
  value,
  onChange,
  onBlur,
  onFocus,
  className = "",
  disabled = false,
  placeholder = "MM/YY",
}) {
  const format = (raw) => {
    const mm = raw.slice(0, 2);
    const yy = raw.slice(2, 4);
    if (raw.length <= 2) return mm;
    return `${mm}/${yy}`;
  };

  const clampMonth = (digits) => {
    if (digits.length < 2) return digits;
    let mm = parseInt(digits.slice(0, 2), 10);
    if (Number.isNaN(mm)) return digits;
    if (mm === 0) mm = 1;
    if (mm > 12) mm = 12;
    return String(mm).padStart(2, "0") + digits.slice(2);
  };

  const handleChange = (e) => {
    let raw = onlyDigits(e.target.value).slice(0, 4); // MMYY
    raw = clampMonth(raw);
    onChange(raw);
  };

  return (
    <input
      type="text"
      inputMode="numeric"
      placeholder={placeholder}
      value={format(value)}
      onChange={handleChange}
      onBlur={onBlur}
      onFocus={onFocus}
      disabled={disabled}
      className={`border p-2 rounded w-full ${className}`}
    />
  );
}