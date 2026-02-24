import React from "react";

export default function CardHolderInput({
  value,
  onChange,
  onBlur,
  onFocus,
  className = "",
  disabled = false,
  placeholder = "NAME (예 : HONGGILDONG",
  maxLength = 30,
}) {
  const normalize = (s) => {
    // 영문/공백만 허용
    const filtered = s.replace(/[^a-zA-Z\s]/g, "");
    // 공백 정리
    const collapsed = filtered.replace(/\s+/g, " ").trim();
    // 카드 관행: 대문자
    return collapsed.toUpperCase().slice(0, maxLength);
  };

  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(normalize(e.target.value))}
      onBlur={onBlur}
      onFocus={onFocus}
      disabled={disabled}
      className={`border p-2 rounded w-full ${className}`}
      autoComplete="off"
    />
  );
}