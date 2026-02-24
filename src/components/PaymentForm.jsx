import { useMemo, useState } from "react";

import CardNumberInput from "./CardNumberInput";
import ExpiryInput from "./ExpiryInput";
import CardHolderInput from "./CardHolderInput";
import CvcInput from "./CvcInput";

import {
  validateCardNumber,
  validateExpiry,
  validateHolder,
  validateCvc,
} from "../utils/paymentValidation";

// 추가: 카드 저장소 연결
import { useCards } from "../store/CardsContext.jsx";

export default function PaymentForm({ onSubmit }) {
  // 추가
  const { addCard } = useCards();

  const [cardNumber, setCardNumber] = useState(""); // raw 16 digits
  const [expiry, setExpiry] = useState("");         // raw "MMYY"
  const [holder, setHolder] = useState("");
  const [cvc, setCvc] = useState("");

  const [touched, setTouched] = useState({
    cardNumber: false,
    expiry: false,
    holder: false,
    cvc: false,
  });

  const errors = useMemo(
    () => ({
      cardNumber: validateCardNumber(cardNumber),
      expiry: validateExpiry(expiry),
      holder: validateHolder(holder),
      cvc: validateCvc(cvc),
    }),
    [cardNumber, expiry, holder, cvc]
  );

  const isFormValid = useMemo(
    () => Object.values(errors).every((e) => e === ""),
    [errors]
  );

  const markTouched = (key) => setTouched((t) => ({ ...t, [key]: true }));

  const handleSubmit = () => {
    setTouched({ cardNumber: true, expiry: true, holder: true, cvc: true });
    if (!isFormValid) return;

    const payload = {
      cardNumber,
      expiryMM: expiry.slice(0, 2),
      expiryYY: expiry.slice(2, 4),
      holder,
      cvc,
    };

    // ✅ 카드 등록(저장): CVC는 절대 저장하지 않음
    addCard({
      cardNumberRaw: payload.cardNumber,
      expiryMM: payload.expiryMM,
      expiryYY: payload.expiryYY,
      holder: payload.holder,
    });

    // 화면 전환(예: list로) 등에 사용
    onSubmit?.(payload);

    // (선택) 폼 초기화 원하면 아래 주석 해제
    // setCardNumber("");
    // setExpiry("");
    // setHolder("");
    // setCvc("");
    // setTouched({ cardNumber: false, expiry: false, holder: false, cvc: false });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm mb-1">카드 번호</label>
        <CardNumberInput
          value={cardNumber}
          onChange={setCardNumber}
          onBlur={() => markTouched("cardNumber")}
          className={touched.cardNumber && errors.cardNumber ? "border-red-500" : ""}
        />
        {touched.cardNumber && errors.cardNumber && (
          <p className="text-sm mt-1 text-red-600">{errors.cardNumber}</p>
        )}
        <p className="text-xs mt-1 text-gray-500">
          카드번호 마지막 8자리는 화면에 노출되지 않도록 마스킹 처리됩니다.
        </p>
      </div>

      <div>
        <label className="block text-sm mb-1">만료일</label>
        <ExpiryInput
          value={expiry}
          onChange={setExpiry}
          onBlur={() => markTouched("expiry")}
          className={touched.expiry && errors.expiry ? "border-red-500" : ""}
        />
        {touched.expiry && errors.expiry && (
          <p className="text-sm mt-1 text-red-600">{errors.expiry}</p>
        )}
      </div>

      <div>
        <label className="block text-sm mb-1">카드 소유자 이름</label>
        <CardHolderInput
          value={holder}
          onChange={setHolder}
          onBlur={() => markTouched("holder")}
          className={touched.holder && errors.holder ? "border-red-500" : ""}
        />
        {touched.holder && errors.holder && (
          <p className="text-sm mt-1 text-red-600">{errors.holder}</p>
        )}
      </div>

      <div>
        <label className="block text-sm mb-1">CVC</label>
        <CvcInput
          value={cvc}
          onChange={setCvc}
          onBlur={() => markTouched("cvc")}
          className={touched.cvc && errors.cvc ? "border-red-500" : ""}
        />
        {touched.cvc && errors.cvc && (
          <p className="text-sm mt-1 text-red-600">{errors.cvc}</p>
        )}
        <p className="text-xs mt-1 text-gray-500">
          CVC는 입력 시 마스킹 처리되며 화면 어디에도 표시되지 않습니다.
        </p>
      </div>

      <button
        type="button"
        onClick={handleSubmit}
        disabled={!isFormValid}
        className={`w-full rounded-lg py-3 ${
          isFormValid ? "bg-black text-white" : "bg-gray-200 text-gray-500"
        }`}
      >
        작성 완료
      </button>
    </div>
  );
}