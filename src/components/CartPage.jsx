import { useMemo } from "react";

export default function CartPage({
  items,
  onBack,
  onIncrease,
  onDecrease,
  onRemove,
  onCheckout,
}) {

  const itemsTotal = useMemo(() => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [items]);

  const shippingFee = useMemo(() => {
    if (itemsTotal === 0) return 0;
    return itemsTotal >= 100000 ? 0 : 3000;
  }, [itemsTotal]);

  const finalTotal = itemsTotal + shippingFee;

  const formatPrice = (price) => `${price.toLocaleString("ko-KR")}원`;

  return (
    <div className="w-full">

      <button onClick={onBack} className="mb-4 text-[18px] font-bold">
        ←
      </button>

      <h1 className="text-[24px] font-extrabold">장바구니</h1>

      <p className="mb-5 text-[13px] text-neutral-500">
        현재 {items.length}개의 상품이 담겨있습니다.
      </p>

      {items.length === 0 ? (
        <div className="py-16 text-center text-neutral-500">
          장바구니가 비어 있습니다.
        </div>
      ) : (
        <>
          <section className="space-y-4">
            {items.map((item) => (
              <article key={item.id} className="flex gap-4 border-b pb-4">

                <img
                  src={item.image}
                  alt={item.name}
                  className="h-[100px] w-[100px] rounded-[20px] object-cover"
                />

                <div className="flex flex-1 flex-col justify-center">

                  <p className="text-[15px]">{item.brand}</p>

                  <p className="text-[16px] font-extrabold">
                    {formatPrice(item.price)}
                  </p>

                  <div className="mt-2 flex items-center gap-3">

                    <button onClick={() => onDecrease(item.id)}>−</button>

                    <span>{item.quantity}</span>

                    <button onClick={() => onIncrease(item.id)}>+</button>

                    <button
                      onClick={() => onRemove(item.id)}
                      className="ml-2 text-[12px]"
                    >
                      삭제
                    </button>

                  </div>

                </div>

              </article>
            ))}
          </section>

          <section className="mt-6 border-t pt-4">

            <div className="flex justify-between mb-2">
              <span>상품 금액</span>
              <strong>{formatPrice(itemsTotal)}</strong>
            </div>

            <div className="flex justify-between mb-4">
              <span>배송비</span>
              <strong>{formatPrice(shippingFee)}</strong>
            </div>

            <div className="border-t pt-4 mb-5 flex justify-between">
              <span className="font-bold">총 금액</span>
              <strong>{formatPrice(finalTotal)}</strong>
            </div>

            <button
              onClick={() => onCheckout({ items, finalTotal })}
              className="w-full rounded-[18px] bg-neutral-700 py-4 text-white"
            >
              결제하기
            </button>

          </section>
        </>
      )}
    </div>
  );
}