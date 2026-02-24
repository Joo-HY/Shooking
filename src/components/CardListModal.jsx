import React, { useState } from "react";
import { useCards } from "../store/CardsContext";
import AddCardModal from "./AddCardModal";

export default function CardListModal({ open, onClose, onPay }) {
  const { cards, selectedCardId, selectCard, removeCard, selectedCard } = useCards();
  const [addOpen, setAddOpen] = useState(false);

  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/40 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl w-full max-w-md p-4">
          <div className="flex items-center justify-between mb-3">
            <button className="text-sm" onClick={onClose}>닫기</button>
            <div className="font-semibold">보유카드</div>
            <button className="text-sm" onClick={() => setAddOpen(true)}>추가</button>
          </div>

          <div className="space-y-2">
            {cards.length === 0 && (
              <div className="text-sm text-gray-600 py-8 text-center">
                등록된 카드가 없습니다. 카드를 추가해주세요.
              </div>
            )}

            {cards.map((c) => {
              const isSelected = c.id === selectedCardId;
              return (
                <div
                  key={c.id}
                  className={`border rounded-lg p-3 flex items-center justify-between cursor-pointer ${
                    isSelected ? "border-black" : "border-gray-200"
                  }`}
                  onClick={() => selectCard(c.id)}
                >
                  <div>
                    <div className="text-sm font-medium">
                      {c.first8.slice(0, 4)}-{c.first8.slice(4, 8)}-••••-••••
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {c.holder} · {c.expiryMM}/{c.expiryYY} · **** {c.last4}
                    </div>
                  </div>

                  <button
                    type="button"
                    className="text-xs text-red-600"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeCard(c.id);
                    }}
                  >
                    삭제
                  </button>
                </div>
              );
            })}
          </div>

          <button
            type="button"
            disabled={!selectedCard}
            onClick={() => selectedCard && onPay?.(selectedCard)}
            className={`w-full rounded-lg py-3 mt-4 ${
              selectedCard ? "bg-yellow-300 text-black" : "bg-gray-200 text-gray-500"
            }`}
          >
            이 카드로 결제하기
          </button>

          <button
            type="button"
            onClick={() => setAddOpen(true)}
            className="w-full rounded-lg py-3 mt-2 bg-gray-100"
          >
            + 카드 추가
          </button>
        </div>
      </div>

      <AddCardModal open={addOpen} onClose={() => setAddOpen(false)} />
    </>
  );
}