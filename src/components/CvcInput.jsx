import React from "react";
import { onlyDigits } from "../utils/input";

export default function CvcInput({
  value,
  onChange,
  onBlur,
  onFocus,
  className = "",
  disabled = false,
  placeholder = "CVC",
  maxLength = 4,
}) {
  const handleChange = (e) => {
    const raw = onlyDigits(e.target.value).slice(0, maxLength);
    onChange(raw);
  };

  return (
    <input
      type="password"
      inputMode="numeric"
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      onBlur={onBlur}
      onFocus={onFocus}
      disabled={disabled}
      className={`border p-2 rounded w-full ${className}`}
      autoComplete="off"
    />
  );
}