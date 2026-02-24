export const validateCardNumber = (raw) => {
  if (!raw || raw.trim().length === 0) return "카드 번호는 필수입니다.";
  if (!/^\d+$/.test(raw)) return "카드 번호는 숫자만 입력해주세요.";
  if (raw.length !== 16) return "카드 번호는 16자리로 입력해주세요.";
  return "";
};

export const validateExpiry = (raw) => {
  if (!raw || raw.trim().length === 0) return "만료일은 필수입니다.";
  if (!/^\d{4}$/.test(raw)) return "만료일은 MM/YY 형식(4자리)으로 입력해주세요.";

  const mm = parseInt(raw.slice(0, 2), 10);
  const yy = parseInt(raw.slice(2, 4), 10);

  if (mm < 1 || mm > 12) return "월(MM)은 01~12 범위여야 합니다.";

  const now = new Date();
  const currentYY = now.getFullYear() % 100;
  const currentMM = now.getMonth() + 1;

  if (yy < currentYY || (yy === currentYY && mm < currentMM)) {
    return "이미 만료된 카드입니다.";
  }
  return "";
};

export const validateHolder = (name) => {
  if (!name || name.trim().length === 0) return "카드 소유자 이름은 필수입니다.";
  if (name.trim().length < 2) return "이름은 최소 2자 이상 입력해주세요.";
  return "";
};

export const validateCvc = (raw) => {
  if (!raw || raw.trim().length === 0) return "CVC는 필수입니다.";
  if (!/^\d+$/.test(raw)) return "CVC는 숫자만 입력해주세요.";
  if (raw.length < 3 || raw.length > 4) return "CVC는 3~4자리로 입력해주세요.";
  return "";
};