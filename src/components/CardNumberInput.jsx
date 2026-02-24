import React, { useMemo, useRef } from "react";

export default function CardNumberInput({
  value, // raw digits (0~16)
  onChange,
  onBlur,
  onFocus,
  className = "", // ✅ wrapper에 붙일 클래스(회색 input 공통)
  disabled = false,
  placeholder = "1111-2222-••••-••••", // ✅ 시안 느낌 힌트
}) {
  const inputRef = useRef(null);

  const onlyDigits = (s = "") => String(s).replace(/\D/g, "");

  const maskedText = useMemo(() => {
    const digits = onlyDigits(value).slice(0, 16);

    const g1 = digits.slice(0, 4);
    const g2 = digits.slice(4, 8);

    // ✅ 9번째부터 3그룹 마스킹, 13번째부터 4그룹 마스킹
    const g3 = digits.length >= 9 ? "••••" : digits.slice(8, 12);
    const g4 = digits.length >= 13 ? "••••" : digits.slice(12, 16);

    const parts = [g1, g2, g3, g4].filter((p) => p && p.length > 0);
    return parts.length ? parts.join("-") : placeholder;
  }, [value, placeholder]);

  const isEmpty = !value || value.length === 0;

  const setDigits = (raw) => {
    const digits = onlyDigits(raw).slice(0, 16);
    onChange(digits);
  };

  const handleChange = (e) => {
    setDigits(e.target.value);
  };

  const handlePaste = (e) => {
    // ✅ 붙여넣기 시 숫자만 추출
    e.preventDefault();
    const text = e.clipboardData?.getData("text") ?? "";
    setDigits(text);
  };

  return (
    <div
      className={[
        "relative w-full rounded-md",
        // ✅ 회색 input 공통 스타일은 wrapper에 적용
        className,
        disabled ? "opacity-60" : "",
      ].join(" ")}
      onClick={() => inputRef.current?.focus()}
    >
      {/* ✅ 표시 레이어 (마스킹된 문자열) */}
      <div
        className={[
          "pointer-events-none absolute inset-0 flex items-center px-3",
          "text-base font-medium",
          isEmpty ? "text-neutral-400" : "text-neutral-900",
        ].join(" ")}
      >
        {maskedText}
      </div>

      {/* ✅ 실제 입력 레이어 (숫자만 저장, 글자는 투명 / caret만 보이게) */}
      <input
        ref={inputRef}
        type="text"
        inputMode="numeric"
        value={onlyDigits(value)}
        onChange={handleChange}
        onPaste={handlePaste}
        onBlur={onBlur}
        onFocus={onFocus}
        disabled={disabled}
        autoComplete="off"
        aria-label="카드 번호"
        className={[
          "w-full bg-transparent px-3 py-2",
          "text-transparent caret-neutral-900",
          "outline-none",
        ].join(" ")}
      />
    </div>
  );
}