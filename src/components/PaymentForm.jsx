import { useMemo, useState } from "react";

import CardNumberInput from "./CardNumberInput";
import ExpiryInput from "./ExpiryInput";
import CardHolderInput from "./CardHolderInput";
import CvcInput from "./CvcInput";
import CardPreview from "./CardPreview"; // 추가

import {
  validateCardNumber,
  validateExpiry,
  validateHolder,
  validateCvc,
} from "../utils/paymentValidation";

import { useCards } from "../store/CardsContext.jsx";

export default function PaymentForm({ onSubmit }) {
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

  const inputBaseClass =
    "bg-neutral-100 border border-transparent focus:border-neutral-300 focus:bg-white";

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

    addCard({
      cardNumberRaw: payload.cardNumber,
      expiryMM: payload.expiryMM,
      expiryYY: payload.expiryYY,
      holder: payload.holder,
    });

    onSubmit?.(payload);
  };

  return (
    <div className="space-y-4">
      {/* 시안: 카드 이미지 프리뷰 */}
      <CardPreview cardNumberRaw={cardNumber} holder={holder} expiryRaw={expiry} />

      <div>
        <label className="block text-[12px] font-semibold text-neutral-700 mb-1">
          카드 번호
        </label>
        <CardNumberInput
          value={cardNumber}
          onChange={setCardNumber}
          onBlur={() => markTouched("cardNumber")}
          className={[
            // ✅ wrapper 회색 박스
            "bg-neutral-100 border border-transparent focus-within:border-neutral-300",
            // ✅ 시안처럼 둥글게/높이 유지 + 흰색 전환은 원하면 아래 한 줄 추가
            // "focus-within:bg-white",
            touched.cardNumber && errors.cardNumber ? "border-red-400" : "",
          ].join(" ")}
        />
        {touched.cardNumber && errors.cardNumber && (
          <p className="text-[12px] mt-1 text-red-600">{errors.cardNumber}</p>
        )}
      </div>

      <div>
        <label className="block text-[12px] font-semibold text-neutral-700 mb-1">
          만료일
        </label>
        <ExpiryInput
          value={expiry}
          onChange={setExpiry}
          onBlur={() => markTouched("expiry")}
          className={[
            inputBaseClass,
            "w-[120px]", // 시안처럼 짧게
            touched.expiry && errors.expiry ? "border-red-400" : "",
          ].join(" ")}
          placeholder="MM / YY"
        />
        {touched.expiry && errors.expiry && (
          <p className="text-[12px] mt-1 text-red-600">{errors.expiry}</p>
        )}
      </div>

      <div>
        <div className="mb-1 flex items-center justify-between">
          <label className="block text-[12px] font-semibold text-neutral-700">
            카드 소유자이름
          </label>
          <span className="text-[11px] text-neutral-400">
            {Math.min(holder.length, 30)}/30
          </span>
        </div>

        <CardHolderInput
          value={holder}
          onChange={setHolder}
          onBlur={() => markTouched("holder")}
          className={[
            inputBaseClass,
            touched.holder && errors.holder ? "border-red-400" : "",
          ].join(" ")}
          placeholder="카드에 표기된 이름과 동일하게 입력하세요."
          maxLength={30}
        />
        {touched.holder && errors.holder && (
          <p className="text-[12px] mt-1 text-red-600">{errors.holder}</p>
        )}
      </div>

      <div>
        <div className="mb-1 flex items-center gap-2">
          <label className="block text-[12px] font-semibold text-neutral-700">
            보안 코드(CVC/CVV)
          </label>

          {/* 시안의 ? 아이콘 느낌 */}
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-neutral-300 text-[12px] text-neutral-500">
            ?
          </span>
        </div>

        <CvcInput
          value={cvc}
          onChange={setCvc}
          onBlur={() => markTouched("cvc")}
          className={[
            inputBaseClass,
            "w-[120px]", // 시안처럼 짧게
            touched.cvc && errors.cvc ? "border-red-400" : "",
          ].join(" ")}
          placeholder=""
        />
        {touched.cvc && errors.cvc && (
          <p className="text-[12px] mt-1 text-red-600">{errors.cvc}</p>
        )}
      </div>

      <button
        type="button"
        onClick={handleSubmit}
        disabled={!isFormValid}
        className={[
          "w-full rounded-full py-3 text-[13px] font-extrabold transition",
          isFormValid ? "bg-black text-white" : "bg-neutral-200 text-neutral-500",
        ].join(" ")}
      >
        작성 완료
      </button>
    </div>
  );
}