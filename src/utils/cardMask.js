export const formatCardFull = (digits16 = "") =>
  digits16.replace(/(.{4})/g, "$1-").replace(/-$/, "");

export const maskLast8Display = (digits16 = "") => {
  const d = digits16.replace(/\D/g, "").slice(0, 16);
  const first8 = d.slice(0, 8);
  if (first8.length < 8) return formatCardFull(d);

  const first8Formatted = first8.replace(/(.{4})/g, "$1-").replace(/-$/, "");
  // 요구사항: 카드번호 마지막 8자리는 마스킹 처리
  return `${first8Formatted}-••••-••••`;
};