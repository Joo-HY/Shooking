export const maskLast8Display = (digits16 = "") => {
  const d = String(digits16).replace(/\D/g, "").slice(0, 16);
  const first8 = d.slice(0, 8);

  if (first8.length < 8) return first8.replace(/(.{4})/g, "$1-").replace(/-$/, "");

  const first8Formatted = first8.replace(/(.{4})/g, "$1-").replace(/-$/, "");
  return `${first8Formatted}-••••-••••`;
};