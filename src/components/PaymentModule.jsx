import React, { useState } from "react";
import PaymentForm from "./PaymentForm.jsx";
import CardListView from "./CardListView.jsx";

export default function PaymentModule({ items = [], totalPrice = 0, onClose }) {
  const [mode, setMode] = useState("list");

  const handlePay = (card) => {
    console.log("MOCK PAY", {
      items,
      totalPrice,
      cardToken: card.token,
    });

    alert("결제가 완료되었습니다(모의).");
    onClose?.();
  };

  return (
    <div className="w-full">
      {mode === "list" ? (
        <CardListView
          onClose={onClose}
          onAddCard={() => setMode("add")}
          onPay={handlePay}
          totalPrice={totalPrice}
        />
      ) : (
        <div className="w-full">
          <div className="mb-4 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setMode("list")}
              className="text-[13px] font-bold text-neutral-700"
            >
              ←
            </button>

            <div className="text-[14px] font-extrabold text-neutral-900">
              카드 추가
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="닫기"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full hover:bg-neutral-100"
            >
              <span className="text-[18px] leading-none text-neutral-600">×</span>
            </button>
          </div>

          <PaymentForm
            onSubmit={() => {
              setMode("list");
            }}
          />
        </div>
      )}
    </div>
  );
}