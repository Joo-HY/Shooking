import { useState } from "react";
import { useCards } from "../store/CardsContext.jsx";
import PaymentForm from "./PaymentForm.jsx";
import { maskLast8Display } from "../utils/cardMask.js";

export default function PaymentModule({ product, onClose }) {
  const { cards, selectedCardId, selectCard, selectedCard } = useCards();
  const [mode, setMode] = useState(cards.length ? "list" : "add"); // "list" | "add"

  const handlePay = () => {
    if (!selectedCard) return;
    // 실제 결제는 token 기반으로 하는 구조가 일반적
    console.log("MOCK PAY", {
      productId: product?.id,
      price: product?.price,
      cardToken: selectedCard.token,
    });
    alert("결제가 완료되었습니다(모의).");
    onClose?.();
  };

  return (
    <section className="w-full">
      {/* 상단 바 */}
      <div className="mb-4 flex items-center justify-between">
        <button
          type="button"
          onClick={onClose}
          className="text-[13px] font-bold text-neutral-700"
        >
          ← 뒤로
        </button>

        <div className="text-[15px] font-extrabold text-neutral-900">
          {mode === "list" ? "보유카드" : "카드 추가"}
        </div>

        {mode === "list" ? (
          <button
            type="button"
            onClick={() => setMode("add")}
            className="text-[13px] font-bold text-neutral-700"
          >
            추가
          </button>
        ) : (
          <div className="w-10" />
        )}
      </div>

      {/* (선택) 결제 대상 상품 정보 */}
      {product && (
        <div className="mb-4 rounded-2xl border border-neutral-200 bg-white p-3">
          <div className="text-[12px] text-neutral-500">결제 상품</div>
          <div className="mt-1 flex items-center justify-between">
            <div className="text-[13px] font-extrabold text-neutral-900">
              {product.brand}
            </div>
            <div className="text-[13px] font-extrabold text-neutral-900">
              {product.price.toLocaleString()}원
            </div>
          </div>
        </div>
      )}

      {mode === "list" ? (
        <>
          {/* 카드 목록 */}
          <div className="space-y-2">
            {cards.length === 0 ? (
              <div className="rounded-2xl border border-neutral-200 bg-white p-6 text-center text-[13px] text-neutral-500">
                등록된 카드가 없습니다.
              </div>
            ) : (
              cards.map((c) => {
                const isSelected = c.id === selectedCardId;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => selectCard(c.id)}
                    className={[
                      "w-full rounded-2xl border bg-white p-4 text-left transition",
                      isSelected ? "border-neutral-900" : "border-neutral-200",
                    ].join(" ")}
                  >
                    <div className="text-[14px] font-extrabold text-neutral-900">
                      {maskLast8Display(c.first8 + "00000000")}
                    </div>
                    <div className="mt-1 text-[12px] text-neutral-500">
                      {c.holder} · {c.expiryMM}/{c.expiryYY}
                    </div>
                  </button>
                );
              })
            )}
          </div>

          {/* 하단 버튼 */}
          <button
            type="button"
            onClick={handlePay}
            disabled={!selectedCard}
            className={[
              "mt-4 w-full rounded-full py-3 text-[13px] font-extrabold",
              selectedCard
                ? "bg-yellow-300 text-neutral-900 hover:bg-yellow-200"
                : "bg-neutral-200 text-neutral-500",
            ].join(" ")}
          >
            이 카드로 결제하기
          </button>

          <button
            type="button"
            onClick={() => setMode("add")}
            className="mt-2 w-full rounded-full bg-neutral-100 py-3 text-[13px] font-extrabold text-neutral-900"
          >
            + 카드 추가
          </button>
        </>
      ) : (
        <>
          {/* 카드 추가 폼 */}
          <PaymentForm
            onSubmit={() => {
              // PaymentForm 내부 onSubmit에서 addCard가 호출되도록 아래 5) 참고
              setMode("list");
            }}
          />
        </>
      )}
    </section>
  );
}