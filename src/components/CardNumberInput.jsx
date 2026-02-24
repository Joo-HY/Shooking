import React from "react";

export default function CardNumberInput({
  value,
  onChange,
  onBlur,
  onFocus,
  className = "",
  disabled = false,
  placeholder = "",
}) {
  const onlyDigits = (s = "") => s.replace(/\D/g, "");

  // ✅ 입력칸 표시용: 마지막 8자리 마스킹
  const formatMasked = (raw = "") => {
    const digits = onlyDigits(raw).slice(0, 16);
    const g1 = digits.slice(0, 4);
    const g2 = digits.slice(4, 8);

    // 3,4그룹은 입력 길이가 충분하면 무조건 마스킹
    const g3 = digits.length >= 9 ? "••••" : digits.slice(8, 12);
    const g4 = digits.length >= 13 ? "••••" : digits.slice(12, 16);

    return [g1, g2, g3, g4].filter((x) => x && x.length > 0).join("-");
  };

  const handleChange = (e) => {
    // 사용자가 • 를 포함한 문자열을 넣어도 숫자만 추출
    const digits = onlyDigits(e.target.value).slice(0, 16);
    onChange(digits); // ✅ 상태는 raw digits 유지
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
      placeholder={placeholder}
      className={`border p-2 rounded w-full ${className}`}
      autoComplete="off"
    />
  );
}