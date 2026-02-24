import React from "react";
import PaymentForm from "./PaymentForm";
import { useCards } from "../store/CardsContext";

export default function AddCardModal({ open, onClose }) {
  const { addCard } = useCards();
  if (!open) return null;

  const handleSubmit = (payload) => {
    // 저장소에는 CVC 저장 금지 (민감정보 최소화)
    addCard({
      cardNumberRaw: payload.cardNumber,
      expiryMM: payload.expiryMM,
      expiryYY: payload.expiryYY,
      holder: payload.holder,
    });
    onClose?.();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl w-full max-w-md p-4">
        <div className="flex items-center justify-between mb-3">
          <button className="text-sm" onClick={onClose}>닫기</button>
          <div className="font-semibold">카드 추가</div>
          <div className="w-10" />
        </div>

        <PaymentForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}