import React from "react";
import { useCards } from "../store/CardsContext.jsx";
import SavedCardItem from "./SavedCardItem.jsx";

export default function CardListView({ onClose, onAddCard, onPay }) {
  const { cards, selectedCard, selectedCardId, selectCard } = useCards();

  const hasCard = cards.length > 0;

  return (
    <section className="w-full">
      {/* 상단 헤더: 보유카드 + 닫기(X) */}
      <div className="mb-4 flex items-center justify-between">
        <div className="text-[14px] font-extrabold text-neutral-900">보유카드</div>

        <button
          type="button"
          onClick={onClose}
          aria-label="닫기"
          className="inline-flex h-8 w-8 items-center justify-center rounded-full hover:bg-neutral-100"
        >
          <span className="text-[18px] leading-none text-neutral-600">×</span>
        </button>
      </div>

      {/* 카드가 없을 때 안내 문구 */}
      {!hasCard && (
        <p className="mb-3 text-center text-[12px] text-neutral-500">
          새로운 카드를 등록해주세요.
        </p>
      )}

      {/* 카드가 있으면 카드 형태로 표시 */}
      {hasCard && (
        <div className="flex flex-col items-center gap-3">
          {/* 여러 카드가 있으면 탭처럼 선택 가능(시안에서는 1장 기준이지만 기능은 확장) */}
          <div className="w-full space-y-3">
            {cards.map((c) => {
              const active = c.id === selectedCardId;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => selectCard(c.id)}
                  className="w-full flex justify-center"
                >
                  <div
                    className={[
                      "rounded-xl",
                      active ? "ring-2 ring-neutral-900 ring-offset-2" : "",
                    ].join(" ")}
                  >
                    <SavedCardItem card={c} />
                  </div>
                </button>
              );
            })}
          </div>

          {/* 이 카드로 결제하기 버튼 */}
          <button
            type="button"
            onClick={() => selectedCard && onPay?.(selectedCard)}
            className="w-full max-w-[320px] rounded-full bg-yellow-300 py-3 text-[13px] font-extrabold text-neutral-900 hover:bg-yellow-200 transition"
          >
            이 카드로 결제하기
          </button>
        </div>
      )}

      {/* + 카드 추가 박스 (시안) */}
      <div className="mt-4 flex justify-center">
        <button
          type="button"
          onClick={onAddCard}
          className="w-full max-w-[320px] rounded-xl bg-neutral-200 py-10 flex items-center justify-center hover:bg-neutral-300 transition"
          aria-label="카드 추가"
        >
          <span className="text-[26px] font-bold text-neutral-600">+</span>
        </button>
      </div>
    </section>
  );
}