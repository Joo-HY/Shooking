import React, { useMemo, useRef } from "react";

export default function CardNumberInput({
  value,            // raw digits (0~16)
  onChange,
  onBlur,
  onFocus,
  className = "",
  disabled = false,
  placeholder = "",
}) {
  const inputRef = useRef(null);

  const onlyDigits = (s = "") => s.replace(/\D/g, "");

  const maskedText = useMemo(() => {
    const digits = onlyDigits(value).slice(0, 16);
    const g1 = digits.slice(0, 4);
    const g2 = digits.slice(4, 8);

    // 9번째가 입력되면 3그룹은 마스킹, 13번째가 입력되면 4그룹 마스킹
    const g3 = digits.length >= 9 ? "••••" : digits.slice(8, 12);
    const g4 = digits.length >= 13 ? "••••" : digits.slice(12, 16);

    const parts = [g1, g2, g3, g4].filter((p) => p && p.length > 0);
    const formatted = parts.join("-");

    // 아무것도 없으면 placeholder처럼 보이게
    return formatted || placeholder;
  }, [value, placeholder]);

  const isEmpty = !value || value.length === 0;

  const handleChange = (e) => {
    const digits = onlyDigits(e.target.value).slice(0, 16);
    onChange(digits);
  };

  return (
    <div
      className={`relative w-full ${disabled ? "opacity-60" : ""}`}
      onClick={() => inputRef.current?.focus()}
    >
      {/* 표시 레이어(마스킹된 문자열) */}
      <div
        className={[
          "pointer-events-none absolute inset-0 flex items-center px-3",
          "text-[14px]",
          isEmpty ? "text-neutral-400" : "text-neutral-900",
        ].join(" ")}
      >
        {maskedText}
      </div>

      {/* 실제 입력 레이어(숫자만, 글자는 투명) */}
      <input
        ref={inputRef}
        type="text"
        inputMode="numeric"
        value={onlyDigits(value)}
        onChange={handleChange}
        onBlur={onBlur}
        onFocus={onFocus}
        disabled={disabled}
        autoComplete="off"
        // 핵심: 입력 텍스트는 투명, caret은 보이게
        className={[
          "w-full rounded-md border p-2",
          "bg-transparent text-transparent caret-neutral-900",
          className,
        ].join(" ")}
      />
    </div>
  );
}