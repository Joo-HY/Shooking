export const onlyDigits = (s = "") => s.replace(/\D/g, "");
export const isBlank = (s) => !s || s.trim().length === 0;