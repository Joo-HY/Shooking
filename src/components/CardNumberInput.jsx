import React from "react";

export default function CardNumberInput({
  value,
  onChange,
  onBlur,
  onFocus,
  className = "",
  placeholder = "1111-2222-3333-4444",
  disabled = false,
}) {
  const onlyNumbers = (str = "") => str.replace(/\D/g, "");
  const format = (num = "") => num.replace(/(.{4})/g, "$1-").replace(/-$/, "");

  const handleChange = (e) => {
    let raw = onlyNumbers(e.target.value).slice(0, 16);
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